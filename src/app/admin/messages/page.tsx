import { createClient } from "@/lib/supabase/server";
import { Copy, Plus, X, Search, Check, RefreshCw, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

// Types for our suggestion table
interface MessageSuggestion {
    id: string;
    content: string;
    category: string;
    source_url?: string;
    upvotes: number;
    tone?: string;
    emotional_intensity?: string;
    risk_level?: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
}

export default async function AdminMessagesPage() {
    const supabase = await createClient();

    // 1. Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
        // In a real app, check for specific admin role/email
    }

    // 2. Fetch Pending Suggestions
    const { data: suggestions, error } = await supabase
        .from("message_suggestions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching suggestions:", error);
        return <div>Error loading suggestions</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Message Staging Area</h1>
                    <p className="text-muted-foreground">Review and approve incoming message suggestions.</p>
                </div>
                <div className="flex gap-2">
                    <form action="/api/admin/scrape" method="POST">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                            Run Scraper
                        </button>
                    </form>

                    <Link href="/admin/messages/add" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                        <Plus className="w-4 h-4" />
                        Manual Add
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {suggestions && suggestions.length > 0 ? (
                    <div className="divide-y">
                        {suggestions.map((msg) => (
                            <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                <div className="flex justify-between gap-6">
                                    {/* Content Area */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                                {msg.category || "Uncategorized"}
                                            </span>
                                            {msg.tone && (
                                                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wide">
                                                    {msg.tone}
                                                </span>
                                            )}

                                            {msg.source_url && (
                                                <a href={msg.source_url} target="_blank" rel="noreferrer" className="text-xs text-orange-600 hover:underline flex items-center gap-1">
                                                    r/Reddit
                                                    <span className="text-gray-400">({msg.upvotes} upvotes)</span>
                                                </a>
                                            )}
                                        </div>

                                        <p className="text-lg font-serif italic text-gray-800 mb-3">"{msg.content}"</p>

                                        <div className="flex gap-2 text-xs text-gray-500">
                                            {msg.emotional_intensity && <span>Intensity: {msg.emotional_intensity}</span>}
                                            {msg.risk_level && <span>Risk: {msg.risk_level}</span>}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 min-w-[120px]">
                                        <form action={`/api/admin/messages/${msg.id}/approve`} method="POST">
                                            <button type="submit" className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                                                <Check className="w-4 h-4" />
                                                Approve
                                            </button>
                                        </form>

                                        <form action={`/api/admin/messages/${msg.id}/reject`} method="POST">
                                            <button type="submit" className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-200 text-red-600 text-sm rounded-md hover:bg-red-50 transition-colors">
                                                <X className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </form>

                                        <Link href={`/admin/messages/${msg.id}/edit`} className="w-full flex items-center justify-center gap-2 px-3 py-2 border text-gray-600 text-sm rounded-md hover:bg-gray-50 transition-colors">
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No pending suggestions</h3>
                        <p>Run the scraper or add messages manually to fill the queue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
