"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Copy, ExternalLink, RefreshCw, Database } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ResearchHubPage() {
    const [redditData, setRedditData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('reddit_research')
            .select('*')
            .order('scraped_at', { ascending: false });
        // actually schema says `created_date` and `scraped_at`. Let's use `scraped_at` or `created_date`

        if (error) {
            console.error(error);
            toast.error("Failed to load research data");
        } else {
            setRedditData(data || []);
        }
        setLoading(false);
    };

    const handleSeed = async () => {
        try {
            const loadingToast = toast.loading('Seeding mock data...');
            const res = await fetch('/api/admin/research/seed', { method: 'POST' });
            const result = await res.json();

            toast.dismiss(loadingToast);

            if (!res.ok) {
                throw new Error(result.error || 'Failed to seed data');
            }

            toast.success(`Mock data seeded! (${result.count} items)`);
            fetchData();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to seed data");
        }
    };

    const handleScrape = async () => {
        try {
            const loadingToast = toast.loading('Fetching latest data from Reddit...');
            const res = await fetch('/api/admin/scrape', {
                method: 'POST',
                body: JSON.stringify({ limit: 5 }) // Default fetch 5 posts per sub
            });
            const result = await res.json();

            toast.dismiss(loadingToast);

            if (!res.ok) {
                throw new Error(result.error || 'Failed to scrape data');
            }

            toast.success(`Scraped ${result.count} new posts! (${result.mode} MODE)`);
            fetchData();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to scrape data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Database className="w-8 h-8 text-primary" />
                        Research Hub
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage scraped data from Reddit, Amazon, and Cultural databases.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleScrape}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Fetch Latest (Scraper)
                    </button>
                    <button
                        onClick={handleSeed}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        <Database className="w-4 h-4" />
                        Seed Mock Data
                    </button>
                </div>
            </div>

            {/* Tabs / filters could go here */}

            {loading ? (
                <div className="text-center py-20 text-muted-foreground">Loading research data...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {redditData.map((item) => (
                        <div key={item.id} className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                                    r/{item.subreddit}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(item.scraped_at).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">
                                {item.title}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                {item.body}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                <span>⬆️ {item.score}</span>
                                <span>💬 {item.num_comments}</span>
                                <span className={`px-1.5 py-0.5 rounded ${item.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                                    item.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {item.sentiment}
                                </span>
                            </div>

                            <div className="pt-3 border-t flex justify-between items-center">
                                <a
                                    href={`https://reddit.com/comments/${item.post_id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs flex items-center gap-1 text-blue-600 hover:underline"
                                >
                                    View Original <ExternalLink className="w-3 h-3" />
                                </a>
                                <Link
                                    href={`/admin/blog/new?source=${item.id}`}
                                    className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20 transition-colors"
                                >
                                    Draft Post →
                                </Link>
                            </div>
                        </div>
                    ))}

                    {redditData.length === 0 && (
                        <div className="col-span-full text-center py-20 border-2 border-dashed rounded-xl">
                            <p className="text-muted-foreground">No research data found. Try seeding some mock data!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
