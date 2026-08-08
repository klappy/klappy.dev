---
uri: klappy://canon/definitions/cooking-taxonomy
kind: canon
status: candidate
date: 2026-08-04
revised: 2026-08-07
ratified: 2026-08-07
derives_from: klappy://canon/kernel/trust
governs: "Every client-facing packaging of the house's AI and software work — menus, proposals, statements of work, pricing structure, onboarding, teaching, deliverable naming; fetched at the moment any artifact a client will read is chartered or drafted; internal crew operations remain under the airline frame."
tags: [cooking-taxonomy, client-frame, recipe, menu, role-reconciliation, trust-kernel, projection, ninety-nine-one, kitchen-roles, tasting, sub-recipes, service-tiers, gates, service-formats, counter-service, kitchen, cooking, dishes, meals, pantry, chef, restaurant, catering, customization-spectrum]
---

# The Cooking Taxonomy — Recipes, Cookbooks, and Menus as the Client-Facing Frame

> WHEN AND WHERE THIS POLICY APPLIES. Fetch this document when chartering or drafting anything a client will read — a menu, proposal, statement of work, onboarding note, or price sheet; when naming or scoping deliverables for a non-crew audience; when triaging a served dish that missed its declared product (Tasting, §4); when setting process ceremony for a new client or team (Gates Stay in the Kitchen, §6); or when teaching the workflow to a new team, in the culinary-school format (§5).
>
> Do not apply it to cockpit surfaces: dispatch briefs, flight operations, and validation gates keep the airline vocabulary, per the Wrap Ruling (§11).
>
> The dining-room test: if the reader is a diner, this document governs; if the reader is crew, it does not.
>
> Known informally as: the kitchen, the cooking metaphor, the recipe system, the menu. All of those names point here.

## 1. The Unit

A recipe is the smallest unit of the taxonomy: declared ingredients (what is needed from the client), declared instructions (the ordered process), and declared product (what results). A recipe is expectation management made concrete — the trust kernel's claim that trust is built and maintained by managing expectations, rendered in a form a client can hold at a glance. Ingredients, instructions, and product are stated in advance, so nothing about a dish is discovered mid-execution.

A recipe's instructions declare not only preparation but validation — how the finished dish is checked against the declared product. Execute and validate are both in the card; a recipe that cannot say how its dish is checked is incomplete.

## 2. The Nesting

Scopes nest by size, not by kind. A dish is one cooked instance of a recipe. A meal bundles dishes served together in one sitting. A meal plan organizes meals across time. A cookbook is the full collection of recipes a kitchen can cook. The recipe is the spec; the dish is one instance of that spec. A failed dish is evidence about an instance, not a verdict on the recipe — the recipe stands until enough instances validate or invalidate it.

The blender anti-pattern: separate dishes must be properly prepared; everything cannot be thrown into a blender and made all at once. The nesting exists to forbid the blender — dishes are cooked each from their own recipe and combined only at the meal.

Granularity rule — a task needs only a dish; a product is more than a task and needs a full meal.

Meal prep is part of the meal plan — pre-cook what you can ahead of time so daily service is fast, and the kitchen never starts the day from scratch.

## 3. Served Dishes Are Projections

The kitchen is source-space: recipes and the cookbook are versioned, curated truth. The table is projection-space: a served dish is a projection rendered from recipe plus ingredients, and meals and meal plans organize projections for serving. This resolves the apparent axis-switch in the nesting — recipe → cookbook collects specs, dish → meal → meal plan aggregates instances, and the projection relationship connects the two planes.

Corollary laws, stated tersely: never structurally edit a dish — season to taste or scrap and re-cook (see Tasting, §4); structural fixes belong to the recipe. A dish is evidence — the served projection is the observable input to validation, compared against the recipe's declared product. The menu is the projection interface — the queryable surface of what the kitchen can render. A borrowed ingredient is a materialized projection from another scope, consumed as input.

The same invariant governs the cockpit — the log is truth, boards and briefs are projections — one law on both sides of the kitchen door.

Manage recipes, not files. A dish is temporary — you consume it, throw it away, or take a photo of it as a reference; the files a kitchen produces are dishes. The recipe is the managed asset: version it, curate it, and let every dish stay disposable.

## 4. Tasting: Season, Scrap, or Amend

