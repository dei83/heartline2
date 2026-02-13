import { Metadata } from "next";
import { Heart, Users, Sparkles, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Heartline",
    description: "Learn about the mission and team behind Heartline.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 tracking-tight">Making Every Connection Count</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Heartline is a relationship management platform designed to help you nurture your most important connections with thoughtfulness and intention.
                </p>
            </div>

            {/* Mission Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="p-6 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/50">
                    <Heart className="w-8 h-8 text-rose-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Intentionality</h3>
                    <p className="text-sm text-muted-foreground">
                        We believe relationships shouldn't be left to chance. We help you remember, plan, and act on the moments that matter.
                    </p>
                </div>
                <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                    <Sparkles className="w-8 h-8 text-indigo-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Expression</h3>
                    <p className="text-sm text-muted-foreground">
                        Finding the right words is hard. Our AI-assisted tools helps you articulate your feelings authentically.
                    </p>
                </div>
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <Shield className="w-8 h-8 text-emerald-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                        Your personal relationships are private. We store your data securely and never sell your personal information.
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl">
                <h2>Our Story</h2>
                <p>
                    In a world of instant messaging and social media likes, genuine connection is becoming a lost art.
                    We found ourselves forgetting birthdays, struggling to write meaningful condolences, and letting months slip by without calling our parents.
                </p>
                <p>
                    We built Heartline to solve this. It started as a simple reminder app, but grew into a comprehensive "relationship operating system."
                    Today, Heartline helps thousands of people stay connected with the people who matter most.
                </p>
                <p>
                    Whether it's a birthday wish, a difficult conversation, or just a "thinking of you" text, Heartline gives you the tools to do it right.
                </p>
            </div>
        </div>
    );
}
