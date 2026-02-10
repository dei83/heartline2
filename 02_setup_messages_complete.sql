-- Enable UUID extension if not exists
create extension if not exists "uuid-ossp";

-- 3. PUBLIC MESSAGES (Free Library) - Create Table if it doesn't exist
create table if not exists public.public_messages (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  category text not null, -- Birthday, Anniversary, etc.
  tags text[],
  tone text, -- Casual, Neutral, etc.
  source text,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Public Messages
alter table public.public_messages enable row level security;
-- Allow read access to everyone
create policy "Public view access" on public.public_messages for select using (true);
-- Allow insert/update only to service_role (or authenticated admins if you implement admin role)
-- For now, we'll allow Authenticated users to insert/update for the Admin panel usage
create policy "Authenticated can crud" on public.public_messages for all using (auth.role() = 'authenticated');


-- Add new columns for Reddit-style metadata (Safe to run even if columns exist)
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'public_messages' and column_name = 'emotional_intensity') then
        alter table public.public_messages add column emotional_intensity text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'public_messages' and column_name = 'risk_level') then
        alter table public.public_messages add column risk_level text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'public_messages' and column_name = 'source_url') then
        alter table public.public_messages add column source_url text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'public_messages' and column_name = 'is_reddit_sourced') then
        alter table public.public_messages add column is_reddit_sourced boolean default false;
    end if;
end $$;
