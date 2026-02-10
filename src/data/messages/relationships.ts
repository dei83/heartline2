import { PublicMessage } from "@/types";

export const relationshipMessages: Omit<PublicMessage, "id" | "likes">[] = [
    // --- APOLOGIES (The "Real" Ones) ---
    {
        content: "I’m sorry for how I snapped at you earlier. I was stressed about work, but that’s no excuse to take it out on you. You deserve better. Can I make it up to you with dinner?",
        category: "Apology",
        tags: ["Partner", "Conflict", "Sincere"],
        tone: "Sincere",
        emotionalIntensity: "Medium",
        riskLevel: "Safe"
    },
    {
        content: "I messed up. I know 'sorry' doesn't fix it, but I want you to know I understand why you're hurt. I'm going to [Specific Action] to make sure it doesn't happen again.",
        category: "Apology",
        tags: ["Partner", "Serious", "Growth"],
        tone: "Sincere",
        emotionalIntensity: "High",
        riskLevel: "Medium"
    },
    {
        content: "I owe you an apology for missing [Event]. I know how important it was to you, and I feel terrible for letting you down. There's no excuse, I just managed my time poorly.",
        category: "Apology",
        tags: ["Friend", "Flaking"],
        tone: "Sincere",
        emotionalIntensity: "Medium",
        riskLevel: "Safe"
    },

    // --- LONG DISTANCE ---
    {
        content: "I hate that you're not here right now. Everything I see reminds me of you. Counting down the days until [Date].",
        category: "Long Distance",
        tags: ["Partner", "Missing You"],
        tone: "Romantic",
        emotionalIntensity: "High",
        riskLevel: "Safe"
    },
    {
        content: "Just saw this and thought of you. Wish we could teleport. Hope your day is going better than mine!",
        category: "Long Distance",
        tags: ["Partner", "Check-in"],
        tone: "Casual",
        emotionalIntensity: "Low",
        riskLevel: "Safe"
    },
    {
        content: "Virtual date night tonight? I'll order the pizza, you pick the movie. 8pm?",
        category: "Long Distance",
        tags: ["Partner", "Date"],
        tone: "Playful",
        emotionalIntensity: "Medium",
        riskLevel: "Safe"
    },

    // --- DIFFICULT / BREAKUPS ---
    {
        content: "I've been doing a lot of thinking, and I don't think this relationship is working for me anymore. I care about you, but we want different things. We need to talk.",
        category: "Breakup",
        tags: ["Partner", "Serious"],
        tone: "Somber",
        emotionalIntensity: "High",
        riskLevel: "Risky"
    },
    {
        content: "I think we need to take a break. I'm feeling overwhelmed and need some space to figure out what I want. I hope you can understand.",
        category: "Breakup",
        tags: ["Partner", "Space"],
        tone: "Somber",
        emotionalIntensity: "High",
        riskLevel: "Risky"
    },
    {
        content: "Hey, I had a great time the other night, but I didn't feel a romantic connection. I think you're awesome, but I don't see this going further. innovative to be upfront.",
        category: "Breakup",
        tags: ["Dating", "Rejection"],
        tone: "Polite",
        emotionalIntensity: "Medium",
        riskLevel: "Medium"
    }
];
