# TICKET — Carve the practice dimension: temporal governance for infra implementation
Ordered: 2026-08-08 (chef-owner) · Lane: 1-ordered · Class: governance
Risk: elevated (touches klappy.dev canon mount + scaffolding contract —
chef-owner ratifies all doc text before merge).

## Order
Carve a dimension of governance for INFRASTRUCTURE IMPLEMENTATION
DETAILS — distinct from canon. Canon is timeless (trust, evidence,
axioms). This layer is TEMPORAL: "the way we do it now," era-stamped,
expected to expire. Heroku -> GH Pages -> Netlify (~3-5yr) ->
CF Pages -> CF Workers projects (6 months). Rotation is accelerating
and now turns inside a single vendor, so docs name the PRACTICE
(git-connected project, push-to-deploy), vendor as detail within.

## Scope — binds the builder AND the built
1. The system itself: how kitchen/portfolio fixtures deploy, name,
   hold secrets.
2. The systems it builds: every project scaffolded under this
   governance inherits current-era infra defaults BY CITATION
   (shim cites the stable URI; never copies the content).

## Mechanics (all existing plumbing)
- Stable URI, rotating answer: identity-resolved-by-protocol +
  oddkit supersession chains; resolve walks to the current era.
- Era stamp: epoch + review_by (~6 months at current cadence).
- Birth certificates: every scaffolded system stamped with its birth
  epoch -> fleet audit = query for systems born under superseded eras.
- Append-only supersession (R14 upward): old eras never deleted;
  the chain IS the archaeological record.

## Crew duties this creates
- Preflight-resolve the relevant practice BEFORE prescribing any
  implementation move (deploys, hosting, naming, secrets, tooling).
- A practice doc past review_by gets flagged aloud, not prescribed from.
- Capture ritual: when chef-owner corrects a method preference in any
  session, crew drafts the practice doc THAT TURN for ratification.
  "I'm repeating myself" = a debrief trigger, process failure.

## Open rulings (chef-owner)
1. NAME of the layer (practice/? the menu? something else).
2. MOUNT point (top-level beside canon in klappy.dev, same oddkit door).

## Product (done means)
Layer mounted + resolvable via oddkit; first-generation backfill from
the greatest repeated hits: deploy (push-to-deploy, Workers projects,
epoch 2026-07), worker naming (namespaced house instances / bare names
reserved for decoupled engines), secrets handling. Scaffolding contract
amended: new projects cite + carry birth epoch. Chef-owner ratified
every word.
