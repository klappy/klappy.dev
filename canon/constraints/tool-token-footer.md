---
uri: klappy://canon/constraints/tool-token-footer
title: "Tool Token Footer — Every Content-Producing Tool Meters Its Own Tokens at the Door"
status: tasting
date: 2026-09-24
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["canon", "constraint", "tokens", "token-economy", "metering", "telemetry", "tool-envelope", "cl100k", "context-economy", "progressive-disclosure"]
relevance: decision
derives_from: "canon/constraints/telemetry-governance.md, canon/constraints/verification-and-evidence.md, canon/constraints/measure-before-you-object.md"
complements: "canon/constraints/retrieval-disclosure-contract.md, canon/constraints/legibility-standard.md, canon/methods/writing-simple-rules.md"
governs: "The `tokens` footer that every content-producing tool response carries: its fields, its tokenizer, where it sits in each envelope, and how it feeds the kitchen token-economy sticker"
target_repo: "outcomes-driven-development"
---

# Tool Token Footer — Every Content-Producing Tool Meters Its Own Tokens at the Door

> Every tool that returns content says, in its own envelope, how many tokens the whole source
> would have cost and how many it actually sent: `tokens: {source, returned, ratio, tokenizer}`.
> The tool already holds both texts when it answers, so this is the cheapest place to count, and
> the count is metered, not guessed by the model that reads it. Captain's ask, 2026-09-24:
> "all tools that produce content should self report total token count of file(s) that would
> have been in context if returned vs total token count of the response and the ratio…
> cheapest to compute then and there at their door, not at the llm." Ruled `1` (make it law).

---

## Simple Rules

- **Use when:** Use when building or changing any tool that returns file, document, search, or generated content into an agent's context.
- **Skip when:** Skip for tools that return only status, ids, or acknowledgements with no content body, and for counting prompts or reads made outside a tool.
- **Stop when:** Stop once every content response carries all four `tokens` fields in its envelope and the same numbers reach the provider's telemetry.
- **Keep going when:** Keep going while any content response lacks the footer, puts it in prose, names no tokenizer, or relies on the model to estimate.
- **Where:** The response envelope of every content-producing tool (MCP servers, oddkit actions, HTTP and CLI tools) and that provider's telemetry; not the prose body.
- **Who:** Whoever builds or maintains the tool; the reading model never computes or edits the footer.
- **Why:** The tool holds the source and the response at the moment it answers, so it counts once and exactly; model self-reports have proven unreliable (see WHY).
- **What:** A four-field contract: `source` tokens, `returned` tokens, `ratio = returned / source`, and the named `tokenizer`, `cl100k_base` as the shared ruler.
- **How:** Tokenize the full source and the sent payload with cl100k_base at the tool's door, then emit `tokens` in the envelope per WHERE IT LANDS and log it per FEEDS THE LEDGER.

---

## WHAT — The Contract

Every content-producing tool response MUST carry a `tokens` object in its machine-readable
envelope:

```json
"tokens": {
  "source": 5093,
  "returned": 354,
  "ratio": 0.07,
  "tokenizer": "cl100k_base"
}
```

A tool is **content-producing** when its response puts document, file, search, or generated
text into the caller's context. Tools that return only status, ids, counts, or acknowledgements
are out of scope (see WHAT IT DOES NOT COVER).

### Fields

| Field | Type | Meaning |
|---|---|---|
| `source` | integer | Tokens of the full file(s) that would be in context if the tool had returned them whole. For several files (a search, a bundle), the sum over every distinct file the response draws from. |
| `returned` | integer | Tokens of the content actually sent: the payload the caller's context receives, envelope metadata excluded. |
| `ratio` | number or `null` | `returned / source`, rounded to two decimals (more if needed to be non-zero). `null` when `source` is 0. |
| `tokenizer` | string | The encoding both counts used. `cl100k_base` unless a second count is added (see Tokenizer rule). |

Reading the ratio: `1.0` means the tool sent the whole source; `0.07` means progressive
disclosure sent 7% of it; above `1.0` means the tool sent more than the source (wrapping,
repetition, or generated expansion). All three are legal; the footer makes them visible.

