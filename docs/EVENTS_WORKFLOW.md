# Events Workflow (Plan)

Goal: A public Events page powered by the database, with admin submission + approval before publishing.

## Roles

- **Public**: can view approved events.
- **Admin members** (`members.is_admin = 1`): can create/submit events and approve/reject events.

Decision: **Any admin can approve**.

## Lifecycle / Status

`events.status` enum (stored as text):

- `draft` *(optional; may be unused in MVP)*
- `submitted` *(created by admin, not yet public)*
- `approved` *(publicly visible)*
- `rejected` *(not public; keep for audit)*
- `cancelled` *(previously approved; now removed from public)*

Public visibility rule: **only `approved` events appear on the public Events page**.

## Data Model (MVP)

Single table: `events`

Fields:
- `id` (text, primary key) e.g. `evt_...`
- `created_at` (text ISO)
- `updated_at` (text ISO)
- `created_by_member_id` (text)
- `status` (text)

Event content:
- `title` (text) — longer/internal
- `short_title` (text) — required; used on cards
- `description` (text) — plain/markdown
- `location` (text) — e.g. Powerplant Incubator
- `start_at` (text ISO)
- `end_at` (text ISO, optional)
- `capacity` (integer, optional)
- `price_cents` (integer, optional, default 0)

Approval fields:
- `approved_by_member_id` (text, nullable)
- `approved_at` (text ISO, nullable)
- `rejected_by_member_id` (text, nullable)
- `rejected_at` (text ISO, nullable)
- `review_note` (text, nullable) — optional note/reason

Indexes:
- `events(status, start_at)`
- `events(start_at)`

## API Endpoints (proposed)

All endpoints live behind the existing web nginx `/api/` proxy.

### Public

- `GET /api/events`
  - Returns: only `status='approved'`
  - Sorting: `start_at asc`

### Admin (requires `is_admin`)

- `POST /api/admin/events`
  - Creates new event with `status='submitted'` (or `draft` if we choose)

- `GET /api/admin/events?status=submitted`
  - Review queue

- `POST /api/admin/events/:id/approve`
  - Transitions to `approved`

- `POST /api/admin/events/:id/reject`
  - Transitions to `rejected`

- (Optional later) `POST /api/admin/events/:id/cancel`

## UI (proposed)

### Public Events page

- Reads from `GET /api/events`.
- Uses `short_title` for the card title.

### Admin Create Event

- Visible only to admins.
- Form includes:
  - Short title
  - Full title
  - Date/time
  - Location
  - Description
  - Capacity / price
- Submit => status `submitted`.

### Admin Review

- A simple admin-only view listing `submitted` events with approve/reject.

## Short Title Guidelines

- Target 22–38 characters when possible.
- Pattern examples:
  - `AI Intake + Follow-up`
  - `3D Printing 101`
  - `Open Build Night`

## Milestones

1) Add migration + server routes (feature-flagged behind admin + status)
2) Replace current static Events page with DB-backed list
3) Add admin create/review UI

