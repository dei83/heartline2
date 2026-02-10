"use client";

import { Message } from "@/types";
import { Copy, Heart } from "lucide-react";
import { toast } from "sonner";

interface MessageCardProps {
    message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
    const handleCopy = async () => {
        navigator.clipboard.writeText(message.content);
        toast.success("Message copied to clipboard!");

        // Track copy analytics (Fire and forget)
        try {
            await fetch('/api/messages/copy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: message.id })
            });
        } catch (err) {
            console.error("Failed to track copy", err);
        }
    };

    return (
        <div
            className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 flex flex-col justify-between h-full hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
        >
            <div>
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
                        {message.category}
                    </span>
                    {message.tone && (
                        <span className="text-[10px] uppercase font-bold text-accent-foreground tracking-wider">
                            {message.tone}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {message.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                            #{tag}
                        </span>
                    ))}
                    {message.source && (
                        <span className="text-[10px] font-medium text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-orange-100">
                            via {message.source}
                        </span>
                    )}
                </div>
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-medium font-serif italic text-gray-700">
                    "{message.content}"
                </p>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-dashed">
                <button className="p-2 hover:bg-red-50 rounded-full transition-colors group" aria-label="Like message">
                    <Heart className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                </button>
                <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-1 group"
                    aria-label="Copy message"
                >
                    <Copy className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </button>
            </div>
        </div>
    );
}
