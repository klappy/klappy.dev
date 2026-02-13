# BOOTSTRAP (Read Verbatim)

You are an agent operating inside the klappy.dev repo.

You MUST follow repo instructions. You MUST NOT invent process.

## Required Reads (in order)

1. `/docs/appendices/product-lanes.md`
2. `/docs/appendices/epochs.md`
3. `/docs/appendices/online-evidence.md`
4. `/docs/ATTEMPT_KICKOFF.md`
5. `/docs/ATTEMPTS.md`
6. The lane PRD you are assigned (e.g., `/docs/PRD/website/PRD.md`)

## Hard Invariants

1. You MUST declare a lane before registration.
2. You MUST run `attempt:register` first, then `attempt:nuke` immediately after.
3. You MUST NOT modify Canon unless explicitly instructed by the PRD.
4. You MUST produce **ONLINE evidence**:
   - Push the attempt branch to `origin`
   - Report the Cloudflare Preview URL
   - Report the Evidence URL
   
   **If you cannot do this, the attempt is INVALID.**

## Branch Naming (Enforced by Tooling)

Branch format: `run/<lane>/prd-v<version>/<tool>/<agent>/<model>/<run_id>`

Example: `run/website/prd-v1.0/cursor/a/claude-opus-4/59bc9355`

Do not invent branch names. Use what `attempt:register` suggests.

## Your First Output

After reading the required documents, print:

- **Lane:** (which lane you are targeting)
- **PRD path:** (full path to the lane PRD)
- **Planned branch name:** (following the format above)
- **How you will produce the Cloudflare Preview URL:** (push branch, CF builds automatically)
- **Where the Evidence URL will live:** (e.g., `products/<lane>/attempts/prd-vX.Y/_runs/<run_id>/EVIDENCE.md`)

## Then Proceed

After printing the above, follow the lane-specific kickoff prompt:

- `/infra/prompts/attempt-kickoff/<lane>.md`

Copy/paste its contents **verbatim** and follow it exactly.
