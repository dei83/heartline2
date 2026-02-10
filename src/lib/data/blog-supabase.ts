import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/types";
import { blogPosts as localPosts } from "@/data/blog";

export async function getBlogPosts(tag?: string): Promise<BlogPost[]> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        if (tag) {
            return localPosts.filter(post => post.tags.includes(tag));
        }
        return localPosts;
    }

    const supabase = createClient();
    try {
        let query = supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (tag) {
            query = query.contains('tags', [tag]);
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            console.warn("Supabase blog fetch failed or empty. Using local fallback.");
            if (tag) {
                return localPosts.filter(post => post.tags.includes(tag));
            }
            return localPosts;
        }

        return data.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            coverImage: post.cover_image,
            tags: post.tags || [],
            publishedAt: post.published_at || post.created_at
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

    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            return localPosts.find(p => p.slug === slug);
        }

        return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            author: data.author,
            coverImage: data.cover_image,
            tags: data.tags || [],
            publishedAt: data.published_at || data.created_at
        };
    } catch (err) {
        return localPosts.find(p => p.slug === slug);
    }
}
