"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { messageCategories } from "@/data/categories";

export default function AddMessagePage() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Birthday");
    const [tone, setTone] = useState("Heartfelt");
    const [intensity, setIntensity] = useState(5);

    // Combine all categories for the dropdown
    const allCategories = [
        ...messageCategories.popular,
        ...messageCategories.other
    ].sort((a, b) => a.name.localeCompare(b.name));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("public_messages").insert([
            {
                content,
                category,
                tone,
                emotional_intensity: intensity,
                source: "manual_admin",
                created_at: new Date().toISOString(),
            }
        ]);

        if (error) {
            alert("Error adding message: " + error.message);
            setLoading(false);
        } else {
            alert("Message added successfully!");
            router.push("/admin/messages/library");
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-2xl">
            <Link href="/admin/messages/library" className="flex items-center text-sm text-gray-500 hover:text-black mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
            </Link>

            <div className="bg-white rounded-xl border shadow-sm p-8">
                <h1 className="text-2xl font-bold mb-6">Add New Message</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message Content
                        </label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="Type the message here..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none bg-white"
                            >
                                {allCategories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tone
                            </label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none bg-white"
                            >
                                <option value="Heartfelt">Heartfelt</option>
                                <option value="Warm">Warm</option>
                                <option value="Funny">Funny</option>
                                <option value="Professional">Professional</option>
                                <option value="Short">Short & Sweet</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emotional Intensity (1-10)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={intensity}
                                onChange={(e) => setIntensity(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <span className="font-mono w-8 text-center">{intensity}</span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Message"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
