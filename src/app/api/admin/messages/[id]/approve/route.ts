import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch the suggestion
    const { data: suggestion, error: fetchError } = await supabase
        .from("message_suggestions")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !suggestion) {
        return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
    }

    // 3. Insert into public_messages
    const { error: insertError } = await supabase
        .from("public_messages")
        .insert({
            content: suggestion.content,
            category: suggestion.category || "General", // Fallback
            tone: suggestion.tone,
            emotional_intensity: suggestion.emotional_intensity, // snake_case in db? check schema
            risk_level: suggestion.risk_level,
            source: suggestion.source_url ? `Reddit` : "Community",
            source_url: suggestion.source_url,
            is_reddit_sourced: !!suggestion.source_url,
            tags: [], // Can initialize empty or infer
            likes: 0,
            copy_count: 0
        });

    if (insertError) {
        console.error("Failed to promote message:", insertError);
        return NextResponse.json({ error: "Failed to promote message" }, { status: 500 });
    }

    // 4. Update suggestion status
    await supabase
        .from("message_suggestions")
        .update({ status: "approved" })
        .eq("id", id);

    // 5. Revalidate
    revalidatePath("/admin/messages");
    revalidatePath("/messages"); // Update public view too

    return NextResponse.redirect(new URL("/admin/messages", request.url));
}
