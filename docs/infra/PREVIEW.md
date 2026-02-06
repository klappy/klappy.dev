---
uri: klappy://docs/preview
title: "Previewing Lanes and Attempts"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["docs", "implementation", "preview", "cloudflare", "local"]
---

# 👁️ Previewing Lanes and Attempts

> **Scope:** Local + Cloudflare preview workflows for lanes and attempts.

## Local Preview (Any Lane)

Build the lane:

```bash
npm run build -- --lane <lane>
```

Preview the built output:

```bash
npx wrangler pages dev products/<lane>/dist --port 8788
```

Open: http://localhost:8788

---

## Cloudflare Pages Preview

Each lane is deployed as its own Cloudflare Pages project.

**Build configuration (REQUIRED):**

| Setting | Value |
|---------|-------|
| Build command | `npm run build -- --lane <lane>` |
| Output directory | `products/<lane>/dist` |
| Root directory | `.` (repo root) |

**Examples:**

| Lane | Build Command | Output Directory |
|------|--------------|------------------|
| `website` | `npm run build -- --lane website` | `products/website/dist` |
| `ai-navigation` | `npm run build -- --lane ai-navigation` | `products/ai-navigation/dist` |
| `agent-skill` | `npm run build -- --lane agent-skill` | `products/agent-skill/dist` |

---

## Troubleshooting

### Wrong lane building

If a Cloudflare Pages build log shows the wrong lane (e.g., `Lane: ai-navigation` when you expected `website`):

1. **Check the build command** — Must explicitly pass `--lane <lane>`
2. **Check the output directory** — Must match `products/<lane>/dist`
3. **Verify smart-build.js** — Should NOT use `vite --root` flag

### Build succeeds but site shows wrong content

1. Verify the output directory in Cloudflare Pages settings
2. Check that `products/<lane>/dist/index.html` exists after build
3. Ensure `products/<lane>/index.html` exists as the Vite entry point

### Local preview differs from Cloudflare

1. Clear local dist: `rm -rf products/<lane>/dist`
2. Rebuild: `npm run build -- --lane <lane>`
3. Use wrangler for local preview (matches Cloudflare environment)

---

## Preview URLs

### Branch previews (automatic)

Any `git push` to an attempt/run branch creates a preview:

```
https://<branch-slug>.klappy-dev.pages.dev
```

Branch names are slugified (slashes become dashes).

Example:
- Branch: `run/website/prd-v1.0/cursor/a/claude-opus-4/e2c41bb5`
- Preview: `https://run-website-prd-v1-0-cursor-a-claude-opus-4-e2c41bb5.klappy-dev.pages.dev`

### Production

Production deploys from the `prod` branch to the primary domain.

---

## Related Documents

- Build contract: `/infra/contracts/build-output.md`
- Lane architecture: `/docs/appendices/product-lanes.md`
- Cloudflare config: `/docs/CLOUDFLARE_CONFIG.md`
