# ODD Compared: What It Is, What It Isn't, and How It Relates to Everything Else

> ODD is about preserving intent without freezing execution. The measure of success is not how elegant the artifact is, but whether the outcome holds up in the real world.

---

## Who This Is For

You might be a developer evaluating how to work with AI agents. You might be a leader trying to understand the landscape. You might just be curious. This page meets you where you are.

ODD — Outcomes-Driven Development — is an approach to building software that prioritizes real-world results over artifacts. It is not a framework, not a workflow, and not a product. It is a collection of patterns, derived from real use, that reduce specific kinds of friction in agentic coding.

The best way to understand what ODD is: compare it to things it gets mistaken for.

---

## ODD vs. Spec-Driven Development (SDD)

**What SDD does:** Treats structured specifications — requirements, acceptance criteria, design docs — as the primary artifact. AI generates code from specs. Tools like Kiro, GitHub Spec Kit, and Tessl automate the flow from spec to implementation.

**Where they overlap:** Both treat natural language intent as more durable than code. ODD's "Prompt over Code" principle and SDD's "spec as source of truth" share DNA. Neither trusts code to be the authoritative record of what was intended.

**Where they differ:** SDD is a workflow. It tells you how to structure files, when to generate, and what to keep. ODD doesn't prescribe any of that. ODD asks a different question: *did the outcome actually hold up?* You could use SDD inside an ODD-informed project. You could also use ODD without specs at all. SDD optimizes the generation pipeline. ODD governs whether the result was worth generating.

---

## ODD vs. Evaluation-Driven Development (EDD)

**What EDD does:** Applies TDD thinking to probabilistic AI. Define what "good" looks like through evals and metrics before building, then iterate against those measurements. Popularized in AI engineering by practitioners like Chip Huyen.

**Where they overlap:** Both insist on evidence over vibes. EDD says "define your evals first." ODD says "a claim is a debt" — every assertion requires evidence proportional to its weight. The instinct is the same: don't trust fluent outputs.

**Where they differ:** EDD is scoped to model and system evaluation. ODD is broader. Evals are one form of evidence in ODD, but so are visual proof, working demonstrations, and direct observation of system state. ODD also carries governance patterns — progressive maturity, decision records, self-audit — that EDD doesn't address. EDD optimizes AI outputs. ODD governs the decisions around them.

---

## ODD vs. AI-Driven Development Life Cycle (AI-DLC)

**What AI-DLC does:** Reimagines the software development lifecycle with AI as a central teammate rather than a tool. Phases like Inception, Construction, and Operations replace traditional sprints. Humans provide oversight at decision gates. Developed at AWS.

**Where they overlap:** Both put human judgment at the center. AI-DLC's "human gates" and ODD's emphasis that "ODD does not replace judgment — it exists to support it" point at the same problem: AI is powerful but not trustworthy without oversight.

**Where they differ:** AI-DLC is a lifecycle — it prescribes phases, roles, and a sequence. ODD is not a lifecycle. It's a set of lenses that work inside any lifecycle, including AI-DLC. You could run AI-DLC phases and apply ODD's evidence standards at each gate. ODD doesn't care what your process looks like, only whether your outcomes are real.

---

## ODD vs. Governance Frameworks (NIST AI RMF, EU AI Act, OECD Principles)

**What they do:** Provide risk management, compliance requirements, and ethical principles for AI systems. NIST offers voluntary guidance (Govern, Map, Measure, Manage). The EU AI Act enforces legal requirements by risk tier. OECD Principles set international norms.

**Where they overlap:** All share the goal of trustworthy AI. ODD's axioms — Reality Is Sovereign, Integrity Is Non-Negotiable Efficiency — echo the spirit of these frameworks. Both NIST and ODD want evidence-based assessment of AI systems.

**Where they differ:** Governance frameworks operate at the organizational and regulatory level. They tell you what to report, what to assess, what to document for compliance. ODD operates at the development level. It shapes how you think while you build. A team could be fully NIST-compliant and still ship systems that quietly lie about their own state. ODD's axioms are designed to prevent exactly that — not through compliance, but through epistemic habit.

