-- Force enable public read access (Fix for non-showing posts)

-- 1. Drop existing policies to avoid conflicts
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Public posts are viewable by everyone." on public.posts;

-- 2. Re-create permissive read policies
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Public posts are viewable by everyone." on public.posts for select using (true);

-- 3. (Optional) If you are still testing and want everything open temporarily:
-- alter table public.posts disable row level security; 
-- (Uncomment above line only if nothing else works)
