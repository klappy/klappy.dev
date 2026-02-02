# Odd-Teaser Source

Implementation source for the odd-teaser lane.

This directory contains the promoted implementation code. Agents propose code in their attempt sandbox (`attempts/v<VERSION>/attempt-NNN/src/`), and humans promote successful attempts here.

## Structure

```
src/
+-- index.html          # Entry point
+-- main.jsx            # React entry
+-- App.jsx             # Main component
+-- styles.css          # Styling
+-- components/         # UI components
+-- utils/              # Utilities (telemetry, export)
```

## Implementation Requirements

See [PRD.md](../PRD.md) and [behavior.md](../behavior.md) for requirements.

Key constraints:
- Single-page application
- No routing, navigation, or menus
- No authentication or persistence
- Entry-state is thinking-first, not artifact editor
- LLM-based artifact detection (scribe pattern)
- One-click export to local Markdown

## Build

```bash
npm run build:odd-teaser
```

Output goes to `dist/`.
