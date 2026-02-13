import { MessageCard } from "@/components/ui/MessageCard";
import { getPublicMessages } from "@/lib/data/public-messages";
import { PublicMessage } from "@/types";
import { MESSAGE_GROUPS } from "@/data/categories";
import Link from "next/link";
import { Gift, Heart, HandHeart, Briefcase, ChevronRight } from "lucide-react";

interface MessagesPageProps {
    searchParams: Promise<{ category?: string; tone?: string; tag?: string; group?: string }>;
}

const iconMap: any = {
    Gift, Heart, HandHeart, Briefcase
};

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
    const { category, tone, tag, group } = await searchParams;

    // 1. Group Selection View (Dashboard) - When no specific category/tag/tone filter is active
    if (!category && !tag && !tone) {
        const visibleGroups = group
            ? MESSAGE_GROUPS.filter(g => g.name === group)
            : MESSAGE_GROUPS;

        const pageTitle = group ? group : "Find the Perfect Words";
        const pageDesc = group
            ? visibleGroups[0]?.description
            : "Explore our collection of AI-crafted messages for every occasion, relationship, and emotion.";

        return (
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                        {pageTitle}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {pageDesc}
                    </p>
                    {group && (
                        <div className="mt-8">
                            <Link href="/messages" className="text-sm font-medium text-primary hover:underline">
                                ← View All Categories
                            </Link>
                        </div>
                    )}
                </div>

                <div className={`grid grid-cols-1 ${group ? 'max-w-4xl' : 'md:grid-cols-2 max-w-6xl'} gap-8 mx-auto`}>
                    {visibleGroups.map((g) => {
                        const Icon = iconMap[g.icon || "Gift"];
                        return (
                            <div key={g.name} className={`rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${g.color.replace('text-', 'bg-').replace('50', '50/50')}`}>
                                <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
                                    <Icon className="w-48 h-48" />
                                </div>

                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${g.color.replace('text-', 'bg-').replace('50', '200')} text-white`}>
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{g.name}</h2>
                                    <p className="text-muted-foreground mb-8">{g.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {g.categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={`/messages?category=${encodeURIComponent(cat.value)}`}
                                                className="flex items-center justify-between p-3 rounded-xl bg-white/80 hover:bg-white border border-transparent hover:border-border/50 shadow-sm hover:shadow text-sm font-medium text-gray-700 transition-all"
                                            >
                                                {cat.name}
                                                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // 2. Message List View - When a category/filter IS active
    // Fetch base messages for the current context (Category/Tone)
    const baseMessages = await getPublicMessages(category, tone);

    // Extract unique tags relevant to this specific set of messages
    const allTags = baseMessages.flatMap(msg => msg.tags || []);
    const availableTags = Array.from(new Set(allTags)).sort();

    // Filter messages by tag if selected
    const displayedMessages = tag
        ? baseMessages.filter(msg => msg.tags?.includes(tag))
        : baseMessages;

    // Title Logic
    let title = "All Messages";
    if (category && tag) title = `${category}: #${tag}`;
    else if (tag) title = `#${tag} Messages`;
    else if (category) title = `${category}`;

    // Helper to generate URL
    const getLink = (t?: string) => {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (tone) params.set("tone", tone);
        if (t) params.set("tag", t);

        const queryString = params.toString();
        return queryString ? `/messages?${queryString}` : '/messages';
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-2">
                <Link href="/messages" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    ← Back to Categories
                </Link>
            </div>

            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary-900 capitalize">{title}</h1>
                    <p className="text-muted-foreground mt-2">
                        {displayedMessages.length} result{displayedMessages.length !== 1 && 's'} found
                        {tone && <span className="ml-1">with {tone} tone</span>}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 text-sm max-w-xl justify-end">
                    <a
                        href={getLink()}
                        className={`px-3 py-1 rounded-full border transition-colors ${!tag ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                    >
                        All
                    </a>
                    {availableTags.map((t) => (
                        <a
                            key={t}
                            href={getLink(t)}
                            className={`px-3 py-1 rounded-full border transition-colors ${tag === t
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            #{t}
                        </a>
                    ))}
                    {availableTags.length === 0 && (
                        <span className="text-gray-400 italic text-xs py-1">No tags available</span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedMessages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
            </div>

            {displayedMessages.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-lg">
                    <p className="text-lg text-muted-foreground">No messages found for this category/tag.</p>
                    <p className="text-sm text-muted-foreground mt-2">Try checking back later or browsing all messages.</p>
                </div>
            )}
        </div>
    );
}
