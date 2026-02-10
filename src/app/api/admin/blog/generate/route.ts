
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { topic } = await request.json();

        // Simulate AI delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock AI Response
        const mockDraft = {
            title: `Why ${topic || "Connection"} Matters in Modern Relationships`,
            slug: `why-${topic ? topic.toLowerCase().replace(/\s+/g, '-') : "connection"}-matters`,
            excerpt: `We often overlook the power of ${topic || "connection"}. Here is why it breaks or builds our bonds.`,
            content: `# The Power of ${topic || "Connection"}
            
In a world that is increasingly digital, we often forget the basics of human interaction. ${topic || "Connection"} is not just a buzzword; it is the foundation of our mental health.

## The Science
Research shows that...

## Practical Tips
1. Listen more.
2. Be present.

## Conclusion
Start today.
`,
            tags: ["Relationships", "Psychology", topic || "Connection"],
            author: "Heartline AI",
            coverImage: "https://images.unsplash.com/photo-1521791136064-7985c2717883?auto=format&fit=crop&q=80&w=2069"
        };

        return NextResponse.json({ success: true, draft: mockDraft });

    } catch (error) {
        return NextResponse.json({ error: "Failed to generate draft" }, { status: 500 });
    }
}
