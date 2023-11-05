create table pages (
  id uuid references auth.users not null primary key,
  name text,
  location text,
  description text,
  avatar_url text,
  status text,
  social_links jsonb
);
alter table pages enable row level security;
create policy "Allow public read-only access." on pages for select using (true);
create policy "Can update own user data." on pages for update using (auth.uid() = id);