**Generated content with no file behind it** (a summary built from live state, a computed
report): `source` is the tokens of the inputs the tool read to build it, when those are files
or documents; when there is no document input, `source` equals `returned` and `ratio` is `1.0`.
The tool never invents a source it did not read.

### Tokenizer rule

1. **One shared ruler.** Every footer counts with `cl100k_base` (`tiktoken` or `gpt-tokenizer`
   cl100k), so footers from different tools and providers add up and compare. This is the same
   ruler the kitchen sticker already uses.
2. **Name it, always.** `tokenizer` is required even when it is the default. An unnamed count
   is not a reading.
3. **A second tokenizer is additive, never a swap.** A provider that also wants its own model's
   count adds a sibling field (for example `tokens.native: {returned, tokenizer}`); the four
   cl100k fields stay.
4. **Exact, not estimated.** Counts come from running the tokenizer on the actual text.
   `bytes / 4`, `chars / 4`, and word counts are estimates and do not satisfy this contract.
5. **Same text, same count.** `source` and `returned` are counted on the text as the tool holds
   it (after decoding, before transport framing), so a re-run over the same inputs gives the
   same numbers.

---

## WHY — Cheapest at the Door, Metered, Not Self-Reported

**Cheapest at the door.** When a tool answers, it holds the full source it read and the
payload it is about to send. Counting there costs one tokenizer pass over text already in
memory. Counting anywhere later costs more and knows less: the model sees only what was sent,
never the source it was spared, so it cannot compute `source` at all.

**Metered, not self-reported.** The kitchen token-economy sticker records the motivating
failure: every production input number was a seat's own guess ("~35K tokens loaded"), one field
was filled with the count of GitHub tokens minted, and the only metered production reading came
from a one-off re-measure. A model asked to report its token use guesses, and the guess cannot
be graded. A tool footer is a meter: the same inputs give the same numbers, and the grade can
move on them.

**It makes disclosure visible.** Progressive disclosure (floor, summary, body) is the main
input lever. Without a footer, its savings are claimed; with one, every call shows its own
ratio, and a tool that quietly returns whole files shows up as `1.0` on every call.

---

## WHERE IT LANDS — Emitted in the Envelope, Not in Prose

The footer lives in the machine-readable part of the response, where code and telemetry can
read it without parsing text. It MUST NOT be written only into prose (`assistant_text`, a
markdown body, a trailing sentence); a prose mention is allowed as a copy, never as the only
carrier.

| Envelope | Where `tokens` sits |
|---|---|
| **oddkit-style action envelope** (`action`, `result`, `server_time`, `assistant_text`, `debug`) | Top-level key `tokens`, sibling of `result`. Not inside `debug`: the footer is always on, and debug traces are off by default. |
| **MCP `tools/call` result** | `structuredContent.tokens` when the tool returns structured content; otherwise `_meta.tokens` on the result. Never only inside a `content[].text` string. |
| **HTTP / REST JSON response** | Top-level key `tokens` in the JSON body. Non-JSON bodies (raw files) carry it in a response header `X-Tokens` holding the same JSON object. |
| **CLI tool** | With `--json`, a top-level `tokens` key. In human-readable mode, the footer MAY be printed to stderr; stdout content stays clean. |
| **Batch / multi-action responses** | One `tokens` object per item, plus a top-level `tokens` total whose `source` and `returned` are the sums and whose `ratio` is recomputed from them. |

**Also into telemetry.** The same four fields are written to the provider's telemetry for each
call (under the provider's existing telemetry governance), so a provider's metered input can be
read per day, per tool, and per caller without replaying responses.

---

## FEEDS THE LEDGER — How the Footer Reaches the Sticker

The kitchen token-economy sticker (`klappy/kitchen` `cookbook/token-economy/`: `STICKER.md`,
`LEDGER.tsv`, `HOW-TO-UPDATE.md`) grades each lever by comparing a metered production ratio to
its lab estimate. Its INPUT gauge reads ⚪ Unrated today because no production input is
metered. The footer is the meter.

1. **Per call:** the tool emits `tokens` in the envelope and writes it to its telemetry.
2. **Per provider, per window:** the provider's telemetry sums `returned` (metered input it put
   into context) and `source` (what whole-file returns would have cost). `sum(returned) /
   sum(source)` is that provider's production disclosure ratio.
