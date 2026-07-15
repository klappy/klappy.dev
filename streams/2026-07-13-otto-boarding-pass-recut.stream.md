# Stream — Otto Boarding Pass Re-Cut (flight sess_9be682b7)

Flight: sess_9be682b7 / item fl-9be682b7 · first-officer · claude-fable-5 · cowork
Captain civil date: 2026-07-13 (America/New_York); clock observed via oddkit_time (2026-07-14T03:56:51Z UTC).

## Checkpoint 1 — boarded and sourced (03:58Z)

- Fetched live: model-operating-contract (ntc39x), generic-boarding-pass (67jtg6), boarding-pass (9hpj6), otto-operating-card (fcr27b), ars dispatch-brief-conventions v0.6.0, dispatch-seat-guard (located).
- Preflight receipt: outputs/preflight-otto-boarding-pass-recut.md, passed, signed into attestation.
- Diagnosis confirmed against sources: generic pass says verbatim "the pass is framing and a pointer; the contract is the law." The kit's self-contained paraphrase inverted that.

## Checkpoint 2 — pass authored (this commit)

- Authored canon/bootstrap/otto-boarding-pass.md: one-page pass, creed+axioms verbatim (liturgy), pointers only for contract / conventions / operating card / seat-role constraints / guard / voice register; live mission state = one pointer, read the board (board_brief / ars_log_read). No state snapshot baked in.
- Decision folded kirigami-style: streams/2026-07-13-otto-boarding-pass-recut.foldout.tsv (one row, crystallize:decision, tier 1).
- Landed by PR to klappy/klappy.dev (canonical home of klappy://canon/bootstrap/*), captain assigned, no review-request.
