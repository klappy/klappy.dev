# Thinking Session — 2026-02-02

## Learnings

- I realized the caching layer was causing stale reads
- Turns out the database connection pool was exhausted during peak load

## Decisions

- Decided to go with Redis instead of Memcached for the session store
- Going with a microservices architecture, the tradeoff is operational complexity

## Overrides

- Actually, scratch that — the auth service should be monolithic for now
