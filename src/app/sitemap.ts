import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/data/blog-supabase';
import { defaultMessages } from '@/data/messages'; // Or use categories

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://heartline.app'; // Replace with actual domain

    // Static pages
    const routes = [
        '',
        '/blog',
        '/messages',
        '/privacy',
        '/terms',
        '/login',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Blog Posts
    const posts = await getBlogPosts();
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic Categories (from messages)
    const categories = Array.from(new Set(defaultMessages.map(m => m.category)));
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/messages?category=${encodeURIComponent(cat)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes, ...categoryRoutes];
}
