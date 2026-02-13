import Link from "next/link";
import { ArrowRight, Calendar, Heart, MessageSquare, Gift, Sparkles, Coffee, BookOpen } from "lucide-react";
import { defaultMessages } from "@/data/messages";
import { getBlogPosts } from "@/lib/data/blog-supabase"; // Use dynamic fetch
import { MessageCard } from "@/components/ui/MessageCard";

export default async function Home() {
  // Get a few featured messages
  const featuredMessages = defaultMessages.slice(0, 6).map((msg, i) => ({
    ...msg,
    id: `feat-${i}`,
    likes: 0,
    isPremium: false,
  }));

  // Get latest 3 blog posts dynamically
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Reduced Height */}
      <section className="w-full py-16 md:py-24 bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 to-black/30 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl drop-shadow-lg mb-4">
            Make Their Day
          </h1>
          <p className="mx-auto max-w-[600px] text-lg md:text-xl font-light drop-shadow-md text-gray-100 opacity-90 mb-6">
            The right words, right when they need them. <br className="hidden md:inline" />
            Smart reminders and AI-crafted messages for the people you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/dashboard"
            >
              Start Sending Love
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions Navigation - Adjusted Margin */}
      <section className="w-full py-12 bg-white border-b border-border/40 shadow-sm relative z-20 -mt-6 rounded-t-3xl mx-auto max-w-7xl">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xs font-bold text-center mb-8 text-foreground/60 tracking-widest uppercase">Find the perfect message for</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { name: "Birthday", icon: Gift, color: "bg-pink-50 text-pink-600" },
              { name: "Anniversary", icon: Heart, color: "bg-red-50 text-red-600" },
              { name: "Encouragement", icon: Sparkles, color: "bg-yellow-50 text-yellow-600" },
              { name: "Thank You", icon: MessageSquare, color: "bg-blue-50 text-blue-600" },
              { name: "Just Because", icon: Coffee, color: "bg-green-50 text-green-600" },
              { name: "All Events", icon: Calendar, color: "bg-gray-50 text-gray-600" },
            ].map((item) => (
              <Link key={item.name} href={`/messages?category=${item.name}`} className="group flex flex-col items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`p-4 rounded-full mb-3 ${item.color} shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Messages */}
      <section className="w-full py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Trending Now</h2>
              <p className="text-muted-foreground mt-2 text-base">Popular messages our community is loving today.</p>
            </div>
            <Link href="/messages" className="hidden md:flex items-center text-primary font-semibold hover:underline text-sm">
              View all collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link href="/messages" className="inline-flex items-center justify-center rounded-lg border border-primary text-primary px-6 py-2.5 text-sm font-medium hover:bg-primary/5 transition-colors">
              View all messages
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="w-full py-20 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                  Relationship Advice
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Latest from the Blog</h2>
              <p className="text-muted-foreground mt-2 text-base">Expert tips on communication, psychology, and relationships.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-primary font-semibold hover:underline text-sm">
              Read more articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {post.tags[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                    Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
