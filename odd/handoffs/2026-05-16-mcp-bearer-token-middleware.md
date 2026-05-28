---
uri: klappy://odd/handoffs/2026-05-16-mcp-bearer-token-middleware
title: "Handoff — MCP Server Bearer-Token Middleware (Supabase JWT + PAT Validation)"
audience: odd
exposure: nav
tier: 2
voice: terse
stability: draft
tags: ["handoff", "session", "mcp", "auth", "supabase", "jwt", "pat", "cloudflare-workers", "vodka-architecture", "execution-contract", "epoch-9"]
epoch: E0009
date: 2026-05-16
derives_from: "canon/constraints/borrow-evaluation-before-implementation.md, canon/principles/vodka-architecture.md, canon/constraints/release-validation-gate.md, docs/oddkit/sales/unified-account-launch-plan.md"
complements: "docs/oddkit/sales/unified-account-launch-plan.md, klappy/oddkit:workers/src/index.ts, klappy/aquifer-mcp:workers/src/index.ts"
governs: "Worker code in klappy/oddkit, klappy/aquifer (and future TruthKit Worker repos) — the shared validateBearerToken() middleware that authenticates MCP callers against Supabase-issued JWTs and project-issued PATs. Out of scope for the Lovable account-surface build; in scope for follow-on Worker-repo sessions."
status: open
---

# Handoff — MCP Server Bearer-Token Middleware

> A single 30-line middleware shared across klappy.dev MCP servers (`klappy/oddkit`, `klappy/aquifer`, future `klappy/truthkit`) validates the `Authorization: Bearer <token>` header on every request. Two token shapes: live-user JWTs issued by Supabase Auth (signature-verified against the Supabase JWKS) and long-lived Personal Access Tokens (PATs, prefixed `oddkit_`, hash-looked-up in the Supabase `pats` table). Today the middleware answers one question only — *"is this caller authenticated, yes or no?"* — and does not gate behavior on tier or entitlement. JWT claims still carry entitlements at issue time; future tier-gated features read them when those features ship.

---

## Summary

The customer surface ships on `account.klappy.dev` via Supabase + Lovable + Stripe per `klappy://docs/oddkit/sales/unified-account-launch-plan`. That surface issues two kinds of credentials customers use against MCP servers: short-lived JWTs (for live web/AI sessions where the user signs in) and long-lived PATs (for headless MCP clients like Cursor, Claude Code, ChatGPT that need a pasteable token). Every klappy.dev MCP server needs to validate either credential at the Worker edge before serving the request. This handoff specifies that middleware as a single file shared across server repos by copy or by lifting to a small published package later.

Today's behavior is intentionally minimal. Authenticated callers see the same surface as anonymous callers do — there is no tier-gated tool path yet, no rate-limit differential, no entitlement-aware response. The middleware exists tonight to *terminate the anonymous-by-default era* and to give future tier features a place to hang off. The reason this is `Build = minimal` and not deferred entirely: a single middleware in three repos is cheap; backfilling auth to three repos after tier features exist is not.

The companion canon for the substrate decision is `klappy://canon/constraints/borrow-evaluation-before-implementation` and the 6B Table B in this doc satisfies it. The companion plan for the customer surface that issues these tokens is `klappy://docs/oddkit/sales/unified-account-launch-plan` — read it first.

---

## Scope

In scope:

- A `validateBearerToken(request, env)` middleware function that returns `{ user: { id, email, entitlements } } | null`.
- JWT validation against the Supabase JWKS endpoint.
- PAT validation against the Supabase `pats` table via Supabase service-role key.
- JWKS caching at the Worker edge (15-minute TTL).
- Wiring the middleware into `klappy/oddkit`'s existing tool router so every MCP request flows through it.
- Replicating the same middleware in `klappy/aquifer-mcp`.

Out of scope:

- OAuth-MCP server endpoints (`/.well-known/oauth-protected-resource`, `/.well-known/oauth-authorization-server`, dynamic client registration). Deferred per the Bide row below.
- Tier-gated tool behavior. The middleware annotates the request with claims; no tool reads them today.
- Rate-limit differentiation. Same limits for anonymous and authenticated for v1.
- TruthKit Worker integration. Lifts when TruthKit ships its first MCP endpoint.

---

## 6B Evaluation — MCP-side authentication (Table B)

This satisfies `klappy://canon/constraints/borrow-evaluation-before-implementation` for the MCP-server middleware implementation task.

