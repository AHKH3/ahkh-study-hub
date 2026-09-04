import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import os from 'node:os';
const ROOT = process.cwd();
const files = [
  'src/components/HubHeader.astro',
  'src/components/ThemeSwitcher.astro',
  'src/pages/commonplace.astro',
  'src/pages/manifesto.astro',
  'src/pages/courses/[course]/[slug].astro',
  'src/pages/courses/[course]/index.astro',
  'src/pages/index.astro',
];
const tmp = join(os.tmpdir(), 'ahkh-check');
mkdirSync(tmp, { recursive: true });
let fail = 0;
for (const f of files) {
  const src = readFileSync(join(ROOT, f), 'utf8');
  const blocks = [...src.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/g)].map((m) => m[1]);
  console.log(`${f} -> ${blocks.length} block(s)`);
  blocks.forEach((code, i) => {
    if (!code.trim()) return;
    const ext = f.includes('ThemeSwitcher') ? '.ts' : '.js';
    if (ext === '.ts') {
      console.log(`  block ${i}: TS (syntax covered by astro build)`);
      return;
    }
    const p = join(tmp, `${f.replace(/[^A-Za-z0-9]/g, '_')}_${i}${ext}`);
    writeFileSync(p, code);
    try {
      execSync(`node --check "${p}"`, { stdio: 'pipe' });
      console.log(`  block ${i}: OK`);
    } catch (e) {
      fail++;
      const err = (e.stderr || e.stdout || Buffer.alloc(0)).toString();
      console.log(`  block ${i}: SYNTAX FAIL\n${err.slice(0, 900)}`);
    }
  });
}
console.log(fail ? `RESULT: ${fail} failure(s)` : 'RESULT: all syntax checks passed');
process.exitCode = fail ? 1 : 0;
