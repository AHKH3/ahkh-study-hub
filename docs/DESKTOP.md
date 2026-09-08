# Desktop App — Build, Release & Update Pipeline

How the Windows application ships, updates itself, and where its secrets live.

## One-time setup (already done on this machine, kept here for reinstalls)

1. Rust stable via winget (`Rustlang.Rustup`) plus the MSVC workload
   (`Microsoft.VisualStudio.2022.BuildTools` with `VCTools`).
2. Signing keypair for the in-app updater lives outside the repo:
   `C:\Users\abdel\.tauri\ahkh-study-hub` (private),
   `ahkh-study-hub.pub` (public, already baked into `src-tauri/tauri.conf.json`),
   `ahkh-study-hub.password.txt` (key password).
3. Two GitHub repository secrets (Settings, Secrets and variables, Actions):
   `TAURI_SIGNING_PRIVATE_KEY` gets the full content of the private key file,
   `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` gets the content of the password file.
   Without both secrets the CI build still runs but updater signatures fail.
4. One more repository secret for transcript ingestion:
   `YOUTUBE_INNERTUBE_KEY` holds the public Innertube client key (the same
   value kept locally in `.env`). Without it, CI builds reuse the cached
   transcripts and skip fetching.

## Shipping a new desktop version

Run one command from a clean tree:

```bash
node scripts/desktop-release.mjs patch
```

`minor` and `major` work the same way. The script bumps `package.json`,
syncs `src-tauri/tauri.conf.json` and `Cargo.toml`, commits, tags `app-vX.Y.Z`,
and pushes. GitHub Actions (`.github/workflows/desktop.yml`) then builds the
NSIS setup plus MSI on `windows-latest`, signs the updater bundles, publishes
the GitHub Release with `latest.json`, and installed apps offer the update
automatically on next launch through the built-in dialog.

Web releases are untouched: `v*` tags keep flowing through `release.yml`.

## Downloads page

`src/pages/downloads.astro` renders the latest `app-v*` release baked at build
time by `scripts/fetch-releases.mjs` (runs in `prebuild`, never fails offline).
Older releases render as quiet rows. The page needs no maintenance.

## Local builds

```bash
npm run tauri:dev
npm run tauri:build
```

On this machine run builds through a vcvars-initialized shell, because the
managed Git `usr\bin\link.exe` otherwise shadows the MSVC linker. Installers
land in `src-tauri/target/release/bundle/`. Future systems
(macOS, Linux) slot into the matrix in `desktop.yml`, as recorded in ADR-019.

First-release checklist: after pushing the first `app-v*` tag, confirm the
GitHub Release carries `latest.json` alongside the installers, then open
`/downloads` and confirm the new version renders.