3. **Per run:** a runner that wants its seat's metered input sums the `returned` of the tool
   footers it received, and records it as its production input reading.
4. **Into `LEDGER.tsv`:** one row per reading, `kind=production`, `method=cl100k/tool-footer`,
   `value` = summed `returned`, `baseline` = the gauge baseline (or summed `source` for a
   per-provider disclosure row), `ratio = value / baseline`, `source_path@sha` = the telemetry
   query or foldout row that holds the sum. The update rule in `HOW-TO-UPDATE.md` governs the
   grade; this contract only supplies the metered number it was missing.

A footer reading is metered; a runner's "~40K loaded" stays `method=self-report` and never moves
a grade.

---

## WHAT IT DOES NOT COVER

- **Prompts.** System prompts, the operator's messages, and the model's own output are not tool
  responses. They are counted at the runner or harness level, not by tools.
- **Reads outside tools.** Boarding files the harness injects, files read by built-in editor or
  shell reads that are not content tools under this contract, and cached context re-sent between
  turns. These are a **runner-level count**: the runner tokenizes what it loaded with the same
  cl100k ruler and records it beside the footer sum, never mixed into it.
- **Status-only tools.** Acknowledgements, ids, timestamps, and counts carry no content body;
  no footer is required (one is allowed).
- **Cost and billing.** The footer counts tokens, not money, and does not replace the model
  provider's usage report. Where a harness shows provider usage, record it as a second ledger
  row, per `HOW-TO-UPDATE.md`.
- **Output tokens.** The sticker's OUTPUT gauge (tokens per plated unit) is measured from the
  files a unit writes, not from tool footers.

---

## ENFORCEMENT — Honestly Graded

- **L1 service check (target).** Each provider's own tests assert that every content-producing
  tool response carries a `tokens` object with four fields of the right types, `tokenizer`
  named, and `ratio` equal to `returned / source` within rounding. A response without it fails
  the provider's test suite. This is the enforcer; until each provider ships it, that provider
  is not conforming.
- **L3 audit (interim).** A sampled call per tool, compared against an independent cl100k
  count of the same source and payload. Mismatches are findings, fixed in the tool.
- **L4 posture.** A model reporting its own token use is not a substitute and never satisfies
  this contract.

## VERIFICATION

- Call any content tool: the envelope has `tokens` with `source`, `returned`, `ratio`,
  `tokenizer`, outside prose.
- Re-tokenize the returned payload with cl100k_base: the count matches `returned`.
- Fetch the whole source and tokenize it: the count matches `source`.
- The provider's telemetry for that call carries the same four values.
- The sticker's INPUT gauge carries at least one `method=cl100k/tool-footer` production row.
- **Falsifier:** if footer sums and an independent runner-level count of the same tool outputs
  disagree by more than rounding, the footer is miscounting and the tool is not conforming.

## Failure Modes

- **Prose Footer:** the counts appear only in `assistant_text`, where no meter can read them.
- **Estimated Footer:** `chars / 4` passed off as a count.
- **Unnamed Ruler:** counts with no `tokenizer`, so they cannot be added to anyone else's.
- **Returned-Only Footer:** `source` omitted, so disclosure savings stay invisible.
- **Debug-Only Footer:** the footer lives in a debug trace that is off by default.
- **Double Count:** runner-level reads added into the footer sum, so one read is counted twice.

## See Also

- [Telemetry Governance](/canon/constraints/telemetry-governance.md)
- [Retrieval Disclosure Contract](/canon/constraints/retrieval-disclosure-contract.md)
- [Verification and Evidence](/canon/constraints/verification-and-evidence.md)
- [Measure Before You Object](/canon/constraints/measure-before-you-object.md)
- [Legibility Standard](/canon/constraints/legibility-standard.md) (Simple Rules shape)
- [Writing Simple Rules](/canon/methods/writing-simple-rules.md)
- `klappy/kitchen` `cookbook/token-economy/` — the sticker, ledger, and update rule this footer feeds
- [Constraints](/canon/constraints/README.md)
