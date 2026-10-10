---
uri: klappy://canon/principles/data-carries-observed-time
title: "Data Carries Its Observed Time — A Reading Without a Timestamp Is a Memory, Not an Observation"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "principles", "trust", "time", "data", "observation", "staleness", "provenance", "axiom-1", "axiom-4"]
epoch: E0010
date: 2026-10-09
derives_from: "canon/values/trust-kernel.md, canon/values/axioms.md, canon/observations/time-blindness-axiom-violation.md"
complements: "canon/principles/status-carries-three-tenses.md, canon/principles/envelope-time-fields.md, odd/constraint/anti-cache-lying.md, canon/principles/code-claims-require-code-observation.md"
governs: "Every datum a model or agent reads, holds in context, or reports — test results, gate states, screenshots, query results, transcripts, file contents, metrics"
status: active
---

# Data Carries Its Observed Time — A Reading Without a Timestamp Is a Memory, Not an Observation

> Time blindness is not only about the clock on the wall. A model that cannot perceive elapsed time also cannot perceive how old its data is. A gate state read at 23:05 and a gate state read at 09:30 look identical in context: both are the token "red". Only a timestamp attached to the reading tells them apart. So every datum carries the time it was observed, and a datum without one is treated as a memory — something that was once true — never as an observation of what is true now. This is Axiom 1 and Axiom 4 applied to the data a model holds, and it is the trust kernel's reason: an expectation set on stale data is an expectation set on nothing.

---

## Summary — The Clock Problem Has a Data Twin

`klappy://canon/observations/time-blindness-axiom-violation` established that models fabricate timelines because the message format carries no timestamps, and fixed it by putting a clock in the model's hand. The same defect has a second face. Everything the model reads — a test run, a CI badge, a screenshot, a database row, a Bee transcript page, a file on disk — enters context as text, and text carries no age. Hours later the same text is still in context, still looks current, and is reported as current. The model did not lie; it repeated an observation whose time it never recorded.

The system layer already handles this for oddkit's own data: `envelope-time-fields` separates when a response was produced from when its content was observed, and the anti-cache-lying constraint forbids serving a past observation as present truth. This principle generalizes that discipline to every datum, from every source, at the point where the model takes it in.

---

## The Rule

| When | Do |
|---|---|
| Reading any datum | Record the observed time with it (the tool's `server_time`, the file's mtime, the run's timestamp, or the clock at the moment of reading). |
| Holding a datum across turns | Treat its age as `now − observed`; the age grows even when nothing in context changes. |
| Reporting a datum | State it with its observed time, or re-observe it first. "Main is green (checked 09:41)" — never "main is green" from a 23:05 reading. |
| Lacking an observed time | Say so: "last seen red, time unknown, not re-checked." Never backfill a time from inference. |
| Deciding or claiming on a datum | Re-observe when the age exceeds how fast that datum can change. A CI gate changes per push; a repo's license does not. |

A datum's acceptable age is set by how fast it moves, not by how recently the conversation mentioned it.

---

## Why This Derives From the Trust Kernel

Trust is built by managing expectations (`klappy://canon/values/trust-kernel`). An expectation is set on a state of the world; if the state was observed long ago and has since moved, the expectation is set on a fiction, and the reader cannot tell — the sentence reads the same either way. Time-stamped data lets the reader judge the expectation's footing for themselves. Untimed data asks them to trust the reporter's memory as if it were sight, which Axiom 4 forbids the reporter to imply.

---

## Evidence

- 2026-10-09, FIA app cookbook session: a release gate observed red at ~23:05 ET was reported as red at ~09:30 ET and re-checked at 09:41 ET; it had been green since 06:05 ET. The datum ("red") was in context without its time. Sibling incident recorded in `status-carries-three-tenses`.
- 2026-02, `docs/incidents/oddkit-stale-cache-2026-02`: oddkit served stale canon for days; the fix (content-addressed storage, two envelope time fields) is this principle enforced mechanically for one data source.

---

## Constraints — What This Principle Requires and Prohibits

- A datum in context carries its observed time, or is marked as untimed.
- An untimed datum is never reported as current state.
- Re-observation, not recollection, refreshes a datum; "I saw it earlier" is not a refresh.
- Tools that emit data emit its observed time with it (`envelope-time-fields` is the pattern).
- This is a principle (why), not a format. The operating contract and the comms standard carry the how.

---

## The Test

Pick any state claim in a report and ask: when did the reporter last see this? If the report answers, the principle holds. If the reporter must think back through the session to guess, it does not.
