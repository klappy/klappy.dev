---
uri: klappy://canon/principles/a-proxy-is-a-projection-surface
title: "A Proxy Is a Projection Surface, Not a Router"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: experimental
status: proposed
tags: ["canon", "principle", "proxy", "projection", "disclosure", "compilation", "vodka-architecture", "epistemic-surface"]
kind: canon
epoch: E0010
date: 2026-07-10
derives_from: "canon/values/axioms.md, canon/principles/a-proxy-confers-shape-not-standing.md, canon/principles/vodka-architecture.md, writings/artifacts-are-projections.md"
governs: "Any proxy that stands between a source corpus and a consumer — retrieval surfaces, extraction pipelines, transcoders, compilers, and forwarding layers"
complements: "canon/constraints/retrieval-disclosure-contract.md, canon/methods/epistemic-surface-extraction.md, canon/principles/consistency-same-pattern-every-time.md, canon/patterns/docs-proxy-canon-as-tool.md, docs/audits/projection-inventory-2026-03-21.md"
---

# A Proxy Is a Projection Surface, Not a Router

> Proxies offer projections, not just routing. Transport is the floor a proxy must clear; projection is the reason it exists. An active proxy — oddkit, the cartographer, the transcoder, the compiler — does not wrap and forward: on every pass it compiles a derived view from source, and the value is manufactured in the passage itself. Canon already holds the instances without the principle: oddkit projects the corpus at whatever disclosure tier the caller declares; epistemic surface extraction projects non-text evidence into legible, containment-stamped surfaces; compilation projects source into wipeable packs. This principle marries them to `a-proxy-confers-shape-not-standing`: standing is not the ceiling on a proxy's value — it is one property the projection governs while the projection does the real work of transformation. The knowledge base is the planet; the proxy is the press that prints each map. And the press stays vodka: the projection rules are generic, the corpus carries all the flavor.

---

## Summary — Routing Is the Floor; Projection Is the Point

The word "proxy" carries a networking inheritance: a thing that stands between two parties and forwards bytes. That inheritance undersells every proxy this program actually builds. When oddkit answers a retrieval call, it does not return the repo — it compiles a view of the repo at the disclosure tier the caller declared: title floor, blockquote, metadata, summary, or body, per the retrieval disclosure contract (`canon/constraints/retrieval-disclosure-contract.md`). When epistemic surface extraction (`canon/methods/epistemic-surface-extraction.md`) meets a screenshot or a recording, it does not forward the file — it manufactures a surface: segmented, anchored, quoted, and stamped non-canonical. When compilation runs, it does not copy source — it derives a wipeable pack that can be regenerated at will.

These are the same move. A proxy stands at the boundary between a source and a consumer, and at that boundary it performs a projection: a derived view, computed on each pass, shaped for the consumer's declared need. Routing — addressability, reachability, transport — is the floor. A proxy that only routes has done the minimum. The point of holding the boundary is the transformation you get to perform while holding it.

This does not overturn `a-proxy-confers-shape-not-standing`; it completes it. That principle bounds what a proxy may *assert* — wrapping never grants standing. This principle names what a proxy may *manufacture* — a projection whose value lives in the transformation. Standing is one property the projection governs on its way through, not the ceiling on what the passage is worth.

---

## Passive and Active — Wrap-and-Forward Versus Compile-on-Pass

Two kinds of proxy share the boundary position and differ in everything else.

A **passive proxy** wraps and forwards. The bytes that leave are the bytes that arrived, plus headers. Its value is reachability, and reachability is real — but it is also the whole of the value, which is why passive proxies commoditize.

An **active proxy** compiles. Each pass reads source and derives a view that did not exist before the call: filtered, tiered, segmented, transcoded, or packed. The output is a function of the source *and the request*, which means the same source yields a hundred different projections without the source changing. The value is manufactured in the passage. Nothing needed caching, nothing went stale, because the projection is computed against the source that is still sovereign.

The distinction matters because the passive framing quietly caps ambition. Design a proxy as a router and every transformation looks like scope creep. Design it as a projection surface and the transformations are the roadmap: which views does this boundary owe its consumers, at which declared tiers of detail?

One boundary case keeps the claim honest. The docs-proxy pattern (`canon/patterns/docs-proxy-canon-as-tool.md`) is deliberately a pinned forwarding layer — it must not parse, rank, or reframe. That is not a counterexample; it is the last hop of a projecting chain. The projection happens upstream in oddkit, and the forwarder's discipline exists precisely to keep the projection logic in one place. A chain may put its press wherever the vodka boundary demands, but somewhere in the chain, the press is the point.

---

## The Instances Already in Canon — Four Proxies, One Move

