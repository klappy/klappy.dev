# Evidence (Run c11dfab1)

## Screenshots

The following screenshots demonstrate compliance with PRD v1.1 requirements:

1. **01-desktop-home.png** - The home screen on desktop, showing the primary navigation (≤ 7 items) and the "Quantum Development" vibe.
2. **02-mobile-home.png** - The same view on a mobile device (375px width), showing the responsive drawer and unobstructed reading path.
3. **03-desktop-deep-link.png** - Verification of deep linking. The URL `/?r=klappy://canon/constraints` correctly loads the constraints document.

## Verification

- [x] **Build Output:** Produced via `npm run build -- --lane website`.
- [x] **Nav Count:** First load shows exactly 7 primary navigation items.
- [x] **Mobile Layout:** Verified no horizontal scroll on 375px viewport.
- [x] **Deep Link Round-trip:** URL state correctly restored on reload.
- [x] **Evidence Discoverability:** Evidence index present at `/_evidence/`.
