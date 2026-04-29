# Brick City Tech

Brick City Tech is a community-facing site plus lightweight backend services that support memberships, content, and admin workflows.

- Frontend: React + Vite
- Backend: Fastify (Node) + SQLite
- Deployment: Docker Compose on a VPS, gated by GitHub Actions

## Why this exists (motivation)

Brick City Tech is meant to be a practical local “maker/build” hub:
- workshop announcements & updates
- publishing community content (blog + podcast)
- a foundation for future admin tooling (members, sponsors, events)

## Architecture

See: `docs/ARCHITECTURE.md`

## Quickstart (local dev)

### Web

```bash
npm ci
npm run dev
```

### API

```bash
cd api
npm ci
# configure env vars as needed (see deploy/.env.example)
node src/index.js
```

## Contribution workflow

We use a 2-branch promotion model:

- feature branches → PR into **develop**
- **develop** → PR into **main** when ready to ship
- **main** is the only branch that deploys **production**

Detailed guidelines:
- `CONTRIBUTING.md`

## CI (GitHub Actions)

CI runs automatically:
- on PRs targeting `develop`
- on pushes to `develop`

Current checks:
- Web: lint + build
- API: basic check script

## Security / dependency checks

At minimum, run locally:

```bash
npm audit
```

We can also enable GitHub-native scanning:
- Dependabot alerts
- CodeQL

## Deployments

### Production
Production deploy is triggered by GitHub Actions on:
- push to `main`

### Development
Development deploys should run from `develop`/feature branches on a separate host/stack so production is never impacted.

## Open issues / TODOs

See GitHub Issues.

Near-term items we’re actively building:
- Turnstile captcha for registration
- pending email verification (SMTP wiring)
- admin panel for members/sponsors

## Environment variables

See:
- `deploy/.env.example`

Never commit real secrets. Use `.env` on servers and GitHub Secrets for CI/CD.
