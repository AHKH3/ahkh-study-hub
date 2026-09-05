import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error(`[desktop:version] invalid semver in package.json: ${version}`);
  process.exit(1);
}

const confPath = join(ROOT, 'src-tauri', 'tauri.conf.json');
const conf = JSON.parse(readFileSync(confPath, 'utf8'));
conf.version = version;
writeFileSync(confPath, JSON.stringify(conf, null, 2) + '\n');

const cargoPath = join(ROOT, 'src-tauri', 'Cargo.toml');
const cargo = readFileSync(cargoPath, 'utf8').replace(
  /^(name = "ahkh-study-hub"\nversion = ")[^"]+(")/m,
  `$1${version}$2`
);
writeFileSync(cargoPath, cargo);

console.log(`[desktop:version] synced desktop shell to v${version}`);
