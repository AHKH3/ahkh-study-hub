import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const bump = process.argv[2];
if (!['patch', 'minor', 'major'].includes(bump)) {
  console.error('Usage: node scripts/desktop-release.mjs <patch|minor|major>');
  process.exit(1);
}

function sh(cmd) {
  return execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
}

const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
if (dirty) {
  console.error('[desktop:release] working tree is not clean. Commit or stash first.');
  process.exit(1);
}

sh(`npm version ${bump} --no-git-tag-version -m "chore(desktop): app-v%s"`);
sh('npm run desktop:sync-version');
const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
const tag = `app-v${version}`;
sh('git add -A');
sh(`git commit -m "chore(desktop): ${tag}"`);
sh(`git tag ${tag}`);
sh('git push origin main');
sh(`git push origin ${tag}`);
console.log(`[desktop:release] shipped ${tag}. GitHub Actions now builds the Windows installers.`);
