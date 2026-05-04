# Contributing to Brick City Tech

This project aims to keep production stable while moving fast in development.

## Branching model

- Create a feature branch from `develop`.
- Open PRs into **`develop`**.
- Promote releases via PR from **`develop` → `main`**.
- Only **`main`** triggers production deployment.

### Branch naming

Use one of:
- `feat/<short-name>`
- `fix/<short-name>`
- `chore/<short-name>`
- `docs/<short-name>`
- `ci/<short-name>`
- `copy/<short-name>`

## Semantic (conventional) commits

We use semantic commit prefixes for readable history and automated tooling later.

Format:

```
<type>(optional-scope): <short summary>

(optional body)
```

Allowed types (common):
- `feat`: new capability
- `fix`: bug fix
- `docs`: documentation only
- `chore`: maintenance/refactors
- `ci`: pipeline/config changes
- `test`: tests only
- `copy`: copy/text edits
- `ui`: UI-only changes

Examples:
- `feat(auth): add pending registration`
- `fix(web): correct asset base path`
- `docs: document deploy workflow`

## Required checks before submitting a PR

From repo root:

```bash
npm ci
npm run lint
npm run build
```

From `api/`:

```bash
cd api
npm ci
npm run check
```

## Security checks

At minimum, run:

```bash
npm audit
```

CI will also run a lightweight dependency audit and/or security scans as configured.

## Code quality expectations

### Comments & readability

- Prefer **clear names** over excessive comments.
- Add comments when:
  - business rules are non-obvious
  - security decisions are made (auth/session/captcha)
  - the code is intentionally "weird" (compat, edge cases)
- Avoid stale comments. If behavior changes, update the comment.

### API changes

- Add/adjust routes carefully; keep endpoints predictable.
- Avoid breaking changes without a coordinated release.

## Reporting issues

- Use GitHub Issues for bugs and feature requests.
- Include:
  - what you expected
  - what happened
  - steps to reproduce
  - screenshots/console logs if relevant

## Python (if/when added)

If Python code is introduced, we enforce:
- Pydantic models for request/response validation where applicable
- Ruff formatting/linting
- Type checking (mypy/pyright) depending on the module

(See `docs/python-style.md` if present.)
