import Link from "next/link";
import { ArrowRight, Calendar, Heart, MessageSquare, Gift, Sparkles, Coffee } from "lucide-react";
import { defaultMessages } from "@/data/messages";
import { MessageCard } from "@/components/ui/MessageCard";

export default function Home() {
  // Get a few featured messages
  const featuredMessages = defaultMessages.slice(0, 3).map((msg, i) => ({
    ...msg,
    id: `feat-${i}`,
    likes: 0,
    isPremium: false,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 to-black/30 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-lg mb-6">
            Make Their Day
          </h1>
          <p className="mx-auto max-w-[700px] text-xl md:text-2xl font-light drop-shadow-md text-gray-100 opacity-90 mb-8">
            The right words, right when they need them. <br className="hidden md:inline" />
            Smart reminders and AI-crafted messages for the people you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/dashboard"
            >
              Start Sending Love
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-10 text-lg font-medium text-white shadow-lg transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/about"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions Navigation */}
      <section className="w-full py-16 bg-white border-b border-border/40 shadow-sm relative z-20 -mt-8 rounded-t-3xl mx-auto max-w-7xl">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-foreground/80 tracking-wide uppercase text-sm">Find the perfect message for</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { name: "Birthday", icon: Gift, color: "bg-pink-100 text-pink-600" },
              { name: "Anniversary", icon: Heart, color: "bg-red-100 text-red-600" },
              { name: "Encouragement", icon: Sparkles, color: "bg-yellow-100 text-yellow-600" },
              { name: "Thank You", icon: MessageSquare, color: "bg-blue-100 text-blue-600" },
              { name: "Just Because", icon: Coffee, color: "bg-green-100 text-green-600" },
              { name: "All Events", icon: Calendar, color: "bg-gray-100 text-gray-600" },
            ].map((item) => (
              <Link key={item.name} href={`/messages?category=${item.name}`} className="group flex flex-col items-center p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`p-5 rounded-full mb-4 ${item.color} shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Messages */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Trending Now</h2>
              <p className="text-muted-foreground mt-3 text-lg">Popular messages our community is loving today.</p>
            </div>
            <Link href="/messages" className="hidden md:flex items-center text-primary font-semibold hover:underline text-lg">
              View all collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link href="/messages" className="inline-flex items-center justify-center rounded-lg border border-primary text-primary px-6 py-3 font-medium hover:bg-primary/5 transition-colors">
              View all messages
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
