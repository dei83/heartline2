-- Add length column for filtering (Short, Medium, Long)
alter table public.public_messages 
add column if not exists length text check (length in ('Short', 'Medium', 'Long'));

-- Index for length filtering
create index if not exists idx_public_messages_length on public.public_messages(length);
