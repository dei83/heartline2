import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Version: 1.0.1 - Forced sync to fix nested export issue
export async function GET() {
    const supabase = await createClient();

    // 1. Check Authentication (Standard Cookie-based)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Setup Admin Client to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        console.error("API Error: Missing Supabase Env Variables", { url: !!supabaseUrl, key: !!serviceRoleKey });
        return NextResponse.json({
            error: "Server Configuration Error: Missing Supabase URL or Service Role Key"
        }, { status: 500 });
    }

    const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    try {
        console.time("AdminFetchPosts");
        // 3. Fetch Articles with Admin Privileges (Select only necessary fields for list view)
        const { data, error } = await adminClient
            .from('articles')
            .select('id, title, slug, status, published_at, created_at, featured_image_url')
            .order('created_at', { ascending: false });

        console.timeEnd("AdminFetchPosts");

        if (error) {
            console.error("Admin Fetch Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ posts: data });

    } catch (e: any) {
        console.error("Unexpected Admin Fetch Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Check Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Setup Admin Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const adminClient = createAdminClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    try {
        const body = await request.json();

        // validate minimal fields
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
        }

        // 3. Insert Article
        const { data, error } = await adminClient
            .from('articles')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error("Admin Create Error:", error);
            if (error.code === '23505') {
                return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (e: any) {
        console.error("Unexpected Admin Create Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
