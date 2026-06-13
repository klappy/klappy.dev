---
uri: klappy://canon/methods/directory-submission-gauntlet
kind: canon
title: "The Directory Submission Gauntlet — From Working Code to a Submitted Listing"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["methods", "mcp", "directory", "submission", "shipping", "gauntlet", "E0010", "one-day-pipeline"]
epoch: E0010
date: 2026-06-12
derives_from: "canon/bootstrap/model-operating-contract.md"
complements: "canon/methods/publish-gauntlet.md, canon/methods/fresh-session-over-context-carry.md"
governs: "Every MCP Directory submission shipped from this flight deck: requirements fetch, collateral, test-account design, validation, form-fill, and the marketing that doubles as a demo. Phase 0's same-day fetch outranks this document wherever they disagree."
evidence: "git-repo-auth-mcp odd/ledger/ — 2026-06-10 phase-1; 2026-06-11 provenance-bugbot-and-reviewer-flow; 2026-06-11 submission-validation-pass + addendum; 2026-06-12 submission-day-debrief"
---

# The Directory Submission Gauntlet

*A method for taking an MCP server from working code to a submitted Claude Directory listing — field-tested end to end on git-repo-auth-mcp, submitted 2026-06-12, operated entirely from a phone. Target state when this method is mature: idea → submitted, with payments live, in one day.*

## Epistemic status (read first)

**Sample size: one.** Everything below was observed on exactly one complete submission run (2026-06-10 → 2026-06-12). Treat the document as a **hypothesis under test**, not settled doctrine — it graduates when a second submission walks it and the deviations are folded back in.

Confidence is not uniform across the claims:

- **High (mechanically observed, repeatable in principle):** the favicon-crawl gate and its remedy chain; TOTP seed mechanics; the phone-only DCR+PKCE validation rig; client views trimming annotations; the form's draft-persistence and post-submission editability.
- **Medium (held once, plausibly general):** the collateral-doc workflow; the test-account design; the triple-validation structure; the form-fill rules; the entity-coherence checklist.
- **Projection (untested):** the one-day timeline. No run has achieved it; it is the target this method exists to reach, not a result it has produced.