**Candidate substrates inventoried:** `jose@^5` (JWT signature verification, JWKS support), `@cloudflare/agents` (Cloudflare's MCP server framework with built-in auth helpers), `@modelcontextprotocol/sdk` (TS SDK from MCP authors, OAuth helpers emerging), `jsonwebtoken` (Node-classic, not CF Workers-friendly).

| Step | Verdict | Justification |
|---|---|---|
| Borrow | `applied` | `jose@^5` for JWT signature verification against Supabase's JWKS (`https://<project>.supabase.co/auth/v1/.well-known/jwks.json`); `@supabase/supabase-js` (service-role client) for the PAT hash lookup. `@cloudflare/agents` evaluated; its auth helpers fit the JWKS path but bring framework conventions (`McpAgent`, durable-object-backed sessions) that the oddkit Worker does not currently use. Adopting just the auth helpers without the framework is awkward; `jose` is the leaner Borrow. |
| Bend | `applied` | One shared `validateBearerToken(request, env)` function across servers. Reads `Authorization: Bearer <token>` header. Token-shape sniff: if it starts with `oddkit_` → PAT path (hash + lookup); else → JWT path (signature-verify against JWKS). Returns a uniform `{ user, entitlements }` shape regardless of which path validated. |
| Break | `none-yet` | Will surface when wired: (a) JWKS caching behavior at the Worker edge under burst load; (b) PAT-hash lookup latency on cold Worker invocations; (c) `pgcrypto.crypt()` comparison cost at scale. Each becomes a real Break only when measured under production load, not preemptively. |
| Beget | `n/a` | No third party building this slice. |
| Bide | `waiting` | OAuth-MCP-client flow (per the MCP Authorization spec, 2025) is the right *future* UX — "Click Connect → sign in once → done," no API-key paste. **Tripwire:** when 2+ major MCP clients (Claude.ai, Cursor, Continue, Cline, ChatGPT MCP) ship interactive OAuth-MCP UX that visibly beats paste-a-key in real user testing. **Fallback during wait:** PAT bearer tokens — current universal SaaS-API pattern. **Inspection criteria when tripwire fires:** vision-fit (does the client OAuth flow match Klappy's user-provisioning intent?), opinionated-stack imposition (does the spec require a specific OAuth dialect Klappy doesn't already speak via Supabase?), improper authority (does the client dictate how Klappy issues or revokes credentials?). |
| Build | `minimal` | The `validateBearerToken()` middleware itself (~30 lines TypeScript) plus JWKS-cache helper (~10 lines) plus PAT hash-lookup helper (~15 lines). Tied to gaps in Borrow: Supabase issues JWTs but doesn't validate-them-at-the-edge-of-a-Cloudflare-Worker; Supabase Auth doesn't natively mint long-lived API keys outside the JWT flow; oddkit's Worker does not use the `@cloudflare/agents` framework so the framework's auth helpers aren't a clean fit. |

> Reversibility: forward = high (middleware is one file shared across servers; swappable for `@modelcontextprotocol/sdk` helpers when they mature, or for `@cloudflare/agents` if the framework is adopted broadly); backward = high (if Supabase is ever replaced as the IdP, only the JWKS URL and the claim names change; the PAT path is fully owned).

---

## Build specification

### File location

Each server repo gets its own copy. Lift to a shared package only after the third repo proves the pattern is stable.

- `klappy/oddkit:workers/src/auth.ts` — new file.
- `klappy/aquifer-mcp:workers/src/auth.ts` — new file (copy-paste with adjusted imports for v1).

### Dependencies

```json
"dependencies": {
  "jose": "^5.0.0",
  "@supabase/supabase-js": "^2.0.0"
}
```

`@supabase/supabase-js` is already a dependency in oddkit; verify before adding.

### Environment variables (Worker bindings)

| Binding | Value | Used for |
|---|---|---|
| `SUPABASE_URL` | `https://<project>.supabase.co` | JWKS fetch + PG client |
| `SUPABASE_SERVICE_ROLE_KEY` | service-role key | PAT hash lookup (server-side only — never expose) |
| `SUPABASE_JWT_AUDIENCE` | `authenticated` | JWT `aud` claim verification |

### `validateBearerToken` contract

```typescript
type AuthContext = {
  user: { id: string; email: string };
  entitlements: string[];
  via: 'jwt' | 'pat';
};

async function validateBearerToken(
  request: Request,
  env: Env,
): Promise<AuthContext | null>
```

Returns `null` for missing header, malformed header, expired JWT, revoked PAT, or any verification failure. Never throws to the caller; logs internally for observability.

### Sketch

```typescript
import { jwtVerify, createRemoteJWKSet } from 'jose';
import { createClient } from '@supabase/supabase-js';

let cachedJWKS: ReturnType<typeof createRemoteJWKSet> | null = null;
let jwksCachedAt = 0;
const JWKS_TTL_MS = 15 * 60 * 1000;

function getJWKS(env: Env) {
  const now = Date.now();
  if (!cachedJWKS || now - jwksCachedAt > JWKS_TTL_MS) {
    cachedJWKS = createRemoteJWKSet(
      new URL(`${env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`),
    );
    jwksCachedAt = now;
  }
  return cachedJWKS;
}

export async function validateBearerToken(
  request: Request,
  env: Env,
): Promise<AuthContext | null> {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  if (!token) return null;

  // PAT path
  if (token.startsWith('oddkit_')) {
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    );
    const { data, error } = await supabase
      .rpc('validate_pat', { token })  // RPC does pgcrypto.crypt() comparison server-side
      .single();
    if (error || !data) return null;
    return {
      user: { id: data.user_id, email: data.email },
      entitlements: data.entitlements ?? [],
      via: 'pat',
    };
  }

  // JWT path
  try {
    const { payload } = await jwtVerify(token, getJWKS(env), {
      audience: env.SUPABASE_JWT_AUDIENCE,
    });
    return {
      user: { id: payload.sub as string, email: payload.email as string },
      entitlements: (payload.entitlements as string[]) ?? [],
      via: 'jwt',
    };
  } catch {
    return null;
  }
}
```

### Wiring into the existing request path

In `klappy/oddkit:workers/src/index.ts`, the existing MCP request handler gets a leading middleware call:

```typescript
const auth = await validateBearerToken(request, env);
// auth is null for anonymous; that is OK for v1 — every tool path stays open.
// Attach to the request context for any future tool that wants to read it.
const ctx = { ...existingCtx, auth };
```

No tool currently branches on `auth`. The middleware exists today to terminate anonymous-by-default and to give future tier-gated tools a place to hang off.

### Supabase RPC for PAT validation

In `klappy/klappy.dev` (or wherever the Supabase migrations live for the customer surface), create:

```sql
CREATE OR REPLACE FUNCTION validate_pat(token TEXT)
RETURNS TABLE(user_id UUID, email TEXT, entitlements JSONB)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT p.user_id, u.email, u.raw_app_meta_data->'entitlements'
  FROM pats p
  JOIN auth.users u ON u.id = p.user_id
  WHERE p.revoked_at IS NULL
    AND p.hash = crypt(token, p.hash);
END;
$$;
```

The `crypt(token, p.hash)` comparison is constant-time within pgcrypto.

---

## Acceptance criteria

1. A request to any `klappy/oddkit` MCP endpoint with no `Authorization` header succeeds (anonymous path unchanged).
2. A request with `Authorization: Bearer <valid_supabase_jwt>` succeeds and the handler's request context contains `auth.user.id` matching the JWT subject.
3. A request with `Authorization: Bearer <valid_pat>` (where the PAT was issued via `/functions/v1/create-pat` and stored in `pats`) succeeds and the context contains `auth.via='pat'`.
4. A request with an expired JWT, malformed token, or revoked PAT succeeds anonymously (auth context is null, request still serves).
5. JWKS is fetched at most once per 15 minutes per Worker instance under steady load.
6. The same middleware deployed in `klappy/aquifer-mcp` exhibits the same behavior.
7. No tool reads or branches on `auth` yet — verify by code search that `auth` is attached but unused in tool handlers. (Future tier-gated tools opt in explicitly.)

---

## Out of scope — what this handoff forbids

- **Tier-gated tool behavior.** Tools must not start branching on `auth.entitlements` in this slice. That comes later, per-tool, when features ship.
- **OAuth-MCP discovery endpoints.** Deferred per the Bide. Add when the tripwire fires.
- **Rate-limit differentiation.** Same limits for anonymous and authenticated. The "founding-rate locked-in" and "TruthKit waitlist priority" benefits are operator-promised, not middleware-enforced.
- **Anthropic key consumption.** The `anthropic_keys` table is populated by the customer surface but read by nothing in this slice.

---

## Release-validation gate

This is a code-shipping slice across two Worker repos. The release-validation-gate (`klappy://canon/constraints/release-validation-gate`) applies:

1. Cursor Bugbot must reach `completed` on both PRs (`klappy/oddkit` and `klappy/aquifer-mcp`).
2. For each repo, dispatch an independent Sonnet 4.6 read-only validator session via Managed Agents before promotion merges.
3. Same-session smoke does NOT satisfy the gate.

Branch → PR → squash merge. Never direct commits to main or prod.

---

## See also

- `klappy://docs/oddkit/sales/unified-account-launch-plan` — the customer surface that issues the credentials this middleware validates
- `klappy://canon/constraints/borrow-evaluation-before-implementation` — 6B canon
- `klappy://canon/constraints/release-validation-gate` — release gate
- `klappy://canon/principles/vodka-architecture` — thin stateless servers, stateful canon
- `https://supabase.com/docs/guides/auth/jwts` — Supabase JWT structure and JWKS
- `https://github.com/panva/jose` — `jose` library docs
- MCP Authorization spec (2025) — the future OAuth-MCP path waiting on the Bide tripwire
