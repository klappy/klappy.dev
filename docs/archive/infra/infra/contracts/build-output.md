# 📜 Build Output Contract

> **This is the ONLY surviving build rule across all attempts.**
> Do not modify this file during an attempt unless the PRD explicitly requires it.
> If you believe this contract is wrong, propose changes in `PRD_PATCH.md`.

---

## Requirements

### 1. Build Must Produce `products/<lane>/dist`

```
npm run build -- --lane <lane> → products/<lane>/dist
```

The build command must generate a production-ready bundle in `products/<lane>/dist`.
Any stack is allowed (React, Vue, Svelte, Vanilla JS, static HTML, etc.)

### 2. Lane Build Must Load Content

The app MUST fetch and display content from:

```
/content/manifest.json
```

This manifest is generated from per-file frontmatter during `npm run sync`.
Your app must be able to load and render resources listed in this manifest.

### 3. No Client Secrets

- No API keys in client code
- No secrets in `products/<lane>/dist`
- If external APIs are needed, they must be public or use server-side proxies

### 4. Cloudflare Pages Compatible

The build output must work with Cloudflare Pages:

- Static files only (no SSR unless using Workers)
- No server-side dependencies
- Assets must use relative paths or be under `products/<lane>/dist`

Cloudflare configuration for lane deployments:

- One Pages project per lane
- Project root directory: repository root (`.`)
- Build command: `npm run build -- --lane <lane>`
- Build output directory: `products/<lane>/dist`

---

## The Contract

| Requirement | Test |
|-------------|------|
| `products/<lane>/dist` exists after build | `ls "products/<lane>/dist/"` succeeds |
| Entry point exists | `ls "products/<lane>/dist/index.html"` succeeds |
| Manifest is accessible | `curl $PREVIEW_URL/content/manifest.json` returns JSON |
| App loads | Browser shows content, no white screen |

---

## What This Means for Agents

- You may use **any framework** or no framework
- You may use **any CSS approach** (Tailwind, vanilla, CSS-in-JS)
- You may use **any build tool** (Vite, esbuild, Rollup, Parcel, none)
- You **must** ensure `npm run build -- --lane <lane>` produces `products/<lane>/dist`
- You **must** ensure the app can display content from `/content/manifest.json`

---

## Non-Negotiable

If your build doesn't produce `products/<lane>/dist` with a working `index.html` that loads the manifest, **your attempt fails the deploy contract**.

Fix the build. Don't modify this contract.
