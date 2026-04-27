-- Brick City Tech API schema (v1)

create table if not exists migrations (
  id text primary key,
  created_at text not null
);

create table if not exists members (
  id text primary key,
  created_at text not null,
  email text not null unique,
  email_verified_at text null,
  name text null,
  role text not null default 'member',
  is_admin integer not null default 0,
  interest text null,
  notes text null,
  status text not null default 'active',
  google_sub text null unique,
  google_email text null,
  last_login_at text null,
  password_hash text null
);

create index if not exists idx_members_email on members(email);

create table if not exists api_keys (
  id text primary key,
  created_at text not null,
  name text not null,
  key_hash text not null,
  scopes_json text not null,
  revoked_at text null,
  last_used_at text null
);

create index if not exists idx_api_keys_revoked on api_keys(revoked_at);

create table if not exists podcast_episodes (
  id text primary key,
  created_at text not null,
  published_at text null,
  status text not null default 'draft',
  title text not null,
  slug text not null unique,
  description text not null,
  summary text null,
  tags_json text not null,
  guests text null,
  video_url text not null,
  audio_url text null,
  thumbnail_url text null,
  duration_seconds integer null,
  season integer null,
  episode_number integer null,
  created_by_member_id text null,
  created_by_api_key_id text null,
  foreign key(created_by_member_id) references members(id),
  foreign key(created_by_api_key_id) references api_keys(id)
);

create index if not exists idx_podcast_status_published_at on podcast_episodes(status, published_at);

create table if not exists verification_tokens (
  token_hash text primary key,
  member_id text not null,
  purpose text not null,
  expires_at text not null,
  used_at text null,
  foreign key(member_id) references members(id)
);

create table if not exists audit_log (
  id text primary key,
  created_at text not null,
  actor_member_id text null,
  action text not null,
  target_member_id text null,
  details_json text null,
  foreign key(actor_member_id) references members(id),
  foreign key(target_member_id) references members(id)
);
