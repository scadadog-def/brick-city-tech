# Architecture (Brick City Tech)

## Goals / motivation

Brick City Tech is a community-facing site plus lightweight backend services to support:
- membership signups
- content publishing (blog + podcast)
- admin workflows (access-controlled)

Design goals:
- **Fast static UX** (React/Vite)
- **Minimal backend** (Fastify + SQLite)
- **Deployable on a single VPS** (Docker Compose)
- **Stable production** via PR gating + CI checks

## High-level layout

```
repo/
  src/                  # React frontend
  api/src/              # Fastify API
  deploy/               # docker-compose + nginx configs + env examples
  .github/workflows/    # CI + deploy automation
```

## Runtime architecture (production)

- Internet → **VPS Nginx** (TLS termination)
- VPS Nginx → **Docker Compose** stack (reverse proxy to internal services)
- Docker Compose services:
  - `web` (nginx serving built frontend + proxy to API)
  - `api` (Fastify, SQLite stored on a named Docker volume)

### Data

- SQLite database file is stored in Docker volume (ex: `bct_data`).
- Migrations run automatically on startup via `ensureSchema()`.

## Auth model (current)

- Session cookies managed by `@fastify/session`.
- Google OAuth support exists but requires Google OAuth client credentials.
- Email/password (pending verification) work is being developed in feature branches.

## Base paths

- The production site is served at the domain root.
- Vite `base` is set to `/` to ensure assets load from `/assets/...`.
- Nginx includes backwards-compat redirects for older `/brick-city-tech/*` paths.

## Deployment

### CI

- PRs → `develop` run lint + build checks.

### Production deploy

- `main` triggers a GitHub Actions deploy workflow.
- Workflow packages the repo and deploys to the production VPS.
- VPS rebuilds/restarts the Docker Compose stack.

## Future improvements (tracked)

- Captcha (Turnstile) on registration
- SMTP wiring for verification email delivery
- Admin panel + member management UI
- Hardening: rate limiting, security headers, dependency scanning
