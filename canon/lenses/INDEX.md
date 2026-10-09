# lenses/INDEX.md — klappy.dev (portable lenses, the house's cross-project layer)
frame: 1.0.0

| lens | owner | kind | phase | class | gate | body | owner_reviewed | state |
|---|---|---|---|---|---|---|---|---|
| `klappy://canon/methods/driver-seat-lens` | house (prompt: Jeffrey Emanuel) | portable | shaping | meal, entrée, catering | design | 1.0.0 | 2026-09-03 | active |
| `klappy://canon/lenses/klappy-strategy` | klappy | portable | evaluating | meal, catering | order, bind | 0.1.0 | — | draft |
| `klappy://canon/lenses/klappy-architect` | klappy | portable | evaluating | meal, entrée, catering | design | 0.1.0 | — | draft |

Import by URI: a project INDEX lists the URI in the `lens` column and the seat
resolves it with `oddkit_resolve` at run time (frame:
`klappy/kitchen` `cookbook/lenses/INDEX-TEMPLATE.md`). Draft rows run and
leave rows in `custody=run`; they do not block bind until `owner_reviewed`
is set.