A dish that misses its declared product has three dispositions. SEASON — some failure modes have known remedies in the recipe's own vocabulary: a little too much of this, add a pinch of that, flavor to taste; bounded in-instance adjustment, applied at runtime or after tasting, and noted. SCRAP AND RE-COOK — some rescues cost more than the re-render; the sunk-cost trap is trying so hard to save a dish that scrapping would have been faster, cheaper, and produced a better end dish. Scrapping is cheap precisely because dishes are projections: the recipe survives the scrap, and only the render cost is lost. AMEND — a pinch that keeps recurring is not seasoning anymore; it graduates into the recipe, so the kitchen never re-learns the same adjustment. Decision rule: if the fix requires reopening the instructions or the ingredients, it is not seasoning — it is rewriting the recipe inside one instance; scrap, amend the recipe, re-cook. The call belongs to the dish's named owner (§13), the director's judgment at the pass.

A further disposition sits before the others — COOK LONGER. Some dishes are not wrong, only not done; continuing is distinct from seasoning. The full set at the pass: serve, cook longer, season, scrap, amend.

## 5. The Menu

A cookbook teaches how to cook; a menu is what a diner orders from. The distinction is audience: the cookbook is written for whoever cooks, the menu for whoever orders. Clients order from the menu and never see the kitchen — they do not read recipes, track ingredients, or watch instructions execute. Self-serve versus done-for-you is the choice between buying the cookbook and ordering off the menu: the first hands over the recipes, the second delivers the dish.

The menu spans service tiers, fast food to wedding catering — a proof of concept is a happy meal, production is a five-course wedding meal, and the same cheeseburger can appear on both menus prepared to a different tier. The client's chief contribution at the menu is deciding what to spend.

Three service formats, confirmed in the field: counter service — one diner, one sitting, one inline taste; catering — engagements ordered as meal plans with staged gates; culinary school — the client buys the cookbook, learns to cook, and raises a curator of their own. One kitchen serves all three.

The menu exists because cooking became instant. When execution is no longer the constraint, planning and tasting are — and a menu with a meal plan is how a kitchen organizes the new bottleneck instead of drowning in fast dishes.

## 6. Gates Stay in the Kitchen

The diner never carries the gates. The kitchen runs its full process — modes, checks, records — internally; if a client must track process to get a dish, the kitchen has leaked into the dining room. Gate visibility scales on two axes. Hands in the kitchen: a single cook's gates compress into one sitting — idea, cook, one taste, serve, never revisit; the taste before serving IS the validation gate, inline and singular. A team needs explicit gates or hands collide. An organization shipping to everyone needs strict gates and a written manual. Blast radius: a snack cooked for yourself deserves loose gates; a dish served to a whole congregation deserves strict ones. And gates must match the tier — a process stricter than the dish warrants makes the diner resent a kitchen that could cook fast but refuses. One-sitting counter service is the compression minimum of the process, never an exception to it.

## 7. The Customization Spectrum — From Fast Food to Your Own Kitchen

The menu question beneath every engagement is what the client supplies. FAST FOOD — off-the-shelf AI: pre-prepped, packaged, house ingredients; the client picks and steers a little; it is someone else's kitchen entirely. MENU ORDERING WITH YOUR GROCERIES — the client brings ingredients per order, consumed in one sitting. CATERING WITH YOUR INGREDIENTS — the client supplies standing ingredients, sometimes their own implementing team; the house kitchen cooks. YOUR OWN KITCHEN — a stocked pantry, your own recipe cards, perhaps your own chefs.

The groceries-versus-pantry law: bringing ingredients per order is a shopping bag; a pantry is a standing, organized store — organized data, a knowledge base, a second brain. The pantry is what makes a kitchen yours: you cannot bring your own recipes to someone else's restaurant. Stocking the pantry is itself a dish — the gateway dish of every custom engagement.

And the ownership clause: you do not have to own the kitchen; customization is measured by what the client supplies — ingredients, recipes, chefs — never by who holds the lease.

## 8. The 99/1 Thesis

The client's product is almost entirely unique; the process that builds it is almost entirely shared. Uniqueness enters through ingredients, never by rewriting recipes. Each new dish cooked from a clear recipe compounds the kitchen — mixing and matching grows with the cookbook. This is why a cookbook is a business and not a binder.

