"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Edit, Trash, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push("/login?redirect=/admin/blog");
            return;
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/admin/blog/list');
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to fetch posts");
                }

                if (result.posts) {
                    setPosts(result.posts);
                }
            } catch (error: any) {
                console.error("Error fetching posts:", error);
                toast.error("Failed to load posts: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user, authLoading, router]);

    const handleMigrate = async () => {
        if (!confirm("This will copy all posts from the old database to the new one. Continue?")) return;

        setLoading(true);
        try {
            const { data: oldPosts, error: fetchError } = await supabase.from('posts').select('*');
            if (fetchError) throw fetchError;

            if (!oldPosts || oldPosts.length === 0) {
                alert("No old posts found to migrate.");
                setLoading(false);
                return;
            }

            let count = 0;
            for (const post of oldPosts) {
                const article = {
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    body: post.content,
                    featured_image_url: post.cover_image,
                    status: post.published ? 'published' : 'draft',
                    secondary_keywords: post.tags,
                    published_at: post.published_at,
                    created_at: post.created_at,
                    updated_at: post.updated_at || new Date().toISOString(),
                    pillar: 'general',
                    content_type: 'article',
                    author: user?.email || 'Admin'
                };

                const { error: insertError } = await supabase.from('articles').upsert(article);
                if (insertError) console.error(`Failed to migrate ${post.title}`, insertError);
                else count++;
            }

            alert(`Migration complete! Moved ${count} posts.`);
            window.location.reload();
        } catch (e: any) {
            alert("Migration failed: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div className="p-10 text-center">Checking authentication...</div>;
    if (loading) return <div className="p-10 text-center">Loading posts...</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Blog Management</h1>
                    <button onClick={handleMigrate} className="text-xs text-blue-500 hover:text-blue-700 underline mt-1">
                        Migrate Legacy Posts
                    </button>
                </div>
                <Link href="/admin/blog/new" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> New Post
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Published</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50/50">
                                <td className="py-3 px-4">
                                    <div className="font-medium">{post.title}</div>
                                    <div className="text-xs text-muted-foreground">{post.slug}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-500">
                                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                                </td>
                                <td className="py-3 px-4 text-right flex justify-end gap-2">
                                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600">
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <Link href={`/admin/blog/${post.id}/edit`} className="p-2 text-gray-400 hover:text-primary">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-muted-foreground">No posts found. Create your first one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
