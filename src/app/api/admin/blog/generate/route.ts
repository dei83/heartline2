import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { MASTER_PROMPT_SYSTEM, PILLAR_PROMPTS } from "@/lib/ai/prompts";

export async function POST(req: Request) {
    const { topic, sourceId } = await req.json();
    const supabase = await createClient();

    let contextData = "";
    let selectedPillar = "psychology"; // Default
    let research: any = null;

    // 1. Fetch Source Data (if provided)
    if (sourceId) {
        const { data } = await supabase
            .from('reddit_research')
            .select('*')
            .eq('id', sourceId)
            .single();

        research = data;

        if (research) {
            contextData = `
SOURCE DATA (Reddit Post):
Title: ${research.title}
Subreddit: r/${research.subreddit}
Content: ${research.body}
Sentiment: ${research.sentiment}
Extracted Messages: ${research.extracted_messages?.join(", ")}
            `;
            // Simple heuristic to pick pillar based on subreddit
            if (research.subreddit === 'relationships') selectedPillar = 'stories';
            if (research.subreddit === 'dataisbeautiful' || research.subreddit === 'samplesize') selectedPillar = 'research';
        }
    }

    const pillarConfig = PILLAR_PROMPTS[selectedPillar as keyof typeof PILLAR_PROMPTS] || PILLAR_PROMPTS.psychology;

    // 2. Construct Master Prompt (This would be sent to OpenAI/Claude)
    /* 
    const fullPrompt = `
${MASTER_PROMPT_SYSTEM}

${pillarConfig.role}

TASK: Write a blog post about: "${topic || "Analysis of the provided data"}"

${contextData}

STRUCTURE:
${pillarConfig.structure}

GUIDELINES:
${pillarConfig.guidelines}
    `;
    */

    // 3. Mock AI Generation (Replace with Real OpenAI/Claude call later)
    // For now, we simulate the output with a smarter template
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate thinking time

    // 3. Mock AI Generation (Replace with Real OpenAI/Claude call later)
    // For now, we simulate the output with a smarter template
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate thinking time

    let mockContent = "";
    let finalTitle = "";
    let finalSlug = "";
    let finalTags = [];

    // DETECT MODE: GIFT GUIDE
    if (topic?.toLowerCase().includes("gift") || selectedPillar === "gifts") {
        finalTitle = topic || "Top 15 Heartfelt Gifts Trending Right Now (+ Perfect Messages)";
        finalTags = ["Gifts", "Trends", "Valentine's Day", "Guide"];

        mockContent = `
# ${finalTitle}

*Generated via Heartline AI Engine (GIFT_GUIDE Mode)*

## Introduction
We analyzed current trends to find gifts that actually resonate. 
${research ? `> **Inspiration**: This guide is inspired by a recent discussion on r/${research.subreddit}: "${research.title}"` : ""}

These aren't just objects; they are vehicles for connection. After analyzing sales data and review sentiment, we found a shift away from generic items toward **personalized, experience-oriented gifts**.

---

## Top Picks (Organized by Emotion)

### 1. For When You Want to Say "I See You"
#### Custom Star Map - Night You Met
🎁 **Why it's trending:** Up 450% in February. Buyers love that it captures "their moment" in a beautiful, scientific way.
👤 **Perfect for:** Partners who appreciate sentimental gestures, anniversary celebrations.
💰 **Price:** ~$49.99
💬 **Message Pairing:**
"I got you something that reminds me why I'm grateful we found each other. This is the sky exactly as it looked on [date] - the night that changed everything for me."

**Why this works:** The gift is already sentimental, so your message should acknowledge that vulnerability while being specific.

---

### 2. For When You Want to Say "Let's Make Memories"
#### Adventure Fund Jar & Starter Cash
🎁 **Why it's trending:** Experiential gifts are dominating 2026.
👤 **Perfect for:** Travel lovers, planners.
💰 **Price:** ~$45 + Contribution
💬 **Message Pairing:**
"I'm putting in the first $150 toward our next adventure. Pick a place and let's start planning our escape."

---

### 3. For When You Want to Say "Relax"
#### Premium Spa Day at Home Kit
🎁 **Why it's trending:** Self-care culture meets gifting. Complete kits with bath bombs, face masks, massage oil.
👤 **Perfect for:** Stressed partners, parents.
💰 **Price:** ~$54.99
💬 **Message Pairing:**
"You spend so much time taking care of everyone else. Tonight is about you relaxing while I handle everything."

---

### 4. For The Practical Romantic
#### Wireless Noise-Canceling Earbuds (Upgraded)
🎁 **Why it's trending:** Practical romance wins. They mentioned their old earbuds suck? You listened.
👤 **Perfect for:** Commuters, gym-goers, podcast lovers.
💰 **Price:** ~$129.99
💬 **Message Pairing:**
"You mentioned your earbuds kept cutting out. I know it's not roses, but I wanted to fix something that was annoying you every day."

---

### 5. For The Music Lover
#### Custom Song Recording - Vinyl Art
🎁 **Why it's trending:** Combines nostalgia with personalization. Actual sound waves etched onto vinyl.
👤 **Perfect for:** Couples with "their song".
💰 **Price:** ~$78.00
💬 **Message Pairing:**
"Every time I hear this song, I think of you. Now it's something beautiful we can see every day."

---

### 6. For The Sentimental Writer
#### "52 Reasons I Love You" Card Deck
🎁 **Why it's trending:** Allows personalization but structured enough that you don't freeze up writing.
👤 **Perfect for:** Newer relationships, long-distance.
💰 **Price:** ~$32.99
💬 **Message Pairing:**
"I wanted to tell you all the reasons why, but I kept thinking of more. So here's 52 of them - one for every week we'll spend together."

---

### 7. For The Hobbyist
#### Tailored Subscription Box
🎁 **Why it's trending:** Monthly reminders that you know what they love (Coffee, Books, Hot Sauce).
👤 **Perfect for:** Anyone with a clear hobby.
💰 **Price:** $35-65/month
💬 **Message Pairing:**
"I notice how your face lights up when you talk about [Hobby]. I wanted to give you something that keeps that joy coming all year long."

---

## Category Deep-Dives: Budget Friendly (Under $30)

**8. Custom Playlist Printout** ($15)
"Every one of these songs made me think of you at some point this year."

**9. Handwritten Letter Set** ($22)
"Open when you miss me," "Open when you need encouragement."

**10. Hometown Snacks** ($25)
"I know you miss home sometimes. Here's a little piece of it."

## Conclusion
Remember, the gift is just the vessel. The message is the story. Make it worth telling.
`;
    } else {
        // DETECT MODE: GENERAL / PSYCHOLOGY
        finalTitle = topic ? `Why "${topic}" Matters` : (research ? `Analysis: ${research.title}` : "The Psychology of Connection");
        finalTags = ["Communication", "Psychology", selectedPillar, "AI Generated"];

        mockContent = `
# ${finalTitle}

*Generated via Heartline AI Engine (${(selectedPillar || "GENERAL").toUpperCase()} Mode)*

## 1. Introduction
We recently analyzed a discussion on **r/${research?.subreddit || "relationships"}** that highlights a common struggle: **"${research?.title || topic}"**. 

> "${research ? research.body.substring(0, 150) + "..." : "Many people struggle with communication..."}"

This situation resonates with many of us because it touches on a fundamental human need: validation.

## 2. The Core Issue
In this scenario, the underlying issue isn't just about the specific event (e.g., "${research?.title || "the incident"}"). It's about **unmet expectations**.

${research?.sentiment === 'negative' ? "The negative sentiment in the original post suggests deep frustration." : "The discussion shows a mix of confusion and desire for improvement."}

## 3. Psychological Perspective
Dr. John Gottman's research on "bids for connection" is relevant here. Every interaction is a bid. When these bids are ignored or mishandled, resentment builds.

## 4. Actionable Advice
Here is how to handle this better:

### Script A: The Direct Approach
> "I feel [emotion] when [action] happens. Can we try [alternative]?"

### Script B: The Soft Start-up
> "I've been thinking about our conversation regarding..."

## 5. Conclusion
Communication is a skill, not a trait. It takes practice.
`;
    }


    return NextResponse.json({
        success: true,
        draft: {
            title: finalTitle,
            slug: finalTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            excerpt: topic?.toLowerCase().includes("gift")
                ? "A curated list of gifts that prioritize connection over cost, complete with the perfect message pairings."
                : `A deep dive into "${research?.title || topic}", exploring the psychological nuances.`,
            content: mockContent,
            tags: finalTags,
            coverImage: topic?.toLowerCase().includes("gift")
                ? "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
                : "https://images.unsplash.com/photo-1516383748727-85d1253e28a1?w=800&q=80",
            imageOptions: topic?.toLowerCase().includes("gift") ? [
                "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80", // Gifts/Red
                "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80", // Gift boxes
                "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80", // Hands holding gift
                "https://images.unsplash.com/photo-1607344645866-009c320b63bc?w=800&q=80"  // Minimal gift
            ] : [
                "https://images.unsplash.com/photo-1516383748727-85d1253e28a1?w=800&q=80", // Couple holding hands
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80", // Writing/Notebook
                "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80", // Happy couple
                "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80"  // Thoughtful/Coffee
            ]
        }
    });
}
