# ☁️ Cloudflare Pages — Branch Deploys (Observation Infrastructure)

This document describes how branch deploys support observation and rollback.

It is infrastructure documentation, not Canon.

---

## 🌿 Branch Naming Convention

Use one branch per attempt:

```
attempt/prd-vX.Y/aNNN
```

Examples:

```
attempt/prd-v0.2/a001
attempt/prd-v0.2/a002
```

---

## 🔗 Preview Deploy Expectation

- Each attempt branch SHOULD produce a Cloudflare Pages preview deployment.
- Preview URLs are treated as evidence artifacts (views), not truth.

---

## 📎 Recording Deploy Evidence in META.json

When sealing an attempt, record deploy evidence in the attempt `META.json`:

- `deploy.provider`: `cloudflare-pages`
- `deploy.preview_url`: preview deployment URL (when available)
- `deploy.production_url`: production URL (when relevant)
- `deploy.captured_at`: date captured

---

## 🏷️ "Every Tag Has a Branch" (Optional Policy)

If rollback speed is a priority, adopt this policy:

- For each sealed attempt tag, keep a branch that points to the same commit.
- The branch exists to make resurrection and preview redeploy trivial.

This is optional because:
- the commit SHA remains the truth
- long-lived branches are not always desirable early

---

## 🔮 Rollback Model (Intent)

Rollback is achieved by returning production to a known commit (usually a previously sealed attempt).

The practical mechanism (re-deploying a commit, retargeting, or reverting) is less important than:
- the sealed commit SHA
- the evidence bundle
- the ability to reproduce the build

