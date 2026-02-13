-- Relax RLS policies for Development
-- Allow any authenticated user to access research tables

drop policy if exists "Admin research full access" on public.reddit_research;
create policy "Dev full access" on public.reddit_research for all using (auth.role() = 'authenticated');

drop policy if exists "Admin articles full access" on public.articles;
create policy "Dev articles full access" on public.articles for all using (auth.role() = 'authenticated');

drop policy if exists "Admin templates full access" on public.message_templates;
create policy "Dev templates full access" on public.message_templates for all using (auth.role() = 'authenticated');
