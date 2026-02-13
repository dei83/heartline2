import { createClient } from "@/lib/supabase/client";
import { PublicMessage } from "@/types";
import { defaultMessages } from "@/data/messages";

export async function getPublicMessages(
    category?: string,
    tone?: string,
    tag?: string
): Promise<PublicMessage[]> {
    // Offline fallback check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return getLocalMessages(category, tone, tag);
    }

    const supabase = createClient();

    try {
        let query = supabase
            .from('public_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (category && category !== "All Occasions") {
            query = query.eq('category', category);
        }

        if (tone) {
            query = query.eq('tone', tone);
        }

        if (tag) {
            query = query.contains('tags', [tag]);
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            // console.warn("Supabase public_messages fetch failed or empty. Using local fallback.");
            return getLocalMessages(category, tone, tag);
        }

        return data.map(msg => ({
            ...msg,
            tags: msg.tags || [],
        })) as PublicMessage[];

    } catch (err) {
        console.error("Unexpected error fetching messages:", err);
        return getLocalMessages(category, tone, tag);
    }
}

function getLocalMessages(category?: string, tone?: string, tag?: string): PublicMessage[] {
    let filtered = defaultMessages;

    if (category && category !== "All Events") {
        filtered = filtered.filter(msg => msg.category === category);
    }

    // Note: defaultMessages currently uses 'mood' not 'tone', mapping roughly:
    // We can refine this later in data/messages.ts
    if (tone) {
        // Simple mapping for fallback
        filtered = filtered.filter(msg =>
            msg.tone?.toLowerCase().includes(tone.toLowerCase())
        );
    }

    if (tag) {
        filtered = filtered.filter(msg => msg.tags?.includes(tag));
    }

    return filtered.map((msg, i) => ({
        id: `local-${i}`,
        content: msg.content,
        category: msg.category,
        tags: msg.tags,
        tone: msg.tone || "Casual",
        source: msg.source,
        likes: 0
    }));
}
