import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    try {
        const { error } = await supabase.rpc('increment_copy_count', { message_id: id });

        if (error) {
            console.error("Error incrementing copy count:", error);
            // Don't block the UI for analytics failure
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
