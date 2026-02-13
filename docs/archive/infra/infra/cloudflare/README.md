# ☁️ Cloudflare Pages Deployment

## Configuration

- **Build command:** `npm run build -- --lane <lane>`
- **Output directory:** `products/<lane>/dist`
- **Root directory:** `.`

> **Legacy / Transitional note (pre-D0013):** Some older configurations may still publish repo-root `/dist/`. That output is no longer canonical.

## Branch Deploys

| Branch | Deploys To |
|--------|------------|
| `prod` | **Production** (klappy.dev) |
| `main` | Preview only (experiment ledger) |
| `*` (any other) | Preview (`https://<branch-name>.klappy-dev.pages.dev`) |

> **Note:** See `/docs/CLOUDFLARE_CONFIG.md` for the authoritative deploy configuration.

## What This Means for Attempts

1. Each attempt branch auto-deploys on push
2. Preview URLs are available for evaluation
3. No manual deployment steps required

## Deploy Contract

See `/infra/contracts/build-output.md` for what builds must produce.

## Key Principle

> The app code is disposable. The deploy contract is not.

Cloudflare Pages remains perpetually deployable regardless of what stack (or no stack) is in `/src`.
