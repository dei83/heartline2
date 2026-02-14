import { createClient } from "@/lib/supabase/server";
import { Copy, Plus, X, Search, Check, RefreshCw, Edit } from "lucide-react";
import DeleteMessageButton from "./DeleteMessageButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MessageLibraryPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string }>;
}) {
    const supabase = await createClient();
    const { category, search } = await searchParams;

    // 1. Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // 2. Fetch Messages with Filters
    let query = supabase
        .from("public_messages")
        .select("*")
        .order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    if (search) {
        query = query.ilike("content", `%${search}%`);
    }

    const { data: messages, error } = await query;

    if (error) {
        console.error("Error fetching messages:", error);
        return <div>Error loading messages</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Message Library</h1>
                    <p className="text-muted-foreground">Manage active messages visible to users ({messages?.length || 0} total).</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/messages/add" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add New Message
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4">
                <form className="flex gap-2 flex-1 max-w-sm">
                    <input
                        name="search"
                        defaultValue={search}
                        placeholder="Search content..."
                        className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button type="submit" className="px-3 py-2 border rounded-md hover:bg-gray-50">Search</button>
                </form>
                {/* Add Category Filter Dropdown here if needed */}
                <Link href="/admin/messages/library" className="px-3 py-2 text-sm text-gray-500 hover:text-black">
                    Clear Filters
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {messages && messages.length > 0 ? (
                    <div className="divide-y">
                        {messages.map((msg: any) => (
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
                                        </div>

                                        <p className="text-lg font-serif italic text-gray-800 mb-3">"{msg.content}"</p>

                                        <div className="flex gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Copy className="w-3 h-3" /> {msg.copy_count} copies
                                            </span>
                                            {msg.source && <span>Source: {msg.source}</span>}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 min-w-[100px]">
                                        <Link href={`/admin/messages/library/${msg.id}/edit`} className="w-full flex items-center justify-center gap-2 px-3 py-2 border text-gray-600 text-sm rounded-md hover:bg-gray-50 transition-colors">
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        <DeleteMessageButton id={msg.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No messages found</h3>
                        <p>Try adjusting your search or add a new message.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
