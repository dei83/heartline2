"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, PenLine, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
                <Link href="/contacts/new" className="block">
                    <div className="h-full p-4 bg-white dark:bg-zinc-900 border rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-center flex flex-col items-center justify-center gap-2 cursor-pointer group">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                            <UserPlus size={20} />
                        </div>
                        <span className="font-medium text-sm">Add Contact</span>
                    </div>
                </Link>

                <Link href="/messages" className="block">
                    <div className="h-full p-4 bg-white dark:bg-zinc-900 border rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-center flex flex-col items-center justify-center gap-2 cursor-pointer group">
                        <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                            <PenLine size={20} />
                        </div>
                        <span className="font-medium text-sm">Write Message</span>
                    </div>
                </Link>

                <Link href="/blog" className="block">
                    <div className="h-full p-4 bg-white dark:bg-zinc-900 border rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-center flex flex-col items-center justify-center gap-2 cursor-pointer group">
                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <BookOpen size={20} />
                        </div>
                        <span className="font-medium text-sm">Read Blog</span>
                    </div>
                </Link>

                <div className="opacity-50 cursor-not-allowed">
                    <div className="h-full p-4 bg-gray-50 dark:bg-zinc-800/50 border border-dashed rounded-xl text-center flex flex-col items-center justify-center gap-2">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-400">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-medium text-sm text-gray-400">Values (Soon)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
