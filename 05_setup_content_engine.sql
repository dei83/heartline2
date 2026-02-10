-- Create a staging table for potential messages (from Reddit/User submission)
create table if not exists public.message_suggestions (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  category text, -- inferred category
  source_url text, -- reddit permalink
  upvotes integer default 0,
  
  -- Metadata for filtering
  tone text,
  emotional_intensity text, 
  risk_level text,
  
  -- Status: 'pending', 'approved', 'rejected'
  status text default 'pending',
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for suggestions (Admin only access mainly)
alter table public.message_suggestions enable row level security;

-- Policy: Admin can do everything
create policy "Authenticated Admin CRUD" on public.message_suggestions
  for all using (auth.role() = 'authenticated');

-- Add Analytics column to public_messages
alter table public.public_messages
add column if not exists copy_count integer default 0;

-- Function to increment copy count (called via RPC for safety)
create or replace function increment_copy_count(message_id uuid)
returns void as $$
begin
  update public.public_messages
  set copy_count = copy_count + 1
  where id = message_id;
end;
$$ language plpgsql security definer;
