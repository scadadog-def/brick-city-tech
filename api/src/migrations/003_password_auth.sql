-- Add password auth support

alter table members add column password_hash text;

-- Members created via password auth start as pending until email verified.
