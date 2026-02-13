
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        // Mock Unsplash response for now to save API calls/setup
        // In a real app, you would fetch from https://api.unsplash.com/search/photos

        // Return 3 relevant images based on simple keyword matching or random variations if generic
        const images = [
            `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},1`,
            `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},2`,
            `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},3`
        ];

        // Since source.unsplash is deprecated/unreliable, let's use specific IDs or a more robust mock if needed.
        // Better Mock:
        const mockImages = [
            "https://images.unsplash.com/photo-1516383748727-85d1253e28a1?w=800&q=80",
            "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
            "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
            "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80",
            "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
        ];

        // Simple random selection
        const selected = mockImages.sort(() => 0.5 - Math.random()).slice(0, 3);

        return NextResponse.json({ images: selected });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
