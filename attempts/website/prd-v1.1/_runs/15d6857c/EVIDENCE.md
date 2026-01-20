# Evidence: Website PRD v1.1

**Run ID:** 15d6857c  
**Date:** 2026-01-20  
**Branch:** `run/website/prd-v1.1/cursor/a/composer/15d6857c`

## Proof Assets

### Screenshots

| File | Description |
|------|-------------|
| `screenshots/01-home-desktop.png` | Home page on desktop (1920x1080) - Shows ≤7 nav items (Home + 3 Tier 0 = 4 items) |
| `screenshots/02-content-page-desktop.png` | Content page with navigation (1920x1080) - Shows deep linking and content rendering |
| `screenshots/03-home-mobile.png` | Home page on mobile (375x667) - Shows mobile-responsive layout |

## Verification Checklist

- [x] Build produces `dist/index.html`
- [x] Evidence folder structure created at `/_evidence/`
- [x] Screenshots captured (3 total: desktop + mobile)
- [x] Navigation shows ≤7 items initially (Home + 3 Tier 0 = 4 items) ✓
- [x] Mobile responsive (no horizontal scroll) ✓
- [x] Deep linking works (`?r=<uri>` + `#section`) ✓
- [x] Progressive disclosure functional (Tier 1/2 expandable) ✓
- [x] Branch pushed to origin
- [ ] Cloudflare preview URL verified (HTTP 200 on `/`)
- [ ] Evidence URL verified (HTTP 200 on `/_evidence/`)

## URLs

**Preview URL:** (Check Cloudflare Pages dashboard after deployment completes)  
**Expected pattern:** `https://run-website-prd-v1-1-cursor-a-composer-15d6857c.<project>.pages.dev`

**Evidence URL:** `{PREVIEW_URL}/_evidence/`

## Verification Commands

After Cloudflare Pages deployment completes, verify:

```bash
# Check app endpoint
curl -I https://<preview-url>/

# Check evidence endpoint  
curl -I https://<preview-url>/_evidence/

# Both should return HTTP 200
```

## Implementation Notes

- React 18 + Vite build
- Progressive disclosure: Tier 0 (3 items) visible by default
- Deep linking via URL query params (`?r=<uri>`) and hash (`#section`)
- Mobile hamburger menu with slide-in navigation
- Markdown rendering with `marked` library
- Evidence system integrated into build output
