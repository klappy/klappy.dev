# Evidence (Run 4ab9667c)

## Screenshots

Visual proof available in `screenshots/`:
1. `01-home-desktop.png` - Homepage at 1920x1080 (desktop view)
2. `02-odd-page.png` - ODD Manifesto content page with navigation
3. `03-home-mobile.png` - Homepage at 375x667 (mobile view)

## Success Criteria Verification

- [x] First load shows ≤7 nav items (shows 4: Home, ODD, About, Projects, Canon)
- [x] Mobile usable without horizontal scrolling (verified via 375px screenshot)
- [x] Canon discoverable without file paths exposed (uses manifest.json + URIs)
- [x] No agent instructions present in UI (content is human-facing only)
- [x] No CLI/process language exposed to visitors (clean public interface)
- [x] Deep links work (hash-based routing with klappy:// URIs)
- [x] Progressive disclosure tiers respected (tier 0/1 in nav, tier 2 via content links)

## Deployment

Branch: `run/website/prd-v1.1/cursor/a/claude-opus-4/4ab9667c`
Commit: `7d9feb4`
Pushed to: `origin/run/website/prd-v1.1/cursor/a/claude-opus-4/4ab9667c`

**Cloudflare Preview Status:** Build may be in progress or awaiting configuration.

Attempted URLs (both returned 404 as of 2026-01-20 06:17 UTC):
- `https://7d9feb4.klappy-dev-website.pages.dev/`
- `https://run-website-prd-v1-1-cursor-a-claude-opus-4-4ab9667c.klappy-dev-website.pages.dev/`

**Note:** Cloudflare Pages project `klappy-dev-website` may need to be configured to:
1. Connect to the GitHub repository
2. Enable preview deployments for all branches
3. Use build command: `npm run build -- --lane website`
4. Use build output: `products/website/dist`

Once deployed, evidence index will be available at `<preview-url>/_evidence/`
