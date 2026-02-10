import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types";

export const pillarPosts = [
    {
        title: "Why 'Happy Birthday' Feels Empty: The Psychology of Meaningful Messages",
        slug: "psychology-of-happy-birthday",
        excerpt: "We send billions of 'HBD' texts a year. Most are forgotten instantly. Here is the science of why some messages stick and others fade.",
        coverImage: "https://images.unsplash.com/photo-1464349153912-bc732ea83296?auto=format&fit=crop&q=80&w=2070",
        tags: ["Psychology", "Communication", "Birthday"],
        author: "Heartline Research",
        content: `# Why 'Happy Birthday' Feels Empty
    
We live in an era of digital convenience. A notification pops up, we type "HBD!", and we move on. But deep down, we know something is missing.

## The 3-Second Rule
Research suggests our brains evaluate the sincerity of a digital message in less than 3 seconds. The key factor? **Effort perception.**

If a message looks like it took 2 seconds to write, it is valued at 2 seconds.

## How to Fix It
1. **Use their name.** It sounds simple, but it triggers a different part of the brain.
2. **Reference a memory.** "Remember that time at the lake?" proves you share a history.
3. **Wish for the future.** "I hope this year brings you X" shows you know their goals.
`
    },
    {
        title: "I Said The Wrong Thing at My Coworker's Funeral. Here's What I Learned.",
        slug: "funeral-message-mistake",
        excerpt: "Silence is often better than a bad cliché. A personal story about grief, awkwardness, and the power of simply showing up.",
        coverImage: "https://images.unsplash.com/photo-1499209971180-41bb712d0a11?auto=format&fit=crop&q=80&w=2070",
        tags: ["Real Stories", "Grief", "Workplace"],
        author: "Sarah J., Community Member",
        content: `# I Said The Wrong Thing

I froze. Standing in front of my coworker, whose father had just passed, my brain went blank. I panicked and said, "At least he lived a long life."

I immediately wanted to disappear.

## Why We Fail at Grief
We are taught to fix problems. But grief isn't a problem to be fixed; it's an experience to be witnessed.

## The Better Approach
Instead of silver linings, try: "I don't have the right words, but I am thinking of you." It acknowledges the awkwardness without minimizing the pain.
`
    },
    {
        title: "I Analyzed 10,000 Reddit Comments About Birthday Messages. Here's What Works.",
        slug: "reddit-birthday-analysis",
        excerpt: "We scraped r/relationships and r/AskReddit to find the birthday wishes that actually get responses. The data might surprise you.",
        coverImage: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=2070",
        tags: ["Data Insights", "Reddit", "Birthday"],
        author: "Heartline Data Team",
        content: `# 10,000 Comments Later...

What makes a birthday message stand out in a sea of notifications? We turned to the internet's most honest forum: Reddit.

## Finding #1: Vulnerability Wins
Messages that admitted a flaw ("I know I'm late to this...") performed 40% better than generic punctual wishes.

## Finding #2: The "Soft Opener"
Starting with "Just wanted to say..." lowers the pressure for the recipient to reply immediately, which ironically increases the response rate.
`
    },
    {
        title: "How to Thank Your Boss Without Sounding Like You're Sucking Up",
        slug: "thanking-boss-guide",
        excerpt: "The line between gratitude and brown-nosing is thin. Here is how to navigate professional appreciation with dignity.",
        coverImage: "https://images.unsplash.com/photo-1521791136064-7985c2717883?auto=format&fit=crop&q=80&w=2069",
        tags: ["Relationships", "Workplace", "Etiquette"],
        author: "Heartline Career",
        content: `# The Art of Professional Gratitude

You want to acknowledge your manager's support, but you're terrified of being "that guy."

## The Power Dynamic
The key is **specificity**. Flattery is vague ("You're the best boss!"). Gratitude is specific ("Thank you for advocating for my project budget.").

## The Formula
1. **The Action:** What did they do?
2. **The Impact:** How did it help you/the team?
3. **The Future:** How does this set you up for success?
`
    },
    {
        title: "Holiday Greetings in the American Workplace: A Complete Guide",
        slug: "holiday-greetings-guide",
        excerpt: "Merry Christmas? Happy Holidays? Seasons Greetings? A breakdown of inclusive language for the modern diverse office.",
        coverImage: "https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80&w=2070",
        tags: ["Culture", "Holidays", "Inclusivity"],
        author: "Heartline Editorial",
        content: `# Navigating the December Minefield

In a diverse workplace, the end of the year brings a mix of celebrations. Christmas, Hanukkah, Kwanzaa, or just New Year's.

## Read the Room
If you know someone celebrates Christmas, say "Merry Christmas." If you don't know, "Happy Holidays" is not a war on Christmas; it's a polite catch-all that ensures you don't exclude anyone.

## The "New Year" Hack
When in doubt, focus on the New Year. It is the one holiday almost everyone shares. "Wishing you a fantastic start to 2025" is universally safe and professional.
`
    }
];

export async function seedBlogPosts() {
    const supabase = await createClient();
    const results = [];

    for (const post of pillarPosts) {
        const { error } = await supabase
            .from('posts')
            .upsert({
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                cover_image: post.coverImage,
                tags: post.tags,
                author: post.author,
                published: true,
                published_at: new Date().toISOString()
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`Error seeding ${post.slug}:`, error);
            results.push({ slug: post.slug, status: 'error', error: error.message });
        } else {
            console.log(`Seeded: ${post.title}`);
            results.push({ slug: post.slug, status: 'success' });
        }
    }
    return results;
}
