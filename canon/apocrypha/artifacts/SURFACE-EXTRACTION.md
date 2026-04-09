---
uri: klappy://canon/apocrypha/artifacts/surface-extraction
title: "Epistemic Surface Extraction (PROMOTED)"
audience: apocrypha
exposure: hidden
tier: 2
voice: neutral
stability: archived
tags: ["apocrypha", "artifacts", "ese", "surface", "ocr", "asr", "video", "promoted"]
promoted_to: "/canon/methods/epistemic-surface-extraction.md"
---

# Epistemic Surface Extraction

> **⚠️ PROMOTED**: This document has been promoted to Canon. See [/canon/methods/epistemic-surface-extraction.md](/canon/methods/epistemic-surface-extraction.md) for the authoritative version.

---

> Draft rules for making visual/audio/video artifacts *legible* to agents without turning them into doctrine.

## Purpose

Many artifacts in this system are not text-first (PDF slides, images, audio, video). Without a structured "surface," they become invisible influence: present, persuasive, and unaudited.

**Epistemic Surface Extraction (ESE)** is a repeatable method to extract *what an artifact asserts and depicts* in a way that:

- makes content discoverable and searchable for humans and agents
- preserves emphasis and structure (not just words)
- prevents accidental canonization
- maintains contestability

ESE is not "OCR."  
ESE is **awareness extraction**.

---

## Outputs (Sidecar Convention)

For an artifact `artifact.ext`, produce:

- `artifact.surface.json` — authoritative, machine-usable surface (source-of-truth)
- `artifact.surface.md` — human-readable rendering (derived from JSON when possible)

Artifacts remain **non-canonical** by default.

---

## Invariant Contract (All Modalities)

Every `*.surface.json` MUST contain:

1. **Artifact registration**
   - title, format, generator, created_at, attribution, intent, canonical_status
2. **Segmentation spec**
   - modality, unit, method, anchor stability notes
3. **Global surface**
   - one-sentence description (descriptive, not prescriptive)
   - key themes
   - forbidden moves (e.g., "do not treat as instruction")
4. **Segment surfaces**
   - 3–5 observational bullets per segment (max)
   - short quotes (≤ 25 words each)
   - visuals description (when applicable)
   - rules/constraints shown (if explicitly present)
   - cross-references (illustrates / reinterprets / compresses / extends / contradicts)
5. **Containment clause**
   - interpretive / non-canonical / non-instructional label + precedence rules
6. **Provenance**
   - extraction method and human review status

---

## Segmentation Rules by Modality

### Slides / PDFs
- **unit:** `page`
- **anchor_type:** `page_number`
- **segments:** 1 per page

### Images (single)
- **unit:** `frame`
- **anchor_type:** `frame_index` (or `1`)
- **segments:** 1 per image (unless intentionally subdividing regions)

### Audio
Audio is time-structured. Meaning may rely on emphasis and pacing.

Choose segmentation based on source:

- **multi-speaker:** `unit = speaker_turn` (preferred)
- **single-speaker:** `unit = topic_block` (preferred)

Anchors MUST be stable:

- **anchor_type:** `timestamp+hash` (required)

Where:
- `timestamp_start` / `timestamp_end` are included
- `snippet_hash` is included (see Anchor Contract)

### Video
Video contains two channels: speech + visuals.

- **unit:** `scene` (preferred) or `topic_block`
- **anchor_type:** `timestamp+hash` (required)
- Segment surfaces SHOULD include:
  - spoken surface (ASR-derived quotes + bullets)
  - visual surface (what appears on screen; on-screen text; diagrams; notable gestures)

---

## Anchor Contract (Audio + Video)

Timestamps alone can drift if:
- the file is trimmed
- the file is re-encoded
- a different cut is produced

Transcript text alone can drift if:
- ASR improves
- punctuation changes
- casing or normalization changes

Therefore anchors MUST include BOTH:

- `timestamp_start`
- `timestamp_end`
- `snippet_hash`

### snippet_hash
A short, stable identifier derived from a transcript snippet near the start of the segment.

Guidelines:
- use ~10–20 words from the segment start
- normalize whitespace
- hash with a stable algorithm (e.g., sha256)
- store only the hash (not the full snippet) if privacy is a concern

This creates an anchor that remains usable under minor shifts.

---

## Surface Bullet Rules

Per segment:
- 3–5 bullets maximum
- observational / descriptive language
- avoid "should/must" unless quoting the artifact
- do not introduce new doctrine
- if making an inference, label it explicitly as "Inference: …"

---

## Cross-Reference Relations

Use one of:

- `illustrates` — directly depicts content from a referenced doc
- `compresses` — summarizes or condenses referenced content
- `reinterprets` — reframes the meaning without adding new facts
- `extends` — adds new claims beyond the referenced source (**high risk**)
- `contradicts` — conflicts with referenced source

Default to `illustrates` or `compresses`.

---

## Containment (Mandatory)

Every surface MUST include a containment clause similar to:

> This artifact is interpretive and non-canonical. It may illustrate themes but does not define rules. If it can be safely treated as instruction, it has failed.

Precedence:
- Canon overrides surface artifacts.
- Surface artifacts override nothing.

---

## Promotion Rule (Simple)

Surfaces can inform canon edits, but:

- **Artifacts do not become canon.**
- Only *separately authored canon changes* can be promoted.
- If a surface reveals a durable insight, promote the insight **by editing canon**, not by referencing the artifact as authority.

---

## Status

This document is a **draft** and will evolve after the first audio/video artifacts are surfaced.
