import { seedBlogPosts } from "@/data/blog/seed-pillars";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const results = await seedBlogPosts();
        return NextResponse.json({ success: true, message: "Blog pillars seeding attempted", results });
    } catch (error) {
        return NextResponse.json({ error: "Failed to seed blog", details: String(error) }, { status: 500 });
    }
}