---

## ODD vs. Agentic Tooling (LangGraph, CrewAI, AutoGen)

**What they do:** Provide orchestration and runtime infrastructure for AI agents. LangGraph offers graph-based control flow with strong observability. CrewAI organizes agents into role-based teams. AutoGen enables conversational multi-agent systems.

**Where they overlap:** Both care about reliability in AI-driven systems. LangGraph's emphasis on observability and debugging resonates with ODD's axiom that "you cannot verify what you did not observe."

**Where they differ:** These are implementation tools. ODD is not. You could build a LangGraph application governed by ODD's Canon — using its evidence standards to validate agent outputs, its progressive maturity to scale rigor, its decision records to track why an architecture was chosen. ODD doesn't compete with LangGraph any more than a building code competes with a crane. Different altitude entirely.

---

## The Difference Under the Differences

Most approaches in the AI development space answer one of two questions: *How should we build?* (SDD, EDD, AI-DLC, agentic tools) or *What rules should we follow?* (NIST, EU AI Act, OECD).

ODD asks a third question: **How do we know what's actually true?**

This is the epistemic layer. Four axioms drive it:

1. **Reality Is Sovereign** — observe before asserting. No narrative overrides what is observably true.
2. **A Claim Is a Debt** — every assertion requires evidence. Unverified claims are liabilities.
3. **Integrity Is Non-Negotiable Efficiency** — shortcuts on truth always cost more than they save.
4. **You Cannot Verify What You Did Not Observe** — if you didn't look, you don't know.

These aren't aspirational. They're load-bearing. They constrain behavior specifically when it would be easier to skip verification, assert completion, or trust a confident-sounding output.

---

## The Constraint That Governs Everything Else

ODD has one supreme rule that overrides all its own patterns, principles, and structure:

**Use Only What Hurts.**

Structure is only allowed in response to concrete, experienced pain. If no specific friction can be named, do nothing. If the friction is tolerable, tolerate it. Completeness is not a goal. Elegance is not a goal. Relief is the goal.

This is what makes ODD fundamentally different from frameworks. Frameworks ask you to adopt a system. ODD says: don't adopt anything until something actually hurts, and stop using it when the pain subsides.

If ODD ever becomes something that must be followed, it has failed.

---

## When to Reach for ODD

ODD is most useful when:

- AI agents are generating plausible outputs that nobody is verifying
- Your team ships fast but can't explain why things broke
- Process exists for compliance but doesn't prevent real failures
- You want governance that developers will actually use, not route around

ODD is least useful when:

- You need a specific tool or workflow (look at SDD tooling, LangGraph, etc.)
- You need regulatory compliance documentation (look at NIST, EU AI Act)
- You're not building with AI and don't experience the friction ODD addresses

---

## Summary

| | What it gives you | What it doesn't |
|---|---|---|
| **SDD** | Spec-to-code workflow | Outcome verification |
| **EDD** | Eval-driven model optimization | Governance beyond evals |
| **AI-DLC** | AI-native lifecycle | Flexibility across lifecycles |
| **NIST/EU/OECD** | Compliance and risk frameworks | Dev-level epistemic discipline |
| **LangGraph/CrewAI** | Agent orchestration | Governance of agent outputs |
| **ODD** | Epistemic discipline for outcomes | Prescribed tooling or workflow |

ODD doesn't replace any of these. It layers underneath them — or beside them — as a set of patterns for making sure the outcomes are real.

If that's useful to you, use it. If it isn't, don't. That's the whole point.

---

## See Also

- **[Resonance Index](/canon/resonance/README.md)** — ODD's relationship with foundational works like Antifragile, Lean Startup, OODA Loop, Sprint, and the Double Diamond. Where ideas echo ODD — and where ODD explicitly chooses different tradeoffs.
- **[Foundational Axioms](/canon/values/axioms.md)** — The four values from which all ODD epistemic discipline is derived.
- **[ODD Overview](/odd/README.md)** — What ODD is, in its own terms.

---

*ODD is open, forkable, and designed to be adapted. If you don't share its axioms, fork and encode your own.*
