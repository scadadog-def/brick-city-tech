-- Blog posts (markdown)

create table if not exists blog_posts (
  id text primary key,
  created_at text not null,
  published_at text null,
  status text not null default 'draft',
  title text not null,
  slug text not null unique,
  subtitle text null,
  tags_json text not null,
  cover_image_url text null,
  content_markdown text not null,
  created_by_member_id text null,
  created_by_api_key_id text null,
  foreign key(created_by_member_id) references members(id),
  foreign key(created_by_api_key_id) references api_keys(id)
);

create index if not exists idx_blog_status_published_at on blog_posts(status, published_at);