**Disconfirmers — what would force revision:** Anthropic changing the form or requirements (expected; see the self-override clause below); Google changing favicon plumbing; a second submission where risk-based verification, the favicon gate, or the review process behaves differently; a reviewer rejecting the check-plus-disclose pattern. Alternatives considered and rejected this run are recorded in the ledger entries (e.g., reviewer-alias-as-primary-email — rejected on observed mechanics; Drive as the asset filestore — rejected for the public repo's demo value).

**Self-override clause:** Phase 0's same-day fetch outranks this document. Wherever the live requirements and this method disagree, the live requirements win, and the disagreement is a ledger entry that revises this method. Reversibility: every prescription here is reversible except none — the method instructs no one-way doors; the submission itself remains editable after the button.

## Why a gauntlet

Submission is not a form; it is an audit you run on yourself before a stranger does. Every field is a claim, every claim is a debt, and the named rejection causes (missing annotations, missing privacy policy, broken OAuth, no sample data) are all preventable by observation before submission. The gauntlet's posture: **nothing on the form is asserted that was not observed.**

## The clock: start the slow things first

Two items have lead times nothing can compress. Start them the day the domain goes live, not on submission day:

1. **Google favicon crawl.** The form gates on a *required* checkbox verifying `https://www.google.com/s2/favicons?domain=<domain>&sz=64`. A never-crawled domain serves the default globe regardless of correct site-side favicons. Day-zero actions: declare `<link rel="icon">` tags on the *root* page (the page crawlers hit; don't assume secondary pages' tags cover it), verify the domain in Search Console (a Domain property on the apex covers all subdomains), and Request Indexing for the MCP host. Convergence observed: overnight; the faviconV2 store updates before s2 edge caches, so different vantage points disagree for hours.
2. **The reviewer test account's history.** A brand-new platform account created mid-submission works, but every day of benign age lowers risk-based friction.

## Phase 0 — Same-day requirements fetch

Requirements pages move. Fetch https://claude.com/docs/connectors/building/submission, the review-criteria page, the Software Directory Terms, and the Directory Policy **on the day of use**, and date the fetch in the ledger. Rules learned:

- Terms may change without notice; only the live text counts. (MCPB clauses — open-source, spec-evolution — belong to the desktop-extension path, not remote MCP.)
- The operator personally reads Terms, Policy, and review criteria, because the operator attests. Crew can fetch and structure; reading is not delegable.

## Phase 1 — The collateral document (the answer sheet)

Create `governance/internal/directory-submission-collateral.md`: every form field, pre-answered, with ⏳ markers on operator-only items (GA date, policy reads, credentials). At form time, filling becomes transcription. House style for listing copy, observed from claude.com/connectors: taglines short and benefit-first (≤55 chars enforced); descriptions 50–100 words; the positioning sentence pre-empts the reviewer's likeliest question instead of waiting for it.

**The numbers rule (E0010):** any figure in authored collateral is grepped from the enforced governance document at the moment of writing. Summaries written from memory lose to the sources they ship beside — observed when a downstream generator out-cross-checked the author by trusting the verbatim appendix.

## Phase 2 — Reviewer test account

Design principle: **the reviewer walks the genuine new-user path** — same connector URL, same OAuth, same install flow, same free tier. No special server modes; the only special thing is the account.

- Dedicated platform account; email is an operator-controlled alias (recovery stays home).
- **TOTP from day one.** Risk-based device verification is non-deterministic — it waved through a same-network test and would likely challenge a datacenter login; TOTP replaces email verification outright. The setup key is a *candidate* until one code confirms it (every page load mints a new candidate); once enrolled it is permanent, and one seed drives any number of authenticators. Form gets username + password + seed + a one-line authenticator instruction. Recovery codes never leave the operator. Do **not** attempt the reviewer-alias-as-primary-email route: verification gates primary, and nobody reads that inbox pre-review.
- Sandbox repo: **private** (so token-gated clone proves something), populated via browser in minutes — README, two source files, a branch, an open PR. "No sample data" is a named rejection cause.
- Setup instructions written as a numbered walkthrough with **expected outputs stated** (exact default permissions, the quota block, the refusal) so deviation is detectable by the reviewer themselves.
- Zero-state restore before submission: uninstall the App *and* revoke the OAuth authorization, so the reviewer meets genuine first-run consent.
- Credentials must outlive review: nothing in the package may expire in under 30 days.

## Phase 3 — Triple validation, wire-level

Three passes, three contexts, reports filed to the ledger **including clean ones** — three independent "nothing found" is evidence.

1. **Requirements conformance (fresh session):** public pages return 200; Origin validation (hostile → 403, absent → 401); OAuth discovery complete; **tool annotations read off the wire** — client tool-definition views trim `title`/`annotations`; only a raw `tools/list` is an honest instrument.
2. **Reviewer simulation (operator):** execute the setup doc literally on every surface to be claimed; any deviation from the text is a finding against the doc.
3. **Adversarial read:** run the negative tests nobody runs — the read-only token's push *refused*, the quota wall's message truthful at zero, the hostile-content thought-test on tool descriptions.

**The phone-only validation rig** (no desktop required): DCR-register a throwaway OAuth client → PKCE pair → hand the operator the authorize URL → operator authenticates in their own browser → operator pastes back the single-use redirect code (useless without the held verifier; credentials never touch chat) → raw `initialize` / `tools/list` / `tools/call` → revoke the grant. Two uses on the evidence run: annotation confirmation, full tool exercise. This satisfies the "MCP Inspector" half of the pre-submission requirement by protocol equivalence.

## Phase 4 — Entity, money, brand coherence

The reviewer cross-references; every surface must answer to the same name.

- **Company field = the entity that bills and indemnifies** (the LLC, not the human). Name it in the terms (counterparty), privacy policy (controller), site footer, and README *before* submitting — an unnamed counterparty plus a bank statement bearing the LLC's name is a discoverable mismatch.
- **Stripe statement descriptors:** umbrella LLCs set the account *prefix* (shortened descriptor) and a per-product `statement_descriptor` suffix — never a static account descriptor that future products would inherit wrongly.
- **Logo:** the deployed asset, never an approximation; the form pulls from Google's favicon of the MCP host.

## Phase 5 — Form-fill rules

- **Checkbox honesty under force:** when a form requires N selections, rank claims by survivability under a hostile read against your published documents; conditional "(if applicable)" qualifiers are the honest out for unperformed assessments (e.g., GDPR).
- **Ambiguity → check-plus-disclose:** for boxes whose intent is clear but whose letter is ambiguous (API-ownership for credential brokers built on a platform's sanctioned third-party mechanism), check and disclose the exact structure in the free-text field. The reviewer rules with full facts; silence is the only wrong move.
- **Test-data and surface claims:** check only what was run. "Not required" plus honestly-unchecked beats checked-but-untested.
- The form holds drafts across days and remains editable post-submission ("Edit your response") — corrections route there.

## Phase 6 — Marketing that is also a demo

- Promotional cards show **real tool output** captured during validation — confidence by evidence, not adjectives. House the assets in the public repo and link the GitHub tree as the filestore: the marketing pushed by the bot identity with self-minted tokens *is* a demo.
- **Prompts are outcome-first.** Users never ask for the mechanism; they ask for outcomes, and the card shows what happened underneath. Staged-demo framing that contradicts real agent behavior is a defect: capable agents self-correct scope, so the refusal is the floor for what *can't* ask properly — write the claim that survives an expert watching their own agent work.
- Generated media (NotebookLM et al.) regenerates from a knowledge base whose appendix carries the governing documents **verbatim**; authored summaries inside it obey the numbers rule.

## The standing meta-rules (earned, each with a scar)

1. Claims are debts; observation pays them — including **operator-facing instructions**, whose blast radius routes through human hands.
2. Numbers are grepped at write time, never recalled.
3. Client views are never evidence about the wire.
4. Secrets pasted in chat are burned — revoke and regenerate immediately; recovery codes regenerate without re-enrollment.
5. Marketing claims about agent behavior are checked against agents, not demos.
6. Failures go to the debrief and become canon. No blame, no repeat.

## The one-day timeline (target shape)

Morning: domain live, favicon tags + Search Console indexing requested, App registered, worker deployed, governance docs written, Stripe products + descriptors set. Midday: test identity + sandbox (≈15 min), triple validation (phone rig suffices), collateral doc completed. Afternoon: assets rendered from real validation output, entity lines merged, form transcribed from collateral, submit. The only residue that can't be compressed is Google's crawl — which is why it started at breakfast.
