import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const supabase = await createClient();

    // 1. Check Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Setup Admin Client
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

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

    try {
        // 3. Fetch Article
        const { data, error } = await adminClient
            .from('articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Admin Fetch Error:", error);
            // If not found, return 404
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (e: any) {
        console.error("Unexpected Admin Fetch Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const supabase = await createClient();

    // 1. Check Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Setup Admin Client
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

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

    try {
        const body = await request.json();

        // 3. Update Article
        const { data, error } = await adminClient
            .from('articles')
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Admin Update Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (e: any) {
        console.error("Unexpected Admin Update Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
