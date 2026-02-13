"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function BlogEditorPage() {
    const params = useParams(); // May be empty for new
    const searchParams = useSearchParams();
    const sourceId = searchParams.get('source');

    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [sourceData, setSourceData] = useState<any>(null);
    const [imageOptions, setImageOptions] = useState<string[]>([]);

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(""); // HTML content
    const [coverImage, setCoverImage] = useState(""); // featured_image_url
    const [tags, setTags] = useState(""); // Comma separated (secondary_keywords)
    const [published, setPublished] = useState(false); // status

    const isEditing = !!params.id; // If [id] route is used

    useEffect(() => {
        if (isEditing && params.id) {
            setLoading(true);
            const fetchPost = async () => {
                try {
                    const response = await fetch(`/api/admin/blog/${params.id}`);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Failed to fetch post");
                    }

                    const data = await response.json();

                    if (data) {
                        setTitle(data.title);
                        setSlug(data.slug);
                        setExcerpt(data.excerpt || "");
                        setContent(data.body || "");
                        setCoverImage(data.featured_image_url || "");
                        setTags(data.secondary_keywords ? data.secondary_keywords.join(", ") : "");
                        setPublished(data.status === 'published');
                    }
                } catch (error: any) {
                    console.error("Error fetching post:", error);
                    toast.error("Failed to load post: " + error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        } else if (sourceId) {
            const fetchSource = async () => {
                const { data } = await supabase.from('reddit_research').select('*').eq('id', sourceId).single();
                if (data) {
                    setSourceData(data);
                    setTitle(`Draft: ${data.title}`);
                    setSlug(data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '').slice(0, 50));
                }
            };
            fetchSource();
        }
    }, [isEditing, params.id, sourceId]);


    const handleSave = async () => {
        if (!title.trim()) {
            toast.error("Title is required!");
            return;
        }

        setLoading(true);
        try {
            const generatedSlug = slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            const postData = {
                title,
                slug: generatedSlug,
                excerpt,
                body: content,
                featured_image_url: coverImage,
                secondary_keywords: tags.split(',').map(t => t.trim()).filter(Boolean),
                status: published ? 'published' : 'draft',
                published_at: published ? new Date().toISOString() : null,
                updated_at: new Date().toISOString(),
            };

            let response;
            if (isEditing) {
                response = await fetch(`/api/admin/blog/${params.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData)
                });
            } else {
                response = await fetch('/api/admin/blog/list', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData)
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) {
                    toast.error("Error: A post with this slug (URL) already exists. Please change the title or slug.");
                } else {
                    throw new Error(errorData.error || "Failed to save post");
                }
            } else {
                toast.success("Post saved successfully!");
                router.refresh();
                router.push("/admin/blog");
            }
        } catch (e: any) {
            console.error("Save Error:", e);
            toast.error("An error occurred: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        const defaultTopic = sourceData ? sourceData.title : "";
        const topic = window.prompt("What topic should I write about?", defaultTopic);
        if (!topic && !sourceData) return;
        setLoading(true);
        try {
            const response = await fetch("/api/admin/blog/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: topic || defaultTopic, sourceId }),
            });
            const data = await response.json();
            if (data.success && data.draft) {
                setTitle(data.draft.title);
                setSlug(data.draft.slug);
                setExcerpt(data.draft.excerpt);
                setContent(data.draft.content);
                setCoverImage(data.draft.coverImage);
                setImageOptions(data.draft.imageOptions || []);
                setTags(data.draft.tags.join(", "));
            } else {
                alert("Failed to generate draft");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateImages = async () => {
        if (!title) { alert("Title required"); return; }
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/blog/images?query=${encodeURIComponent(title)}`);
            const data = await response.json();
            if (data.images) setImageOptions(data.images);
        } finally { setLoading(false); }
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl">

            <div className="flex justify-between items-center mb-6">
                <Link href="/admin/blog" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Link>
                <div className="flex gap-2">
                    <button onClick={handleGenerate} disabled={loading} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 transition-all shadow-sm hover:shadow">
                        <Sparkles className="w-4 h-4" /> {loading ? "..." : "Generate AI"}
                    </button>
                    <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50">
                        <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Post Title" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                        <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50" placeholder="post-url-slug" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>
                    <div className="flex gap-2">
                        <input value={coverImage} onChange={e => setCoverImage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="https://..." />
                        <button onClick={handleGenerateImages} className="bg-gray-100 px-3 rounded-md border"><ImageIcon className="w-4 h-4" /></button>
                        {coverImage && <img src={coverImage} alt="Preview" className="w-10 h-10 rounded border object-cover" />}
                    </div>
                    {imageOptions.length > 0 && (
                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                            {imageOptions.map((img, i) => (
                                <img key={i} src={img} onClick={() => setCoverImage(img)} className="w-20 h-12 rounded cursor-pointer border hover:border-primary" />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full p-2 border rounded-md h-20" />
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Tags</label>
                        <input value={tags} onChange={e => setTags(e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="w-4 h-4" />
                        <label className="text-sm font-medium">Published</label>
                    </div>
                </div>

                <div className="min-h-[500px]">
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>
            </div>
        </div>
    );
}
