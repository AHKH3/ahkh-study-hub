import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'src', 'data', 'releases.json');
const REPO = 'AHKH3/ahkh-study-hub';

function seed(reason) {
  try {
    const prev = JSON.parse(readFileSync(OUT, 'utf8'));
    if (prev && Array.isArray(prev.releases) && prev.releases.length > 0) {
      console.log(`[releases] kept ${prev.releases.length} cached release(s) (${reason})`);
      return;
    }
  } catch (e) {}
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ fetchedAt: null, releases: [] }, null, 2) + '\n');
  console.log(`[releases] wrote empty seed (${reason})`);
}

function pickInstaller(assets, ext) {
  const hit = (assets || []).find((a) => a.name && a.name.toLowerCase().endsWith(ext));
  if (!hit) return null;
  return { name: hit.name, url: hit.browser_download_url, size: hit.size || 0 };
}

try {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'ahkh-study-hub-prebuild' },
    signal: ctrl.signal
  });
  clearTimeout(timer);
  if (!res.ok) throw new Error(`http-${res.status}`);
  const data = await res.json();
  const releases = (Array.isArray(data) ? data : [])
    .filter((r) => r.tag_name && r.tag_name.startsWith('app-v'))
    .map((r) => ({
      tag: r.tag_name,
      version: (r.tag_name || '').replace(/^app-v/, ''),
      name: r.name || r.tag_name,
      publishedAt: r.published_at || null,
      prerelease: !!r.prerelease,
      notes: (r.body || '').slice(0, 2000),
      url: r.html_url,
      setup: pickInstaller(r.assets, '.exe'),
      msi: pickInstaller(r.assets, '.msi'),
      updater: (r.assets || []).some((a) => a.name === 'latest.json')
    }));
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({ fetchedAt: new Date().toISOString(), releases }, null, 2) + '\n'
  );
  console.log(`[releases] baked ${releases.length} desktop release(s) into src/data/releases.json`);
} catch (e) {
  seed(`offline: ${e.message || e}`);
}
