-- Add new columns for Reddit-style metadata
alter table public.public_messages 
add column if not exists emotional_intensity text check (emotional_intensity in ('Low', 'Medium', 'High')),
add column if not exists risk_level text check (risk_level in ('Safe', 'Medium', 'Risky')),
add column if not exists source_url text,
add column if not exists is_reddit_sourced boolean default false;

-- Add index for valid filtering
create index if not exists idx_public_messages_intensity on public.public_messages(emotional_intensity);
create index if not exists idx_public_messages_risk on public.public_messages(risk_level);
