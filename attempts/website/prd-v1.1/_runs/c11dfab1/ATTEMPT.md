# Attempt (Run c11dfab1)

## Summary

This attempt implements the Public Website (PRD v1.1) using a modern, progressive disclosure UX. It provides a clean, 2026-portfolio-style interface for exploring the ODD system, its canon, and projects.

## Approach

### Tech Stack
- **Framework:** React 18 with Vite
- **Styling:** CSS Custom Properties implementing visual interface contracts (color-system, typography, spacing).
- **Routing:** Deep-link enabled routing using URL search parameters (`/?r=uri#anchor`).
- **Markdown:** `marked` for client-side rendering of canonical content.

### Key Features
1. **Progressive Disclosure Nav:** A sidebar that prioritizes the most important entry points (Tier 0 and 1) while grouping deeper material (Tier 2) into collapsible sections. Navigation is limited to 7 primary items on first load.
2. **Deep Linking:** Full support for shareable URLs that restore both the specific resource and the section anchor on load.
3. **Mobile Responsive:** A fluid, glassmorphism-based layout that adaptively hides the navigation behind a drawer on mobile devices, ensuring zero horizontal scroll.
4. **Visual Polish:** Implemented Apple 2025 design guidelines with a focus on typography, hierarchy, and subtle interaction feedback (glassmorphism, subtle shadows).
5. **Manifest-Driven:** The entire UI is dynamically generated from the canonical `manifest.json`, ensuring synchronization with the underlying content.

## Evidence

- **Desktop Home:** Clean entry point with tier-based orientation.
- **Mobile Home:** Responsive drawer-based navigation.
- **Deep Linking:** Verified URL-to-resource-and-section round-trip.
- **Evidence Index:** Discoverable index at `/_evidence/` containing all run artifacts.
