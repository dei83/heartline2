import { getRedditClient, MOCK_REDDIT_DATA } from "@/lib/clients/reddit";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ error: "Method Not Allowed", message: "Please use POST method to trigger scrape." }, { status: 405 });
}

export async function POST(req: Request) {
    const supabase = await createClient();

    // 1. Auth Check (Protect Admin Route)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) {
        console.error("Auth Error:", authError);
        return NextResponse.json({ error: "Unauthorized: " + (authError?.message || "No user found") }, { status: 401 });
    }

    let body = {};
    try {
        body = await req.json();
    } catch (e) {
        // Body is likely empty, ignore and use defaults
    }
    const { subreddits = ['relationships', 'socialskills', 'careerguidance'], limit = 5 } = body as any;
    const client = getRedditClient();

    let posts: any[] = [];

    if (client) {
        try {
            // Fetch relevant posts from each subreddit
            for (const sub of subreddits) {
                const subredditPosts = await client.getSubreddit(sub).getHot({ limit });
                posts = [...posts, ...subredditPosts];
            }
        } catch (error: any) {
            console.error("Reddit API Error:", error);
            return NextResponse.json({ error: "Failed to fetch from Reddit API: " + error.message }, { status: 500 });
        }
    } else {
        // Use Mock Data
        posts = MOCK_REDDIT_DATA;
    }

    // Process and Save to DB
    const processed = posts.map(post => ({
        subreddit: post.subreddit.display_name || post.subreddit,
        post_id: post.id,
        title: post.title,
        body: post.selftext,
        author: post.author.name,
        score: post.score,
        num_comments: post.num_comments,
        created_date: new Date(post.created_utc * 1000).toISOString(),
        sentiment: 'neutral', // Placeholder for now
        success_indicators: { raw_score: post.score },
        extracted_messages: [] // Placeholder
    }));

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
        return NextResponse.json({ error: "Server Configuration Error: Missing Service Role Key" }, { status: 500 });
    }

    try {
        // Use Admin Client to bypass RLS for this system operation
        const adminClient = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        const { error } = await adminClient
            .from('reddit_research')
            .upsert(processed, { onConflict: 'post_id' });

        if (error) {
            console.error("DB Upsert Error:", error);
            return NextResponse.json({ error: "Database Error: " + error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            mode: client ? 'REAL' : 'MOCK',
            count: processed.length,
            data: processed
        });

    } catch (e: any) {
        console.error("Unexpected Scrape Error:", e);
        return NextResponse.json({ error: "Unexpected Error: " + e.message }, { status: 500 });
    }
}
