"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function BlogEditorPage() {
    const params = useParams(); // May be empty for new
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(""); // Markdown
    const [coverImage, setCoverImage] = useState("");
    const [tags, setTags] = useState(""); // Comma separated
    const [published, setPublished] = useState(false);

    const isEditing = !!params.id; // If [id] route is used

    useEffect(() => {
        if (isEditing && params.id) {
            setLoading(true);
            const fetchPost = async () => {
                const { data } = await supabase.from('posts').select('*').eq('id', params.id).single();
                if (data) {
                    setTitle(data.title);
                    setSlug(data.slug);
                    setExcerpt(data.excerpt || "");
                    setContent(data.content || "");
                    setCoverImage(data.cover_image || "");
                    setTags(data.tags ? data.tags.join(", ") : "");
                    setPublished(data.published);
                }
                setLoading(false);
            };
            fetchPost();
        }
    }, [isEditing, params.id]);

    const handleSave = async () => {
        setLoading(true);
        const postData = {
            title,
            slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            excerpt,
            content,
            cover_image: coverImage,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            published,
            published_at: published ? new Date().toISOString() : null, // Update published date if publishing
        };

        if (isEditing) {
            const { error } = await supabase.from('posts').update(postData).eq('id', params.id);
            if (error) alert("Error saving: " + error.message);
            else router.push("/admin/blog");
        } else {
            const { error } = await supabase.from('posts').insert([postData]);
            if (error) alert("Error creating: " + error.message);
            else router.push("/admin/blog");
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <Link href="/admin/blog" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border grid gap-6">
                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            value={title} onChange={e => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-md" placeholder="Post Title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                        <input
                            value={slug} onChange={e => setSlug(e.target.value)}
                            className="w-full p-2 border rounded-md bg-gray-50" placeholder="post-url-slug"
                        />
                    </div>
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                    <input
                        value={coverImage} onChange={e => setCoverImage(e.target.value)}
                        className="w-full p-2 border rounded-md" placeholder="https://..."
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <textarea
                        value={excerpt} onChange={e => setExcerpt(e.target.value)}
                        className="w-full p-2 border rounded-md h-20" placeholder="Brief summary..."
                    />
                </div>

                {/* Tags & Published */}
                <div className="flex gap-4 items-center">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                        <input
                            value={tags} onChange={e => setTags(e.target.value)}
                            className="w-full p-2 border rounded-md" placeholder="Guide, Life, Tips"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <input
                            type="checkbox" id="published"
                            checked={published} onChange={e => setPublished(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="published" className="text-sm font-medium">Published</label>
                    </div>
                </div>

                {/* Content - Markdown Editor Placeholder */}
                <div>
                    <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                    <textarea
                        value={content} onChange={e => setContent(e.target.value)}
                        className="w-full p-4 border rounded-md h-96 font-mono text-sm" placeholder="# Write your post here..."
                    />
                    <p className="text-xs text-muted-foreground mt-2">Supports Markdown formatting.</p>
                </div>
            </div>
        </div>
    );
}
