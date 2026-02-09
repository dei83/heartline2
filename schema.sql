-- Create tables for Heartline2 CRM

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS (Extends Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  display_name text,
  avatar_url text,
  is_premium boolean default false,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CONTACTS (CRM)
create type relationship_type as enum ('Friend', 'Family', 'Partner', 'Colleague', 'Other');

create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  relationship relationship_type not null default 'Other',
  birthdate date,
  anniversary date,
  notes text,
  tags text[], -- Array of strings
  last_contacted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PUBLIC MESSAGES (Free Library)
create table public.public_messages (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  category text not null, -- Birthday, Anniversary, etc.
  tags text[],
  tone text, -- Casual, Neutral, etc.
  source text,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. PERSONALIZED DRAFTS (CRM Generated)
create table public.drafts (
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

-- RLS POLICIES (Security)

-- Profiles: Users can view/edit their own profile
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Contacts: Users can only manage their own contacts
alter table public.contacts enable row level security;
create policy "Users can crud own contacts" on public.contacts for all using (auth.uid() = user_id);

-- Public Messages: Everyone can view, only admins can edit (assume admin role handled elsewhere or seed script)
alter table public.public_messages enable row level security;
create policy "Public view access" on public.public_messages for select using (true);

-- Drafts: Users can crud own drafts
alter table public.drafts enable row level security;
create policy "Users can crud own drafts" on public.drafts for all using (auth.uid() = user_id);

-- TRIGGERS for Updated At
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_contacts
  before update on public.contacts
  for each row execute procedure public.handle_updated_at();
