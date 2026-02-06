---
uri: klappy://canon/epistemic-surface-extraction
title: "Epistemic Surface Extraction (ESE)"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["evidence", "verification", "ese", "surface", "ocr", "asr", "video", "screenshots", "recordings"]
relevance: decision
execution_posture: governing
---

# Epistemic Surface Extraction (ESE)

> Making visual/audio/video evidence legible to agents without turning it into doctrine.

## Purpose

Many verification artifacts are not text-first: screenshots, recordings, videos, PDF slides. Without a structured "surface," they become invisible influence: present, persuasive, and unauditable.

**Epistemic Surface Extraction (ESE)** is a repeatable method to extract *what an artifact asserts and depicts* in a way that:

- makes evidence **discoverable** and **searchable** for humans and agents
- preserves **emphasis** and **structure** (not just words)
- prevents **accidental canonization**
- maintains **contestability**

ESE is not "OCR."
ESE is **awareness extraction**.

---

## Operating Constraints

- MUST produce sidecar files for any non-text evidence artifact
- MUST include containment clause marking surfaces as non-canonical
- MUST use anchor contracts for time-based media (audio/video)
- MUST NOT treat surface extractions as doctrine or instruction
- MUST reference source artifacts explicitly

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

### Screenshots / Images

- **unit:** `frame`
- **anchor_type:** `frame_index` (or `1`)
- **segments:** 1 per image (unless intentionally subdividing regions)

### Slides / PDFs

- **unit:** `page`
- **anchor_type:** `page_number`
- **segments:** 1 per page

### Audio Recordings

Audio is time-structured. Meaning may rely on emphasis and pacing.

Choose segmentation based on source:

- **multi-speaker:** `unit = speaker_turn` (preferred)
- **single-speaker:** `unit = topic_block` (preferred)

Anchors MUST be stable:

- **anchor_type:** `timestamp+hash` (required)

Where:
- `timestamp_start` / `timestamp_end` are included
- `snippet_hash` is included (see Anchor Contract below)

### Video Recordings

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

## Promotion Rule

Surfaces can inform canon edits, but:

- **Artifacts do not become canon.**
- Only *separately authored canon changes* can be promoted.
- If a surface reveals a durable insight, promote the insight **by editing canon**, not by referencing the artifact as authority.

---

## Failure Modes

- **Raw Dump**: Extracting text without structure or emphasis
- **Doctrine Creep**: Treating a surface extraction as instruction
- **Anchor Drift**: Using timestamps alone without hash anchors
- **Missing Containment**: Omitting the non-canonical warning

---

## See Also

- [Verification & Evidence](/canon/constraints/verification-and-evidence.md)
- [Visual Proof Standards](/canon/constraints/visual-proof.md)
- [Definition of Done](/canon/constraints/definition-of-done.md)

---

## Provenance

Promoted from `/canon/apocrypha/artifacts/SURFACE-EXTRACTION.md` to Canon.
