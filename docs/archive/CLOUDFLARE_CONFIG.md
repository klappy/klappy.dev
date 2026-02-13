---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://docs/cloudflare-config
title: "Cloudflare Pages Configuration"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "cloudflare", "deploy", "configuration"]
---

# ☁️ Cloudflare Pages Configuration

This document describes how Cloudflare Pages should be configured for the klappy.dev repository.

**Scope:** Deploy behavior only. For attempt workflow mechanics, see `/docs/ATTEMPTS.md`.

---

## 🌿 Branch Roles

| Branch | Purpose | Deploy Target |
|--------|---------|---------------|
| `prod` | Live production deployment | **Production URL** (klappy.dev) |
| `main` | Experiment aggregation + history | Preview URL only |
| Any other branch | Agent workspaces, Cursor worktrees, experiments | Preview URLs |

**Note:** Cloudflare does not require specific branch naming. Any non-`prod` branch that builds successfully gets a preview URL.

---

## ⚠️ Critical Configuration

### Production Branch

**Set the production branch to `prod`, NOT `main`.**

In Cloudflare Pages → Settings → Builds & deployments:

```
Production branch: prod
```

This ensures:
- Only promoted, verified code goes to production
- `main` can be used for experimentation without risk
- Agents can never accidentally deploy to production

### Preview Deployments

**Enable preview deployments for ALL branches.**

In Cloudflare Pages → Settings → Builds & deployments:

```
Preview branches: All non-production branches
```

This ensures:
- Every agent branch gets a preview URL
- Cursor worktrees get preview URLs automatically
- Reviewers can compare multiple attempts side-by-side

---

## 🛠️ Build Configuration

Each lane is deployed as a separate Cloudflare Pages project.

```
Root directory:    .
Build command:     npm run build -- --lane <lane>
Build output:      products/<lane>/dist
```

For example, the `website` lane:
```
Root directory:    .
Build command:     npm run build -- --lane website
Build output:      products/website/dist
```

See `/docs/appendices/lane-implementation-surfaces.md` for the locked folder contract.

> **Legacy / Transitional note (pre-D0013):** Some existing deploy configurations may still publish repo-root `/dist/`. That output is no longer canonical; the canonical build output for lane deployments is `products/<lane>/dist/`.

---

## 📋 Expected Behavior

| Action | Result |
|--------|--------|
| Push to `prod` | Deploys to klappy.dev (production) |
| Push to `main` | Deploys to preview URL (main.klappy-dev.pages.dev) |
| Push to any other branch | Deploys to preview URL (`<branch-slug>.klappy-dev.pages.dev`) |
| `npm run attempt:promote` | Merges champion to `main`, fast-forwards `prod` → deploys to production |

### Promotion Semantics

1. **Artifacts merge first** — attempt evidence merges to `main` before promotion
2. **Champion code merges** — winning attempt's code merges to `main`
3. **`prod` fast-forwards** — `prod` fast-forwards to match `main`
4. **Cloudflare deploys** — `prod` push triggers production deployment

Only champion code reaches production. Losing attempts contribute artifacts but not code.

---

## ✅ Verification

After configuring, verify:

1. **Push to `prod`** → klappy.dev updates
2. **Push to `main`** → main.klappy-dev.pages.dev updates (NOT klappy.dev)
3. **Push to any agent branch** → preview URL generates

---

## 💡 Why This Matters

> **Production and experimentation must never share a mutable surface.**

This configuration ensures:
- Production is always stable
- Experiments are always disposable
- Nuclear resets on `main` never affect production
- Agents can work in parallel without coordination
- One winner ships; losers don't pollute production

---

## 📝 Note on Branch Naming

> **Branch names are optional convenience. Provenance lives in META.json.**

Cloudflare does not depend on specific branch naming conventions. Any branch that:
- Is not `prod`
- Produces a valid `products/<lane>/dist/` on build

Will get a preview URL.

The canonical record of "who made what" lives in `META.json`, not in the branch name.
This keeps the system antifragile — branch naming can drift without breaking provenance.

---

## 🔗 Related Documents

- Attempt workflow: `/docs/ATTEMPTS.md`
- Deploy contract: `/infra/contracts/build-output.md`
- **Interface Contracts: `/interfaces/index.md`** (semver'd compatibility promises)
- **Lane Build Layout: `/docs/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- Decision: `/docs/decisions/D0001-prod-branch-is-production.md`
