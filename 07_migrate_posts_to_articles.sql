
-- Migration: Copy old posts to new articles table

INSERT INTO public.articles (
    id,
    title,
    slug,
    excerpt,
    body,
    featured_image_url,
    status,
    secondary_keywords,
    published_at,
    created_at,
    updated_at
)
SELECT
    id,
    title,
    slug,
    excerpt,
    content,
    cover_image,
    CASE WHEN published THEN 'published' ELSE 'draft' END,
    tags,
    published_at,
    created_at,
    updated_at
FROM public.posts
ON CONFLICT (id) DO NOTHING;
