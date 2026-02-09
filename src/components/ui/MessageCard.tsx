"use client";

import { Message } from "@/types";
import { Copy, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface MessageCardProps {
    message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 flex flex-col justify-between h-full hover:shadow-lg transition-all"
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
                    {copied && <span className="text-xs text-blue-600 font-bold animate-pulse">Copied!</span>}
                </button>
            </div>
        </motion.div>
    );
}
