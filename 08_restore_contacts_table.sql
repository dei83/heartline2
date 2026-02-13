-- Restore Missing Tables (Contacts & Drafts)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CONTACTS
-- Safely create Enum
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

-- 2. DRAFTS
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

-- RLS
alter table public.contacts enable row level security;
drop policy if exists "Users can crud own contacts" on public.contacts;
create policy "Users can crud own contacts" on public.contacts for all using (auth.uid() = user_id);

alter table public.drafts enable row level security;
drop policy if exists "Users can crud own drafts" on public.drafts;
create policy "Users can crud own drafts" on public.drafts for all using (auth.uid() = user_id);

-- Triggers
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists handle_updated_at_contacts on public.contacts;
create trigger handle_updated_at_contacts
  before update on public.contacts
  for each row execute procedure public.handle_updated_at();
