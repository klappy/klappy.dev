# Orchestrator Infrastructure

Runtime components for agent coordination and enforcement.

## Structure

```
infra/orchestrator/
├── router.js                    # Message routing (lookup detection)
├── services/
│   └── librarian.js             # Retrieval service (scoring + slicing)
├── validators/
│   └── librarian-response.js    # Citation compliance validator
└── run/
    └── handle-message.js        # Main message handler
```

## Quick Start

```bash
# Dry-run a query through the orchestrator
npm run orchestrator:dry -- "Where is the rule about visual proof?"

# Test individual components
node infra/orchestrator/router.js
node infra/orchestrator/services/librarian.js "your query here"
node infra/orchestrator/validators/librarian-response.js
```

## Components

### Router (`router.js`)

Detects lookup questions and routes to the appropriate service.

**Actions:**

- `CALL_LIBRARIAN` — Query is a lookup question (where/what/why/how + policy keywords)
- `CONTINUE_WORKFLOW` — Query is an action request (create/build/fix/etc.)
- `REFUSE` — Invalid input
- `ASK_FOR_ASSET` — (future) Missing required artifact

**Usage:**

```javascript
import { route, ACTIONS } from "./router.js";

const result = route("Where is the rule about visual proof?");
// { action: "CALL_LIBRARIAN", payload: { query, confidence }, debug }
```

### Librarian Service (`services/librarian.js`)

Citation-first retrieval service using the docs index.

**Features:**

- Weighted scoring (uri > title > headings > tags > subtitle > path)
- Authority bias (governing 1.15x, operational 1.0x, non-governing 0.85x)
- Headed slicing (extracts section by line number range)
- Keyword-to-section mapping (constraints/defaults/failures/verification)

**Usage:**

```javascript
import { searchDocs, formatLibrarianResponse } from "./services/librarian.js";

const result = searchDocs("visual proof constraints", { debug: true });
// { status: "FOUND", results: [...], debug: {...} }
```

### Validator (`validators/librarian-response.js`)

Enforces citation-first compliance. Prevents "citation laundering."

**Checks:**

- Status section present (`SUPPORTED` or `INSUFFICIENT_EVIDENCE`)
- Sources section present
- If `SUPPORTED`:
  - Evidence coverage proportional to answer length (1 per 120 words, min 2, max 6)
  - Each evidence bullet must have quote + `path#Heading` citation
  - Quote length constraints (8-40 words)

**Usage:**

```javascript
import {
  validateLibrarianResponse,
  analyzeLibrarianResponse,
} from "./validators/librarian-response.js";

const result = validateLibrarianResponse(responseText);
// { pass: true/false, status, errors: [], warnings: [] }
```

### Message Handler (`run/handle-message.js`)

Main orchestrator entry point. Chains router → librarian → validator.

**Flow:**

1. Route message
2. If `CALL_LIBRARIAN`: search docs, format response, validate
3. If validation fails: return `INSUFFICIENT_EVIDENCE` with errors
4. Return structured result

**Usage:**

```javascript
import { handleMessage } from "./run/handle-message.js";

const result = await handleMessage("Where is the rule?", { debug: true });
// { action, response, validation, debug }
```

## Orchestrator Rules

1. **Lookup questions → Librarian** — Any "where/what/why/how" + policy keywords
2. **Librarian must cite** — Responses validated for coverage
3. **Validation failure → INSUFFICIENT_EVIDENCE** — No silent invention
4. **Debug mode available** — Pass `{ debug: true }` for full trace

## Coverage Rules (Anti-Citation-Laundering)

The validator enforces these rules for `SUPPORTED` responses:

| Rule             | Requirement                                      |
| ---------------- | ------------------------------------------------ |
| Minimum evidence | 2 bullets OR 1 per 120 words of answer (max 6)   |
| Evidence format  | Quote (8-40 words) + `path#Heading`              |
| Heading required | Each evidence bullet must include heading anchor |

## See Also

- `docs/agents/librarian/contract.md` — The Librarian behavioral contract
- `docs/agents/librarian/trusted-sources.md` — What counts as authoritative
- `public/_compiled/index/docs.json` — The searchable docs index
