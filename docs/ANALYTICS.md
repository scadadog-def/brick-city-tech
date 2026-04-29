# Analytics (Future Scope)

## Summary

We want production analytics that can answer:
- web traffic by page (pageviews, unique visitors)
- key conversion funnels (signup → verify → login → inquiry)
- event tracking (CTA clicks, form submits)
- (optionally) tie events to authenticated members

## Recommendation

Use **PostHog** (self-hosted or cloud) for:
- pageview + event tracking
- funnels/retention/cohorts
- user identification after login

## Why not now

Current production VPS resources are modest:
- 1 vCPU
- ~4 GB RAM
- no swap

PostHog self-host typically requires a heavier stack (ClickHouse + Postgres + Redis + workers), and would likely compete with the site and risk stability.

## When we revisit

### Minimum recommended hosting

**Preferred (stable):** separate analytics VPS
- 2 vCPU / 8 GB RAM

**If same VPS:** upgrade + add swap
- 2 vCPU / 8 GB RAM recommended
- at minimum 2 vCPU / 4 GB RAM + swap

### Domain

- `posthog.brickcitytech.cloud` (A record to analytics host)

### Implementation plan

1) Provision PostHog via official Docker Compose
2) Add Nginx reverse proxy + TLS (certbot)
3) Add frontend instrumentation behind prod-only gating
   - initialize only on `brickcitytech.cloud`
   - env vars:
     - `VITE_POSTHOG_KEY`
     - `VITE_POSTHOG_HOST`
4) Add `identify(member.id, { email, name, ... })` after login exists
5) Add privacy notice / opt-out if desired