(Captain's claim, partner call, 2026-08-04.)

Recipe costs decay with reuse — each re-cook is cheaper than the first, which frees the kitchen for the next contract and the next client.

## 9. Role Reconciliation (March → August)

On March 14, roles were mapped as: knowledge bases = pantry, tools = kitchen implements, AI configurations = recipes, users = chefs with their own kitchens. The August nesting refines this rather than discarding it. Pantry remains the substrate — knowledge bases and prior outputs, the ingredient store. Kitchen becomes the runtime and infrastructure the work executes on. Chef/cook is now agents — the crew that performs the instructions on a client's behalf, not the client. A recipe is no longer "an AI configuration"; it is the ingredients-instructions-product spec, and an AI configuration is one kind of recipe among others.

| March term | August term |
|---|---|
| Pantry | Substrate: knowledge bases, prior outputs |
| Kitchen implements | Runtime / infrastructure |
| Recipe = AI configuration | Recipe = ingredients + instructions + product spec (AI configuration is one kind of recipe) |
| Chef (user, own kitchen) | Agent / crew (executes recipes on the client's behalf) |

## 10. Borrowed Ingredients and Sub-Recipes

Some ingredients are human-provided by the client; some are previous dishes or meals pulled in from another scope. Reuse crosses scope boundaries: a dish from one meal can be borrowed as an ingredient in another, and a meal plan can borrow finished meals rather than recooking them. This is the composability law — a recipe is not required to originate all of its own ingredients from scratch. A client's existing work product — e.g. a year of prior 3D-review development — is itself ingredients handed to the kitchen.

The sub-recipe law — a recipe's output can be a prerequisite ingredient of another recipe: meringue is its own recipe before lemon meringue pie, a brand story is its own recipe before marketing. Dependencies are declared as prepared-before ingredients, never folded into one longer recipe.

## 11. The Wrap Ruling

Cooking wraps, and does not replace, the airline/dispatch frame. Cooking is the dining room: what clients see, what they order, the recipes and menu built for them. Airline is the cockpit: how the crew flies — dispatch, flights, validation gates — internal to execution. The two frames answer different questions for different audiences and must not mix in client-facing material: a menu does not mention dispatch, and a flight log does not mention courses.

The metaphor is locked (working lunch, 2026-08-06). The airline frame was judged too complicated to keep clear for clients and stays cockpit-internal. The author's own earlier construction metaphor — "bulldoze the house, keep the blueprint," his first essay on this way of thinking — was retired by its author: demolition provokes attachment arguments, while a meal invites "we liked most of it; adjust the recipe next time." The kitchen withstood direct pressure-testing and carries across cultures without translation.

## 12. Mapping to Existing Machinery

Recipe ≈ charter or skill. Dish ≈ artifact or outcome. Meal ≈ engagement deliverable. Meal plan ≈ roadmap or retainer cadence. Cookbook ≈ productized catalog. Menu ≈ the client-facing offer list. Agents perform the instructions; clients never execute them. For software delivery, the dishes are planning, building, QA, DevOps/CICD, maintenance, and support — the Covenant Ventures shape.

The kitchen itself is the tech stack. Each dish is handed off press-play style: a kick-off artifact of ingredients and instructions delivered to a named owner who runs it.

## 13. Kitchen Roles

People hold dishes, not only agents. A product/project-management role curates the cookbook — decides what recipes exist, retires what fails, keeps recipes clear enough for agents to execute. Named dish-owners run the QA and support kitchens. This resolves the curator question formerly open.

The season-scrap-amend call of §4 belongs to the dish's named owner, escalating to the cookbook curator when the recipe itself is in question.

The diner's side has tasters too. Clients name per-dish approval owners — doctrine owners taste content, guideline owners taste design — and their findings feed the amend loop, so client feedback improves recipes, not just dishes. The curator prioritizes by frequency: the most-repeated work earns the first recipe cards in the cookbook.

## 14. Acceptance Criteria

Four words govern the frame: simple, fun, clean, understandable. The acceptance test: if the captain's wife — a non-technical, bilingual business owner, and the first diner — can order from the menu unaided, any client can. Cooking is chosen as the metaphor because it needs no explanation; everyone already understands a kitchen.

The grounding tripwire — a solution without a grounded problem people actually feel is just a metaphor that sounds good; every recipe must name the felt problem its dish answers.

## 15. Worked Micro-Examples

**(a) Romance by Tata Oro brew card.** A recipe shipped before the taxonomy was named: declared ingredients (coffee, ratios), ordered steps for two brew methods, and an expected cup as the declared product — client-facing, no kitchen visible.

**(b) Covenant Ventures 3D-review engagement.** A meal plan: dishes for planning, building, QA, maintenance, and support, ordered off a menu rather than assembled ingredient by ingredient. Proposal due August 14, 2026.

## 16. Open Questions

The packaged-goods question is answered by the spectrum's fast-food end — off-the-shelf items exist, in someone else's kitchen; the house's live question is now where the house pantry ends and the client's pantry begins — what substrate is shared and what is the client's own store. Pricing unit — per dish, per meal, or per plan — is still open. The boundary between a meal plan and a retainer needs a rule, not a feel. How much of the kitchen a culinary-school client is shown, and in what order, remains open. And implementation: whether recipe cards compile into skills — "skills are the modern-day script" — or stay markdown the agents consume directly.