- **oddkit projects canon at declared disclosure.** Every retrieval action shares one contract: URI + title as floor, with `blockquote`, `metadata`, `summary`, `body` as caller-declared additions. Five actions, one projection engine; the caller names the tier, the proxy prints the map at that tier.
- **ESE — the cartographer's move — projects non-text evidence into legible surfaces.** A recording or screenshot arrives illegible to agents; the extraction manufactures a segmented, anchored, observational surface, and stamps it non-canonical on the way through. Transformation and governance in a single pass.
- **The transcoder projects media into media.** Same source, different rendering surface — a projection where the derived view is itself an artifact in another modality.
- **Compilation projects source into wipeable packs.** The pack is derived, portable, and disposable on purpose; regeneration is cheap because the source never left home (`docs/archive/context-packs-and-projection-detail.md`, and the projection-inventory audit at `docs/audits/projection-inventory-2026-03-21.md`, which found ~15 committed files that should have been projections — a committed projection is a cached lie).

Four surfaces, one grammar: source in, declared need in, derived view out, computed fresh on each pass.

---

## Reconciling with Shape-Not-Standing — Standing Is Governed, Not the Ceiling

`a-proxy-confers-shape-not-standing` is the guardrail: transport transfers for free, standing never does, and an ungated proxy is an authority-laundering machine. Read alone, it can leave the impression that a proxy's ambition tops out at safe transport — that the best a proxy can do is forward without lying.

The reconciliation is that the two principles govern different verbs. Shape-not-standing constrains what the proxy *asserts about* its output: provenance stamped, standing defaulted to untrusted, data not instruction. This principle describes what the proxy *does to* its input: compile the derived view the consumer declared. A projection is allowed to be enormously valuable while conferring no standing at all — indeed the exemplar is ESE, whose entire design is "legible without doctrine": it performs a rich transformation (segmentation, anchoring, emphasis preservation) and stamps containment in the same gesture. The surface is far more useful than the raw artifact, and it arrives with *less* claimed authority, not more.

So standing is one property the projection governs in passing — a field the press prints on every map — while the transformation carries the value. The guardrail binds harder, not softer, as proxies become more active: the more manufacturing happens in the passage, the more deliberate the provenance and containment stamps must be, because a compiled view is one step further from its source than a forwarded byte.

---

## The Planet and the Vodka — Where the Value Lives, Where the Flavor Lives

Two settled commitments locate this principle.

*Artifacts are projections* (`writings/artifacts-are-projections.md`): the knowledge base is the planet; every artifact is a map printed from it, disposable because reprinting is cheap. This principle names the press. A projection needs a projector, and the proxy is where the printing happens — each retrieval call, each extraction, each compilation is one map coming off the press while the planet stays sovereign underneath.

*Consistency, same pattern every time* (`canon/principles/consistency-same-pattern-every-time.md`): the engine stays flavorless. The projection rules — disclosure tiers, surface contracts, pack formats — are generic across every knowledge base the proxy serves; oddkit projects a 400-document architecture canon and a 26-document theology corpus through the identical contract. Domain flavor lives in the corpus, never in the press. An active proxy is not license for an opinionated one: the moment the projection logic learns a domain, it has stopped being vodka, and the fix is the same as ever — move the specificity into the documents and let the proxy surface it generically.

---

## Smell Test — Underselling and Overbuilding

- **"It's just a proxy."** The underselling smell. If a boundary component is being scoped as pure transport, ask what view its consumers actually need and whether the boundary should be compiling it.
- **A committed file that a proxy could compute.** A cached projection pretending to be source. Wipe it and project on demand.
- **Projection logic acquiring domain vocabulary.** The overbuilding smell — active does not mean flavored. Push the specificity into the corpus.
- **A transformation without a stamp.** A projection that reshapes content but forgets provenance and containment has kept the power and dropped the guardrail. Both travel together or the projection does not ship.

---

## Relationship to Canon

This principle is the bridge between two halves canon already holds. It completes `a-proxy-confers-shape-not-standing` by naming the value that standing-discipline was always guarding: the guardrail bounds assertion, this names manufacture, and each without the other misleads — power without the stamp launders authority, the stamp without power is a router with a conscience. It gives `writings/artifacts-are-projections.md` its missing instrument: the essay names the planet and the maps; this names the press. It inherits the vodka boundary from `consistency-same-pattern-every-time` and `vodka-architecture`, which keep the press flavorless. The retrieval disclosure contract, ESE, and compilation are its existing worked instances; `docs-proxy-canon-as-tool` is the disciplined last hop of a projecting chain. Per `models-do-not-mutate-canon`, this document stays a candidate until the author ratifies it.

---

## Confidence, Status, and Retraction

This is a working belief at candidate tier. It rests on a structural observation across four in-house instances (oddkit disclosure, ESE, transcoding, compilation), all built by the same hands under the same canon — self-consistency, not external validation. What would graduate it: a proxy built by someone else, against a different corpus, whose value demonstrably lives in the projection rather than the transport. What would weaken it: a class of boundary components where wrap-and-forward proves durably more valuable than any derived view, or evidence that projection-at-the-proxy systematically loses to projection-at-the-consumer. If transport and transformation someday collapse into one primitive — every wrapped source arriving pre-projected at declared detail — this principle dissolves into the transport layer and stops being a separate claim.
