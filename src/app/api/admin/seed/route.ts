import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { defaultMessages } from "@/data/messages";
import { qualityMessages } from "@/data/messages/quality-seed";
import { expandedMessages } from "@/data/messages/expanded-set";

export async function GET() {
    const supabase = await createClient();

    // 1. Check authentication (Optional for now, but good practice)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const allMessages = [...defaultMessages, ...qualityMessages, ...expandedMessages];
        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[]
        };

        // 2. Insert messages in batches to avoid timeout
        // For simplicity, we'll do promise.all with limited concurrency or chunks if needed.
        // Given < 1000 items, simple loop or bulk insert is fine.

        // Transform to snake_case for DB
        const dbRows = allMessages.map(msg => ({
            content: msg.content,
            category: msg.category,
            tags: msg.tags,
            tone: msg.tone,
            emotional_intensity: msg.emotionalIntensity || null,
            risk_level: msg.riskLevel || null,
            length: msg.length || null,
            source: msg.source || null,
            likes: msg.likes || 0,
            is_reddit_sourced: !!msg.source?.includes("r/") // Auto-tag Reddit sources
        }));

        const { error } = await supabase.from('public_messages').insert(dbRows);

        if (error) {
            console.error("Bulk insert failed:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            message: "Successfully seeded messages",
            count: dbRows.length
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
