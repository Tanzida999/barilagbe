# Deploy বাড়িলাগবে to Netlify

This project is a TanStack Start app. It's now configured to build for
Netlify (Nitro `netlify` preset + `netlify.toml`).

## Option A — Deploy from Git (recommended)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. On https://app.netlify.com → **Add new site → Import from Git**.
3. Pick the repo. Netlify will read `netlify.toml`:
   - Build command: `bun run build`
   - Publish directory: `dist`
   - Node version: `20`
4. Click **Deploy site**. Done — SSR runs as a Netlify Function automatically.

## Option B — Deploy from your machine (Netlify CLI)

```bash
npm i -g netlify-cli
bun install
bun run build
netlify deploy --prod --dir=dist
```

## Environment variables

None required for the current mock-data build. If you later add secrets,
set them in **Site settings → Environment variables** on Netlify.

## Custom domain

**Site settings → Domain management → Add a domain** on Netlify, then
follow their DNS instructions.
