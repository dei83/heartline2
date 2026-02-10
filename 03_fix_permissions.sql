-- Allow anonymous inserts so we can seed the database without logging in
create policy "Enable insert for anon" on public.public_messages for insert with check (true);

-- Also ensure select is public (should already be, but just in case)
drop policy if exists "Public view access" on public.public_messages;
create policy "Public view access" on public.public_messages for select using (true);
