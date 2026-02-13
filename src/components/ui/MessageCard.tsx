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

        // Track copy analytics
        try {
            fetch('/api/messages/copy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: message.id })
            });
        } catch (err) { console.error(err); }
    };

    return (
        <div className="group relative break-inside-avoid mb-4 rounded-xl border border-border bg-card text-card-foreground p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
            {/* Top Row: Category + Actions */}
            <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md">
                    {message.category}
                </span>

                {/* Copy Button (Top Right) */}
                <button
                    onClick={handleCopy}
                    className="p-1.5 -mr-1 -mt-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Copy message"
                >
                    <Copy className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-base leading-relaxed text-foreground font-medium font-sans">
                    "{message.content}"
                </p>
                {message.source && (
                    <p className="text-[11px] text-muted-foreground mt-1.5 italic">
                        — via {message.source}
                    </p>
                )}
            </div>

            {/* Footer: Tags & Like */}
            <div className="flex items-end justify-between pt-3 border-t border-dashed border-border/50">
                <div className="flex flex-wrap gap-1 w-full pr-2">
                    {message.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-semibold text-muted-foreground/80 bg-secondary/50 px-1.5 py-0.5 rounded-sm">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Like Button (Optional) */}
                <button className="flex-shrink-0 text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
