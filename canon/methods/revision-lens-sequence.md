---
uri: klappy://canon/methods/revision-lens-sequence
title: "Method: Revision Lens Sequence — One Pass, One Lens, One Complete Read"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "methods", "writing", "revision", "lenses", "multi-pass", "governance", "essays", "book"]
epoch: E0007
date: 2026-04-07
derives_from: "canon/meta/writing-canon.md, canon/constraints/guide-posture.md, canon/constraints/relational-sensitivity.md, docs/book/governance-additions-2026-02-27.md"
complements: "canon/methods/self-audit.md, canon/constraints/definition-of-done.md, docs/oddkit/IMPL-writing-canon-gate.md"
governs: "All public essays (writings/) and book chapters after draft-zero"
---

# Method: Revision Lens Sequence — One Pass, One Lens, One Complete Read

> Applying multiple governance concerns simultaneously produces mediocre results on each. This method defines a sequential series of revision passes, each applying one lens to the entire document. Each pass is a complete read-through with one concern. The agent proposes the sequence after draft-zero, noting which passes are high-value for the specific piece, then executes one pass at a time — presenting changes and waiting for author direction before the next. A regression check closes the sequence to catch what earlier passes may have broken.

---

## Summary — Sequential Lenses Outperform Simultaneous Checklists

Draft-zeros compress source material into structured essays. They consistently miss the same concerns — not because the author or agent is unaware of them, but because applying all governance lenses at once exceeds what a single pass can hold in focus. The observed pattern: the author asks the same sequence of improvement questions after every draft-zero, and each question improves the output whether or not the author has read the draft.

This is a signal. When the same corrections are needed every time, they should be automated as sequential passes — not collapsed into a single checklist that produces shallow compliance on each point.

The method: after draft-zero, the agent executes a defined sequence of single-lens revision passes. Each pass reads the entire document through one specific governance concern. Passes are discrete operations — the output of each becomes the input of the next. The sequence ends with a regression check that re-reads the document looking for damage introduced by earlier passes.

---

## The Lens Sequence

Each pass applies one lens. The agent executes the pass, presents what changed, and waits for author direction before proceeding. The author may skip, reorder, combine, or add passes based on what the specific piece requires.

### Pass 1 — Guide Posture

**Lens:** Is the reader the hero? Does the essay open with their pain, not the author's system?

**Governing document:** `canon/constraints/guide-posture.md`

**What it catches:** Opening with system features instead of reader experience. Leading with "here's what I learned" instead of "here's what's frustrating you." The system revealed as product rather than plan.

**Three-question test:** (1) Who is the hero? (2) Does it open with their pain? (3) Is the system revealed as a plan, not a product?

### Pass 2 — Socratic Voice

**Lens:** Are assertions presented as declarations or as discoveries the reader makes through guided questions?

**Governing document:** `canon/constraints/guide-posture.md` (Socratic subsection) + observed author preference across all essay sessions

**What it catches:** Declarative operator voice where guide voice belongs. Telling the reader what to think instead of asking questions that lead them to the same conclusion. Sermonizing — especially in theological sections.

**The test:** Read each paragraph. If it asserts a conclusion, ask: could this be reframed as a question that lets the reader arrive at the same place? First-person confession is exempt — testimony is not assertion.

### Pass 3 — Confession Before Accusation

**Lens:** Where conviction is needed, does the essay use "we" not "you"? Is the author included in the indictment?

**Governing document:** `docs/book/governance-additions-2026-02-27.md` (Rule 10)

**What it catches:** Second-person accusation disguised as exhortation. "You need to rest" instead of "we need to rest." Finger-pointing that the reader can dismiss as not applying to them.

**The test:** Find every sentence that convicts. Is the author in the sentence?

### Pass 4 — Relational Sensitivity

**Lens:** Would every person and organization referenced recognize themselves and feel respected?

**Governing document:** `canon/constraints/relational-sensitivity.md`

**What it catches:** Named individuals who should be anonymous. Organizational friction framed as personal failure. Colleagues cast as villains rather than co-navigators of structural challenges. Quotes attributed without speaker verification.

**Five constraints:** (1) Structural not personal. (2) Show what worked. (3) Honor both relational and political tensions. (4) Consistent pseudonyms when needed. (5) Shared confession, not finger-pointing.

### Pass 5 — Factual Verification

**Lens:** Are all claims verifiable? Are attributed quotes real? Is scripture accurate?

**Governing document:** `canon/values/axioms.md` (Axiom 2: A Claim Is a Debt), `docs/book/governance-additions-2026-02-27.md` (known hazards)

**What it catches:** AI-fabricated attributed quotes. Scripture contamination across translations (must verify against BSB). Overclaiming — lived experience stated as demographic fact, directional trends as absolutes. Contradiction with published chapters or essays.

