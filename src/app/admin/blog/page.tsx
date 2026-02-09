"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, Edit, Trash, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login?redirect=/admin/blog");
            return;
        }

        // Basic Admin Check (Replace with your email)
        if (!authLoading && user && user.email !== "daenafam@gmail.com") { // HARDCODED ADMIN EMAIL
            alert("Unauthorized access.");
            // router.push("/"); // Uncomment to enforce redirect
        }

        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) setPosts(data);
            setLoading(false);
        };

        if (user) fetchPosts();

    }, [user, authLoading, router]);

    if (loading || authLoading) return <div className="p-10 text-center">Loading admin dashboard...</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
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
                                    <span className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.published ? 'Published' : 'Draft'}
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
