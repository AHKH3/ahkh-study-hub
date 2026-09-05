import { execSync } from 'node:child_process';

/* Desktop frontend build (Tauri): root base instead of the GitHub Pages
 * subpath, so CSS, scripts, and images resolve inside the Tauri
 * custom-protocol webview. Web builds keep the default subpath. */
execSync('npm run build', {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: { ...process.env, AHKH_BASE: '/' }
});