**The test:** Every attributed quote verified against source material. Every scripture reference mechanically checked. Every "always" and "never" questioned.

### Pass 6 — Progressive Disclosure Audit

**Lens:** Does the document work at every extraction depth — title, blockquote, metadata, summary, full?

**Governing document:** `canon/meta/writing-canon.md`

**What it catches:** Titles that don't signal stance. Blockquotes that tease instead of delivering the compressed argument. Summaries that require the body to make sense. Headers that read as generic form instead of telling the story. Buried claims not present at higher tiers.

**Seven-point checklist:** Title test, blockquote test, metadata test, summary test, header scan test, no buried claims, axiom space test.

### Pass 7 — Author Identity and Frontmatter

**Lens:** Does the frontmatter comply with the schema? Does author identity language follow constraints?

**Governing documents:** `canon/meta/frontmatter-schema.md`, `canon/constraints/author-identity-language.md`

**What it catches:** Quoted booleans and integers. Missing required fields for public essays (slug, author, type, public, description, hook). Identity violations ("Bible translator" instead of "software builder in Bible translation"). YAML type mismatches that cause blank pages.

### Pass 8 — Regression Check

**Lens:** Did any earlier pass introduce damage that another pass would have caught?

**Governing document:** All of the above, re-applied as a single read-through.

**What it catches:** Socratic voice pass that broke guide posture (e.g., opened with a question about the system instead of the reader's pain). Relational sensitivity pass that introduced declarative voice. Factual verification pass that lost the Socratic framing of a corrected claim. Any pass that solved its own concern while creating a new one.

**The test:** One complete read-through holding all lenses simultaneously — but only looking for *regressions from the draft-zero baseline*, not attempting new improvements. If regressions are found, fix them and note the tension for the author.

### Pass 9 — oddkit Gauntlet

**Lens:** Does the document pass the epistemic tools?

**Actions:** `oddkit_preflight` → `oddkit_challenge` (with explicit counter-arguments) → `oddkit_validate`

**What it catches:** Constraints the agent missed. Claims that don't survive pressure-testing. Completion gaps. `NEEDS_ARTIFACTS` is expected for text commits — not a failure.

---

## When to Apply

This sequence applies to all public essays (`writings/`) and book chapters after draft-zero. Internal canon documents (`canon/`, `docs/`, `odd/`) follow the Writing Canon gate but do not require the full lens sequence — the Socratic voice, confession-before-accusation, and relational sensitivity passes are specific to public-facing content.

Not every piece requires every pass at equal depth. After draft-zero, the agent proposes the sequence and notes which passes are high-value for this specific piece. Examples:

- An essay with theology → Pass 3 (confession) is high-value
- An essay with named colleagues → Pass 4 (sensitivity) is high-value
- An essay with no scripture → Pass 5 (factual) is lower-value
- A governance doc → Passes 2, 3, 4 are skipped; Passes 6, 7 are primary

---

## How the Agent Executes

1. **After draft-zero:** The agent proposes the lens sequence with a brief note on which passes are high-value for this piece.
2. **One pass at a time:** The agent executes one pass, presents what changed (specific edits, not just descriptions), and waits for author direction.
3. **Author controls the pace:** The author may say "do the next three" or "skip sensitivity, we'll do that after the reviewer reads it" or "combine Socratic and confession."
4. **Regression check is non-negotiable:** After all content passes, the regression check runs. It exists because the observed failure mode is real: each lens fixes its own concern while occasionally breaking another.
5. **oddkit gauntlet closes:** Preflight, challenge, validate. This is the formal gate before claiming the document is ready.

---

## Provenance — Why This Method Exists

This method was encoded because the author observed the same pattern across multiple essay sessions: after every draft-zero, the same questions were asked in the same order, and each question consistently improved the output. The questions themselves became a signal — if they're always needed, they should be proactive, not reactive.

The specific trigger was the "Your Context Window Needs a Sabbath" session (April 7, 2026), where the author asked for a Socratic voice pass after the draft-zero and then asked: "How do we address this with governance of multiple passes to address these missed concerns, as it's too much in a single pass but governance of new lenses each pass?"

The answer: sequential single-lens passes, each a complete read-through with one concern, ending with a regression check to catch what earlier passes broke.

---

## See Also

- [Writing Canon](klappy://canon/meta/writing-canon) — the progressive disclosure requirements each pass must preserve
- [Guide Posture](klappy://canon/constraints/guide-posture) — the constraint governing Passes 1 and 2
- [Relational Sensitivity](klappy://canon/constraints/relational-sensitivity) — the constraint governing Pass 4
- [Book Governance Additions](/docs/book/governance-additions-2026-02-27.md) — the source of Passes 3 and 5
- [Self-Audit Checklist](klappy://canon/self-audit) — the reflection layer this method extends
