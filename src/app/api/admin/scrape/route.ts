import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = await createClient();

    // Mock Data mimicking Reddit scrape
    const mockSuggestions = [
        {
            content: "I know we haven't talked in a while, but I just wanted to say I'm thinking of you.",
            category: "Thinking of You",
            tone: "Warm",
            emotional_intensity: "Low",
            risk_level: "Safe",
            source_url: "https://reddit.com/r/CasualConversation/comments/xyz",
            upvotes: 125,
            status: "pending"
        },
        {
            content: "I'm genuinely sorry for how I acted yesterday. I was out of line.",
            category: "Apology",
            tone: "Sincere",
            emotional_intensity: "Medium",
            risk_level: "Medium",
            source_url: "https://reddit.com/r/relationships/comments/abc",
            upvotes: 89,
            status: "pending"
        },
        {
            content: "Happy Cake Day! 🍰 Hope it's a good one.",
            category: "Birthday",
            tone: "Casual",
            emotional_intensity: "Low",
            risk_level: "Safe",
            source_url: "https://reddit.com/r/AskReddit/comments/123",
            upvotes: 450,
            status: "pending"
        }
    ];

    const { error } = await supabase
        .from("message_suggestions")
        .insert(mockSuggestions);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(new URL("/admin/messages", "http://localhost:3005")); // Redirect back
}
