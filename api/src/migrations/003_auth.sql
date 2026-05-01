-- Local auth fields

alter table members add column username text null;
alter table members add column password_hash text null;
alter table members add column password_updated_at text null;

create unique index if not exists idx_members_username on members(username);
