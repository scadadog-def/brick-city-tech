# Brick City Tech

This repo contains the Brick City Tech website (React/Vite) and the backend API (Fastify + SQLite) used for memberships, blog/podcast content, and admin workflows.

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

## Branching + contribution workflow

We use a simple 2-branch promotion model:

- **feature/** branches → PR into **develop**
- **develop** → PR into **main** when ready to ship
- **main** is the only branch that deploys **production**

### Branch naming

Use one of:
- `feat/<short-name>`
- `fix/<short-name>`
- `chore/<short-name>`
- `copy/<short-name>`
- `ci/<short-name>`

### Commit message convention

Use conventional/semantic prefixes:
- `feat:` new capability
- `fix:` bug fix
- `chore:` maintenance
- `ci:` pipeline changes
- `copy:` text/copy edits
- `ui:` UI-only tweaks

Example:

```bash
git checkout -b feat/password-auth
# ...make changes...
git commit -m "feat(auth): add pending registration"
```

## CI (GitHub Actions)

A CI workflow runs automatically to prevent broken code from merging.

### When CI runs
- On **pull requests targeting `develop`**
- On **pushes to `develop`**

### What CI checks
- **Web:** `npm ci`, `npm run lint`, `npm run build`
- **API:** `npm ci` (in `api/`) then `npm run check`

If CI fails, fix the errors in your branch and push again; the PR will update.

## Deployments

### Production
Production deployments are triggered by GitHub Actions on:
- `push` to `main`

The deploy workflow packages the repo and deploys it to the production VPS, then rebuilds/restarts the Docker Compose stack.

### Development (recommended)
Development deployments should run from `develop` or feature branches (separate host/stack), and should not affect production.

## Environment variables

See:
- `deploy/.env.example`

Never commit real secrets. Use `.env` on servers and GitHub Secrets for CI/CD.
