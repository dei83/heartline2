import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = await createClient();

    const mockData = [
        {
            subreddit: "relationships",
            post_id: "t3_12345",
            title: "My (28F) boyfriend (30M) never says thank you for small things",
            body: "I've noticed lately that he just expects me to do things. When I cook dinner or clean, silence. It makes me feel unappreciated...",
            author: "confused_gf_99",
            score: 1250,
            num_comments: 342,
            sentiment: "negative",
            extracted_messages: [
                "I feel unappreciated when my efforts go unnoticed.",
                "It hurts when you don't acknowledge the small things I do."
            ],
            success_indicators: { "relatability": 0.9, "engagement": "high" }
        },
        {
            subreddit: "socialskills",
            post_id: "t3_67890",
            title: "How to politely decline a wedding invitation?",
            body: "I was invited to a distant cousin's wedding but I really can't afford the travel right now. How do I say no without offending family?",
            author: "budget_traveler",
            score: 890,
            num_comments: 156,
            sentiment: "neutral",
            extracted_messages: [
                "Thank you so much for thinking of me, but I won't be able to make it.",
                "I'm so honored to be invited, sadly I have a prior commitment."
            ],
            success_indicators: { "utility": 0.85, "search_volume": "medium" }
        },
        {
            subreddit: "careerguidance",
            post_id: "t3_abcde",
            title: "Best way to ask for a raise after a good performance review?",
            body: "Just got 'Exceeds Expectations' but no mention of money. I want to bring it up in our 1:1 next week. Templates?",
            author: "climbing_ladder",
            score: 2100,
            num_comments: 410,
            sentiment: "positive",
            extracted_messages: [
                "Given my recent performance review, I'd like to discuss adjusting my compensation.",
                "I'm really proud of what we achieved this quarter and would love to review my salary."
            ],
            success_indicators: { "value": 0.95, "career_impact": "high" }
        }
    ];

    const { error } = await supabase
        .from('reddit_research')
        .upsert(mockData, { onConflict: 'post_id' });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: mockData.length });
}
