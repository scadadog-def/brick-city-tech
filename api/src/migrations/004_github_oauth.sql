-- Adds GitHub OAuth identity fields for member login/linking

alter table members add column github_id text;
alter table members add column github_username text;
alter table members add column github_email text;

create unique index if not exists idx_members_github_id on members(github_id);
