---
uri: klappy://canon/methods/toc-ooda-sprints
title: "Method: ToC OODA Sprints"
status: tasting
date: 2026-09-23
audience: canon
kind: method
exposure: nav
tier: 2
voice: third_person
stability: draft
tags: ["canon", "methods", "theory-of-constraints", "ooda", "cadence", "orchestration", "token-economy"]
relevance: decision
---

# Method: ToC OODA Sprints

> Name the one constraint, look again every thirty minutes, and ship last window's frozen work while building this window's.

## Why this method exists

Long builds run by agents drift in a known way. Agents optimize locally, work piles up in front of the one person who has to rule on it, and throughput does not move while inventory does (→ `klappy://canon/identity/2026-08-30-three-primary-constraints` §Theory of Constraints map). A plan that says "deliver everything in one batch" hides that pile until the end.

This method came out of one week on one build, 3D Review, 2026-09-19 to 2026-09-22. It rests on one case. Read every rule below as scoped: on one agent-run web build with one operator, this is what held and what broke. Outside that context it is untested. Status is tasting.

## What it is

Both parts are borrowed, not coined: Theory of Constraints is Goldratt's, the OODA loop is Boyd's. Theory of Constraints says where to look: the single thing limiting progress now. OODA says how often to look: observe, orient, decide, act, and repeat. Put together, the constraint is re-chosen at every loop instead of once per project.

The unit of the loop is a fixed 30-minute sprint. Each sprint ends in a delivery someone can verify, and the next sprint starts from what was verified, not from what was reported.

Journal rows cited below are agent-written and marked unvalidated in their own source. They record what an agent says the operator asked for; they are not transcripts. Shorthand: `3dfe#NN` means kitchen `journal/2026-09-21-3d-feedback-evaluation.tsv#3d-review-20260922-NN` (or `-20260921-NN` for rows 01 to 65).

## The loop

