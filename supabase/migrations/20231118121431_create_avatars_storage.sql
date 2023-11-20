-- Use Postgres to create a bucket.

insert into storage.buckets
  (id, name, public)
values
  ('avatars', 'avatars', true);

create policy "Allow authenticated upload avatar"
on storage.objects for insert to authenticated with check (
    -- restrict bucket
    bucket_id = 'avatars'
);

create policy "Anyone can update their own avatar." on storage.objects
  for update using ( auth.uid() = owner ) with check (bucket_id = 'avatars');



