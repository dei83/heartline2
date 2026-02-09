"use client";

import { useAuth } from "@/context/AuthContext";
import { CalendarDays, Users } from "lucide-react";

export function DashboardHeader({ stats }: { stats: { contactCount: number, eventCount: number } }) {
    const { user } = useAuth();
    const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "Friend";

    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date());

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 space-y-4 md:space-y-0">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Hello, {name}! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                    Here's what's happening in your circle today, {formattedDate}.
                </p>
            </div>

            <div className="flex gap-4">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-400">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase">Contacts</p>
                        <p className="text-xl font-bold">{stats.contactCount}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <CalendarDays size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase">Events</p>
                        <p className="text-xl font-bold">{stats.eventCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