Observe is the heartbeat. What is on the remote branch, which checks are green, what version is deployed. The practice kept "the author reports tests pass" separate from "the coordinator saw the commit on the remote" (3dfe#82, 3dfe#93).

Orient picks one constraint and one owner. On 3D Review it moved from token burn (3dfe#62) to controller integration and proof (3dfe#82) to release preparation (3dfe#104).

Decide is an order with a base commit and an exact list of paths the lane may touch (3dfe#81, 3dfe#110).

Act is a worker starting on its own branch with a named checkpoint time. A start counts only when observed, not when promised (3dfe#81, 3dfe#100).

The cadence tightened over two days. A roadmap in ToC and OODA terms was asked for on 9/21 (3dfe#62). A 24 to 36 hour estimate was rejected for a 4 to 6 hour target (3dfe#97). Four minutes later the target became 30-minute sprints with a release each window and several workers in parallel (3dfe#98).

## The drum

The drum is the fixed clock the loop runs against. On 3D Review the marks were :18 and :48 past the hour (3dfe#114).

Shipping trails building. Each window builds N while independent validation and release ship the frozen N-1 (3dfe#114). Nothing waits for the full rollout, and a checklist marked done does not count as a release (3dfe#114). A missed slot is recorded as missed and the baseline is not reset (3dfe#104, 3dfe#114).

Each mark produces one status line with five fields (3dfe#93):

1. current work
2. verified change since the last mark
3. the single constraint and who owns it
4. the next milestone, stated as conditional
5. release stage

The line is written in plain words with spaces. Compressed jargon was rejected as unreadable (3dfe#104).

## Parallel lanes

Several workers run at once only when each has its own branch, its own exact file list, and no shared writes. On 9/22 a staff lane, a participant lane, a code-export lane, a release owner, a correction worker and independent reviewers ran together (3dfe#99 to 3dfe#112).

Before a lane is fired, its owner gate passes: base commit, path list, checkpoint time and reviewer are all named (3dfe#101, 3dfe#110). The checkpoint is a promise of evidence, not a release time (3dfe#114).

Reviewers are never the authors of what they review (3dfe#85, 3dfe#103).

Work in progress through the operator is one. Anything only the operator can do arrives as a single yes or no, batched to the next mark. On 3D Review those items were unlocking a machine so a worker could be seen (3dfe#75, 3dfe#76), approving a folder (3dfe#79), approving a narrow exception on a stale check (3dfe#123), approving production (3dfe#124), and provider settings agents could not read (3dfe#104). Feed the constraint rather than make it wait (→ `klappy://canon/identity/2026-08-30-three-primary-constraints` §Do not starve the constraint).

## Scaling ladder

Start with one small loop and widen only after the smaller shape held. The order on 3D Review:

Triage feedback with ToC and OODA (3dfe#01, 3dfe#05). Widen to the whole roadmap once asked whether all of it was orchestrated and the answer was "partial" (3dfe#29, 3dfe#30). Cut one design batch into bounded slices (3dfe#32, 3dfe#63 to 3dfe#67). Hand the build to one fresh worker under a charter, with internal agents limited to planning and review (3dfe#72). Make small measured amendments (3dfe#89 to 3dfe#96). Then run the 30-minute drum with parallel workers (3dfe#98). Finally, pause new features and ship two accepted slices, keeping unfinished work for later (3dfe#117).

A shape scales when a lane can take an order, start on its own branch and hit its checkpoint without the operator, with review running beside it. That held for the three implementation lanes (3dfe#100, 3dfe#101, 3dfe#111). It did not hold for release, which missed every slot (3dfe#104, 3dfe#109). So the drum alone does not make a serial step parallel; where one lane depends on outside tools or operator proof, the method has not yet shown it helps. The earlier lesson points the same way: parallelize only after schemas, contracts and the design shape are fixed (Mori session fa24aa61, 2026-09-19, secondary source).

## Failure modes observed

The coordinator stopped at milestones and had to be told to continue (kitchen `journal/2026-09-21-3d-feedback-evaluation.tsv#3d-review-20260922-68`). An hour was lost expecting execution that was not happening (`…#3d-review-20260922-69`).

A fresh worker could not write to the repositories and stopped with no code (`…#3d-review-20260922-73`, `…-76`, `…-77`). A locked machine meant nobody could see it (`…#3d-review-20260922-75`).

A visible checklist read 9 of 9 while amendments were still running (`…#3d-review-20260922-92`). Green bot checks sat beside a reproduced race that was still open (`…#3d-review-20260921-65`).

Three production slots in a row were missed: release preparation ran serially, depended on a cloud tool, and was blocked on proof of a provider setting (`…#3d-review-20260922-104`, `…-109`, `…-114`). A stale duplicate check blocked a merge until the operator named an exception (`…#3d-review-20260922-122`, `…-123`).

Token burn was named the biggest constraint, and acknowledgement chatter and unchanged polling were banned (`…#3d-review-20260921-62`). Status written as compressed jargon was rejected (`…#3d-review-20260922-104`).

## Applies to

Orchestration at any size. An epic, a batch of tickets or a single ticket runs the same loop: one constraint, one owner, a fixed mark, trailing delivery, lanes with exact files.

Token economy runs the same loop too. Input and output are both inventory that competes for one reader's attention. The 2026-09-23 ruling applies ToC and OODA to both: cite instead of restating, one row per act, and a status channel that is optimized rather than removed (kitchen `debriefs/2026-09-23-layout-cemented.md` §Output economy).

| Method term | Example on the kitchen rail |
|---|---|
| epic | meal |
| sprint | one work unit in `/work/active`: owner, path list, base commit, checkpoint |
| delivery | receipt row: merged sha, deployed version, independent verifier |
| drum mark | :18 and :48 |
| operator | captain |
| batched yes/no | `ASK.md` in the work unit, read by the door |

## What only the operator can supply

These stay open. The draft flagged them and nothing on record settles them.

1. Whether :18 and :48 are the general drum or a 3D Review setting, and whether 30 minutes is the default window.
2. Whether "work in progress through the operator is one" is his rule or an inference drafted from the rows. The draft marked it as inference.
3. What counts as proof that a lane's shape scales. The test above (order, start, checkpoint without the operator) is the draft's inference.
4. Whether the kitchen mapping in the table is right. The draft left it "(Captain to shape.)"
5. Whether the first-person account in the draft, attributed to him through agent-written rows, matches what he meant. Rows are unvalidated.
6. Which journal rows, if any, should be promoted from agent summary to his quoted words.
7. What result on a second build would count against the method, for example a drum that adds status overhead without moving throughput.
