// Build-time YouTube transcript ingestion for AHKH Study Hub.
//
// Discovers every youtubeId embedded in src/data/courses.ts, downloads the
// video's PUBLIC caption track through YouTube's Innertube player endpoint
// (plain Node fetch — no CORS, no OAuth, no third-party service), and bakes
// the cues into src/data/transcripts.json, which the study reader renders
// statically under the "Original script" tab with timestamp sync +
// click-to-seek.
//
// Design constraints honored:
// - 100% static output: zero runtime network calls, zero servers, zero keys.
// - Never breaks the build: network/caption failures only warn (exit code
//   always 0); affected videos keep the dignified "pending" fallback.
// - Incremental: cached videos are skipped unless --refresh or --ids= is used.
//
// Usage:
//   npm run transcripts                        # fetch only missing videos
//   npm run transcripts -- --refresh           # refetch every embedded video
//   npm run transcripts -- --ids=AAA,BBB       # (re)fetch specific videos
// Runs automatically before every build via the `prebuild` npm hook.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COURSES_PATH = join(ROOT, 'src', 'data', 'courses.ts');
const OUT_PATH = join(ROOT, 'src', 'data', 'transcripts.json');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
// Public YouTube web API key shipped inside YouTube's own clients; used only
// at build time to ask Innertube for a video's public caption-track list.
const INNERTUBE_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
const INNERTUBE_CLIENT = {
  clientName: 'ANDROID',
  clientVersion: '20.10.38',
  osName: 'Android',
  osVersion: '14',
  platform: 'MOBILE',
  androidSdkVersion: 34,
};

const args = process.argv.slice(2);
const REFRESH = args.includes('--refresh');
const IDS_ARG = args
  .find((a) => a.startsWith('--ids='))
  ?.slice('--ids='.length)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function discoverIds() {
  const src = readFileSync(COURSES_PATH, 'utf8');
  const ids = new Set();
  for (const m of src.matchAll(/youtubeId\s*:\s*['"]([A-Za-z0-9_-]{11})['"]/g)) {
    ids.add(m[1]);
  }
  return [...ids];
}

async function getCaptionTracks(videoId) {
  const res = await fetch(
    `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_KEY}&prettyPrint=false`,
    {
      method: 'POST',
      headers: { 'User-Agent': UA, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId,
        context: { client: { hl: 'en', gl: 'US', ...INNERTUBE_CLIENT } },
      }),
    },
  );
  if (!res.ok) throw new Error(`innertube HTTP ${res.status}`);
  const data = await res.json();
  const status = data?.playabilityStatus?.status;
  if (status && status !== 'OK') {
    throw new Error(`video ${status}: ${(data.playabilityStatus.reason || '').slice(0, 100)}`);
  }
  return data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
}

function pickTrack(tracks) {
  const usable = tracks.filter((t) => t.baseUrl && t.languageCode);
  const isEn = (t) => /^en([-_]|$)/i.test(t.languageCode || '');
  const manualEn = usable.find((t) => isEn(t) && t.kind !== 'asr');
  if (manualEn) return { track: manualEn, kind: 'manual' };
  const autoEn = usable.find((t) => isEn(t));
  if (autoEn) return { track: autoEn, kind: 'auto' };
  if (usable[0]) return { track: usable[0], kind: usable[0].kind === 'asr' ? 'auto' : 'manual' };
  return null;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/ /g, ' ');
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

// Merge raw cues into paragraph-sized chunks: cut on gaps > 2.5s or > 320 chars.
function chunkify(cues) {
  const chunks = [];
  let cur = null;
  for (const c of cues) {
    if (!cur || c.t - cur.end > 2.5 || cur.text.length + c.text.length > 320) {
      cur = { t: c.t, end: c.t, text: c.text };
      chunks.push(cur);
    } else {
      cur.text += ` ${c.text}`;
      cur.end = c.t;
    }
  }
  return chunks.map(({ t, text }) => ({ time: Math.floor(t), text }));
}

async function fetchSegments(track) {
  const res = await fetch(track.baseUrl, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`timedtext HTTP ${res.status}`);
  const xml = await res.text();
  if (!xml.includes('<timedtext')) throw new Error('timedtext rejected the session (empty response)');
  // Paragraph-level cues (manual captions)…
  let cues = [...xml.matchAll(/<p\s+t="(\d+)"[^>]*>(.*?)<\/p>/gs)]
    .map((m) => ({ t: +m[1] / 1000, text: stripTags(m[2]) }))
    .filter((c) => c.text);
  if (!cues.length) {
    // …otherwise group word-level cues (auto captions) into readable chunks.
    cues = [...xml.matchAll(/<w\s+t="(\d+)"[^>]*>([^<]*)<\/w>/g)]
      .map((m) => ({ t: +m[1] / 1000, text: decodeEntities(m[2]).trim() }))
      .filter((w) => w.text);
  }
  const chunks = chunkify(cues);
  if (!chunks.length) throw new Error('no cues parsed');
  return chunks;
}

function fmtClock(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

async function main() {
  const wanted = IDS_ARG && IDS_ARG.length ? IDS_ARG : discoverIds();
  console.log(`[transcripts] embedded video(s): ${wanted.join(', ') || '(none)'}`);
  let store = {};
  if (existsSync(OUT_PATH)) {
    try {
      store = JSON.parse(readFileSync(OUT_PATH, 'utf8'));
    } catch {
      store = {};
    }
  }
  let ok = 0;
  let skipped = 0;
  let failed = 0;
  for (const id of wanted) {
    const force = REFRESH || (IDS_ARG && IDS_ARG.length > 0);
    if (store[id]?.segments?.length && !force) {
      skipped++;
      continue;
    }
    try {
      const tracks = await getCaptionTracks(id);
      if (!tracks.length) {
        console.warn(`[transcripts] ${id}: publisher published no captions — leaving pending`);
        failed++;
        continue;
      }
      const picked = pickTrack(tracks);
      if (!picked) {
        console.warn(`[transcripts] ${id}: no usable caption track — leaving pending`);
        failed++;
        continue;
      }
      const segments = await fetchSegments(picked.track);
      store[id] = {
        videoId: id,
        fetchedAt: new Date().toISOString(),
        lang: picked.track.languageCode,
        kind: picked.kind,
        segments: segments.map((s) => ({ ...s, label: fmtClock(s.time) })),
      };
      ok++;
      console.log(
        `[transcripts] ${id}: ${segments.length} cue(s) [${picked.kind}/${picked.track.languageCode}]`,
      );
    } catch (err) {
      console.warn(`[transcripts] ${id}: FAILED (${err.message}) — leaving pending`);
      failed++;
    }
  }
  writeFileSync(OUT_PATH, `${JSON.stringify(store, null, 2)}\n`);
  console.log(
    `[transcripts] done: ${ok} fetched, ${skipped} cached, ${failed} pending → src/data/transcripts.json`,
  );
}

try {
  await main();
} catch (err) {
  console.warn(`[transcripts] aborted (${err.message}) — build continues with cached data`);
}
