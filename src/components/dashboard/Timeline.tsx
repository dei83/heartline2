"use client";

import { Contact } from "@/types";
import { Cake, Heart, Calendar, Gift, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Event {
    contact: Contact;
    type: 'birthday' | 'anniversary';
    date: string;
    daysAway: number;
}

export function Timeline({ events }: { events: Event[] }) {
    if (events.length === 0) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-dashed p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                    <Calendar size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">No Upcoming Events</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                    Add birthdays and anniversaries to your contacts to see them here.
                </p>
                <div className="mt-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/contacts/new">Add Contact</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-500" />
                Upcoming Celebrations
            </h2>

            <div className="grid gap-3">
                {events.map((event, i) => (
                    <div key={`${event.contact.id}-${event.type}-${i}`} className="group bg-white dark:bg-zinc-900 border rounded-xl p-4 transition-all hover:shadow-md hover:border-rose-200 dark:hover:border-rose-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${event.daysAway === 0 ? 'bg-rose-500 animate-pulse' :
                                    event.type === 'birthday' ? 'bg-amber-400' : 'bg-purple-500'
                                    }`}>
                                    {event.type === 'birthday' ? <Cake size={18} /> : <Heart size={18} />}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {event.contact.name}
                                        {event.daysAway === 0 && <span className="ml-2 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">TODAY</span>}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {event.type === 'birthday' ? 'Birthday' : 'Anniversary'} • {formatDate(event.date)}
                                        {event.daysAway > 0 && <span className="text-xs ml-1">• In {event.daysAway} days</span>}
                                    </p>
                                </div>
                            </div>

                            <Button size="sm" className="hidden group-hover:flex bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900" asChild>
                                <Link href={`/messages?category=${event.type === 'birthday' ? 'Birthday' : 'Anniversary'}`}>
                                    <Send size={14} className="mr-2" />
                                    Draft Message
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
