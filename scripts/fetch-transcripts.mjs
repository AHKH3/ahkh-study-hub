// Build-time YouTube transcript ingestion for AHKH Study Hub.
//
// Discovers every youtubeId across all modular course files in src/data/,
// downloads public captions via YouTube Innertube API, and bakes cues into
// individual JSON files under src/data/transcripts/<youtubeId>.json,
// maintaining dual-write compatibility with src/data/transcripts.json.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'src', 'data');
const TRANSCRIPTS_DIR = join(DATA_DIR, 'transcripts');
const MONOLITH_PATH = join(DATA_DIR, 'transcripts.json');

// Ensure output directory exists
mkdirSync(TRANSCRIPTS_DIR, { recursive: true });

// Minimal .env loader (no dependencies)
try {
  const envPath = join(ROOT, '.env');
  if (!process.env.YOUTUBE_INNERTUBE_KEY && existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*YOUTUBE_INNERTUBE_KEY\s*=\s*(.+?)\s*$/);
      if (m) process.env.YOUTUBE_INNERTUBE_KEY = m[1];
    }
  }
} catch {}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const INNERTUBE_KEY = process.env.YOUTUBE_INNERTUBE_KEY || '';
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

// Scans all .ts files in src/data/ recursively to discover all embedded youtubeIds
function discoverIds() {
  const ids = new Set();
  function scan(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'transcripts' && entry.name !== 'node_modules') {
          scan(full);
        }
      } else if (entry.name.endsWith('.ts')) {
        const src = readFileSync(full, 'utf8');
        for (const m of src.matchAll(/youtubeId\s*:\s*['"]([A-Za-z0-9_-]{11})['"]/g)) {
          ids.add(m[1]);
        }
      }
    }
  }
  scan(DATA_DIR);
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
    .replace(/\u00a0/g, ' ');
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

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
  let cues = [...xml.matchAll(/<p\s+t="(\d+)"[^>]*>(.*?)<\/p>/gs)]
    .map((m) => ({ t: +m[1] / 1000, text: stripTags(m[2]) }))
    .filter((c) => c.text);
  if (!cues.length) {
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

  // Load existing monolith store if present (for self-migration & dual-write)
  let monolithStore = {};
  if (existsSync(MONOLITH_PATH)) {
    try {
      monolithStore = JSON.parse(readFileSync(MONOLITH_PATH, 'utf8'));
    } catch {
      monolithStore = {};
    }
  }

  // Self-migration: ensure individual files exist from monolith
  for (const [id, val] of Object.entries(monolithStore)) {
    const singleFile = join(TRANSCRIPTS_DIR, `${id}.json`);
    if (!existsSync(singleFile) && val?.segments?.length) {
      writeFileSync(singleFile, `${JSON.stringify(val, null, 2)}\n`);
    }
  }

  if (!INNERTUBE_KEY) {
    console.warn('[transcripts] YOUTUBE_INNERTUBE_KEY is unset — keeping cached transcripts only');
    return;
  }

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const id of wanted) {
    const singleFile = join(TRANSCRIPTS_DIR, `${id}.json`);
    const force = REFRESH || (IDS_ARG && IDS_ARG.length > 0);

    // Check cache in individual file first
    let cached = null;
    if (existsSync(singleFile)) {
      try {
        cached = JSON.parse(readFileSync(singleFile, 'utf8'));
      } catch {}
    } else if (monolithStore[id]?.segments?.length) {
      cached = monolithStore[id];
    }

    if (cached?.segments?.length && !force) {
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
      const record = {
        videoId: id,
        fetchedAt: new Date().toISOString(),
        lang: picked.track.languageCode,
        kind: picked.kind,
        segments: segments.map((s) => ({ ...s, label: fmtClock(s.time) })),
      };

      // Write granular file
      writeFileSync(singleFile, `${JSON.stringify(record, null, 2)}\n`);
      // Update in-memory monolith
      monolithStore[id] = record;

      ok++;
      console.log(
        `[transcripts] ${id}: ${segments.length} cue(s) [${picked.kind}/${picked.track.languageCode}]`,
      );
    } catch (err) {
      console.warn(`[transcripts] ${id}: FAILED (${err.message}) — leaving pending`);
      failed++;
    }
  }

  // Dual-write to monolithic transcripts.json for backward compatibility
  writeFileSync(MONOLITH_PATH, `${JSON.stringify(monolithStore, null, 2)}\n`);
  console.log(
    `[transcripts] done: ${ok} fetched, ${skipped} cached, ${failed} pending → src/data/transcripts/ & transcripts.json`,
  );
}

try {
  await main();
} catch (err) {
  console.warn(`[transcripts] aborted (${err.message}) — build continues with cached data`);
}
