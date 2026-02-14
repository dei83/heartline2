import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types";
import { blogPosts as localPosts } from "@/data/blog";

export async function getBlogPosts(tag?: string): Promise<BlogPost[]> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        if (tag) {
            return localPosts.filter(post => post.tags.includes(tag));
        }
        return localPosts;
    }

    const supabase = typeof window !== 'undefined' ? createBrowserClient() : await createServerClient();
    try {
        let query = supabase
            .from('articles')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (tag) {
            query = query.contains('secondary_keywords', [tag]);
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            console.warn("Supabase blog fetch failed or empty. Using local fallback.", error?.message);
            if (tag) {
                return localPosts.filter(post => post.tags.includes(tag));
            }
            // If DB is empty, return local posts to ensure site isn't empty
            return localPosts;
        }

        return data.map((article: any) => ({
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.body, // Map body -> content
            author: (article.author && !article.author.includes('@')) ? article.author : 'Heartline Editorial',
            coverImage: article.featured_image_url, // Map featured_image_url -> coverImage
            tags: article.secondary_keywords || [], // Map secondary_keywords -> tags
            publishedAt: article.published_at || article.created_at
        }));
    } catch (err) {
        console.error("Unexpected error fetching blog posts:", err);
        if (tag) {
            return localPosts.filter(post => post.tags.includes(tag));
        }
        return localPosts;
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return localPosts.find(p => p.slug === slug);
    }

    const supabase = typeof window !== 'undefined' ? createBrowserClient() : await createServerClient();
    try {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.warn(`Blog post not found in DB for slug: ${slug}, checking local.`);
            return localPosts.find(p => p.slug === slug);
        }

        return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.body,
            author: (data.author && !data.author.includes('@')) ? data.author : 'Heartline Editorial',
            coverImage: data.featured_image_url,
            tags: data.secondary_keywords || [],
            publishedAt: data.published_at || data.created_at
        };
    } catch (err) {
        console.error("Error fetching single post:", err);
        return localPosts.find(p => p.slug === slug);
    }
}
