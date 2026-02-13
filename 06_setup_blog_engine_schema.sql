-- Blog Auto-Generation Engine Schema
-- Based on: Blog Auto-Generation Engine Architecture

-- 1. ARTICLES (Enhanced Blog Posts)
create table if not exists public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  pillar text, -- psychology, stories, research, relationship_dynamics, cultural_guides, gifts
  content_type text, -- how-to, listicle, research, guide
  body text,
  excerpt text,
  featured_image_url text,
  author text,
  status text check (status in ('draft', 'review', 'scheduled', 'published')) default 'draft',
  primary_keyword text,
  secondary_keywords text[],
  meta_description text,
  word_count integer,
  reading_time integer,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. MESSAGE TEMPLATES (Embedded in Articles)
create table if not exists public.message_templates (
  id uuid default uuid_generate_v4() primary key,
  article_id uuid references public.articles(id) on delete cascade,
  scenario text,
  occasion text, -- birthday, thank you, etc.
  relationship text, -- boss, friend, family, etc.
  tone text, -- professional, warm, formal, casual
  message_text text not null,
  customization_tips text,
  usage_count integer default 0,
  rating numeric(3,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. REDDIT RESEARCH (Data Source)
create table if not exists public.reddit_research (
  id uuid default uuid_generate_v4() primary key,
  subreddit text,
  post_id text unique,
  title text,
  body text,
  author text,
  score integer,
  num_comments integer,
  sentiment text, -- positive, negative, neutral
  extracted_messages text[],
  success_indicators jsonb,
  created_date timestamp with time zone,
  scraped_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. GIFT PRODUCTS (Affiliate Data)
create table if not exists public.gift_products (
  id uuid default uuid_generate_v4() primary key,
  asin text unique,
  title text,
  category text,
  price numeric(10,2),
  rating numeric(3,2),
  review_count integer,
  sales_rank integer,
  image_url text,
  affiliate_link text,
  trend_score integer,
  occasions text[],
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. SEO KEYWORDS (Optimization)
create table if not exists public.seo_keywords (
  id uuid default uuid_generate_v4() primary key,
  keyword text unique not null,
  search_volume integer,
  competition text, -- low, medium, high
  ranking integer,
  target_pillar text,
  articles_targeting uuid[], -- Array of article IDs
  last_checked timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Articles: Public Read, Admin Write
alter table public.articles enable row level security;
drop policy if exists "Public articles view access" on public.articles;
create policy "Public articles view access" on public.articles for select using (status = 'published');

drop policy if exists "Admin articles full access" on public.articles;
create policy "Admin articles full access" on public.articles for all using (
  auth.jwt() ->> 'email' = 'daenafam@gmail.com' -- Update with actual admin check logic or role
  or
  auth.jwt() ->> 'email' = 'admin@example.com' -- For dev
);

-- Message Templates: Public Read, Admin Write
alter table public.message_templates enable row level security;
drop policy if exists "Public templates view access" on public.message_templates;
create policy "Public templates view access" on public.message_templates for select using (true);

drop policy if exists "Admin templates full access" on public.message_templates;
create policy "Admin templates full access" on public.message_templates for all using (
  auth.jwt() ->> 'email' = 'daenafam@gmail.com'
  or
  auth.jwt() ->> 'email' = 'admin@example.com'
);

-- Reddit Research: Admin Only
alter table public.reddit_research enable row level security;
drop policy if exists "Admin research full access" on public.reddit_research;
create policy "Admin research full access" on public.reddit_research for all using (
  auth.jwt() ->> 'email' = 'daenafam@gmail.com'
  or
  auth.jwt() ->> 'email' = 'admin@example.com'
);

-- Gift Products: Public Read, Admin Write
alter table public.gift_products enable row level security;
drop policy if exists "Public gifts view access" on public.gift_products;
create policy "Public gifts view access" on public.gift_products for select using (true);

drop policy if exists "Admin gifts full access" on public.gift_products;
create policy "Admin gifts full access" on public.gift_products for all using (
  auth.jwt() ->> 'email' = 'daenafam@gmail.com'
  or
  auth.jwt() ->> 'email' = 'admin@example.com'
);

-- SEO Keywords: Admin Only
alter table public.seo_keywords enable row level security;
drop policy if exists "Admin seo full access" on public.seo_keywords;
create policy "Admin seo full access" on public.seo_keywords for all using (
  auth.jwt() ->> 'email' = 'daenafam@gmail.com'
  or
  auth.jwt() ->> 'email' = 'admin@example.com'
);

-- TRIGGERS for Updated At
drop trigger if exists handle_updated_at_articles on public.articles;
create trigger handle_updated_at_articles
  before update on public.articles
  for each row execute procedure public.handle_updated_at();

-- Note: Other tables don't strictly need updated_at triggers based on current schema but good practice.
-- Keeping it simple for now matching the architecture doc.
