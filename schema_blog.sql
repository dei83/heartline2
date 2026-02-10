-- Helper Function for Updated At (Required for Trigger)
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 5. BLOG POSTS (CMS)
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text, -- Markdown
  cover_image text,
  author text,
  tags text[],
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Posts
alter table public.posts enable row level security;

-- Everyone can read published posts
create policy "Public view published posts" on public.posts 
  for select using (published = true);

-- Admins can do everything (For now, we'll allow authenticated users to be "admins" if they have a specific email or role)
-- ideally, create a custom claim or a separate admins table. 
-- For simplicity in this MVP: Allow all authenticated users to read all posts (drafts included) but only specific email to write.
-- REPLACE 'your-email@example.com' with the actual admin email or use a better role system.
create policy "Admins can manage posts" on public.posts 
  for all using (auth.email() = 'daenafam@gmail.com' or auth.jwt() ->> 'email' = 'daena.fam@gmail.com'); 
  -- Note: Update this policy to any admin strategy you prefer.

-- Trigger for Updated At
create trigger handle_updated_at_posts
  before update on public.posts
  for each row execute procedure public.handle_updated_at();
