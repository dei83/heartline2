-- COMPREHENSIVE SCHEMA RESTORE
-- Run this to fix missing 'profiles', 'contacts', etc.

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. USERS / PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  display_name text,
  avatar_url text,
  is_premium boolean default false,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Handle User Creation Trigger (Sync Auth -> Profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 3. CONTACTS
DO $$ BEGIN
    CREATE TYPE relationship_type AS ENUM ('Friend', 'Family', 'Partner', 'Colleague', 'Other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  relationship relationship_type not null default 'Other',
  birthdate date,
  anniversary date,
  notes text,
  tags text[],
  last_contacted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contacts enable row level security;
drop policy if exists "Users can crud own contacts" on public.contacts;
create policy "Users can crud own contacts" on public.contacts for all using (auth.uid() = user_id);


-- 4. PUBLIC MESSAGES
create table if not exists public.public_messages (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  category text not null,
  tags text[],
  tone text,
  source text,
  likes integer default 0,
  copy_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.public_messages enable row level security;
drop policy if exists "Public view access" on public.public_messages;
create policy "Public view access" on public.public_messages for select using (true);


-- 5. DRAFTS
create table if not exists public.drafts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  contact_id uuid references public.contacts(id) on delete set null,
  content text not null,
  category text,
  tone text,
  emotion_intensity integer,
  status text check (status in ('draft', 'sent', 'scheduled')),
  scheduled_for timestamp with time zone,
  confidence_score numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.drafts enable row level security;
drop policy if exists "Users can crud own drafts" on public.drafts;
create policy "Users can crud own drafts" on public.drafts for all using (auth.uid() = user_id);


-- 6. UPDATED_AT TRIGGER
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists handle_updated_at_profiles on public.profiles;
create trigger handle_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_updated_at_contacts on public.contacts;
create trigger handle_updated_at_contacts
  before update on public.contacts
  for each row execute procedure public.handle_updated_at();
