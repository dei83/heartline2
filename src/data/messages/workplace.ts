import { PublicMessage } from "@/types";

export const workplaceMessages: Omit<PublicMessage, "id" | "likes">[] = [
    // --- APPRECIATION (Safe, Professional) ---
    {
        content: "Just wanted to say I really appreciate how you handled the [Project Name] chaos this week. Your calmness kept the rest of us sane.",
        category: "Workplace Appreciation",
        tags: ["Coworker", "Gratitude", "Project"],
        tone: "Sincere",
        emotionalIntensity: "Low",
        riskLevel: "Safe"
    },
    {
        content: "Thank you for advocating for my idea in the meeting today. It meant a lot to have your support in that room.",
        category: "Workplace Appreciation",
        tags: ["Boss", "Coworker", "Support"],
        tone: "Professional",
        emotionalIntensity: "Medium",
        riskLevel: "Safe"
    },
    {
        content: "I know I don't say it enough, but thank you for being such a reliable mentor. I've learned more in the last 6 months working with you than I did in the last 2 years.",
        category: "Workplace Appreciation",
        tags: ["Mentor", "Boss", "Gratitude"],
        tone: "Warm",
        emotionalIntensity: "Medium",
        riskLevel: "Safe"
    },
    {
        content: "Thanks for covering for me while I was out. Coming back to a clean inbox was the best gift ever. I owe you one!",
        category: "Workplace Appreciation",
        tags: ["Coworker", "Help"],
        tone: "Casual",
        emotionalIntensity: "Low",
        riskLevel: "Safe"
    },

    // --- BOUNDARIES (Medium Risk) ---
    {
        content: "I'd love to help with this, but my plate is completely full with [Current Project] right now. Can we revisit this next week?",
        category: "Workplace Difficult",
        tags: ["Boundaries", "Refusal"],
        tone: "Firm",
        emotionalIntensity: "Low",
        riskLevel: "Medium"
    },
    {
        content: "Appreciate the invite, but I'm focusing on deep work this morning. I'll catch up on the notes later.",
        category: "Workplace Difficult",
        tags: ["Boundaries", "Focus"],
        tone: "Professional",
        emotionalIntensity: "Low",
        riskLevel: "Safe"
    },
    {
        content: "To ensure I can deliver [Priority Project] on time, I won't be able to take on this additional task right now. Happy to help brainstorm who else might have capacity.",
        category: "Workplace Difficult",
        tags: ["Boundaries", "Refusal", "Professional"],
        tone: "Firm",
        emotionalIntensity: "Low",
        riskLevel: "Medium"
    },

    // --- DIFFICULT CONVERSATIONS (High Risk) ---
    {
        content: "I felt dismissed when you interrupted me in the meeting today. I value your input, but I'd appreciate it if I could finish my thought next time.",
        category: "Workplace Difficult",
        tags: ["Conflict", "Feedback", "Assertive"],
        tone: "Firm",
        emotionalIntensity: "High",
        riskLevel: "Risky"
    },
    {
        content: "I've noticed a pattern of [Specific Behavior] lately, and it's impacting my ability to [Specific Task]. Can we find 15 mins to chat about how we can work together more effectively?",
        category: "Workplace Difficult",
        tags: ["Conflict", "Feedback"],
        tone: "Professional",
        emotionalIntensity: "Medium",
        riskLevel: "Medium"
    },

    // --- RESIGNATION / GOODBYE ---
    {
        content: "It's been a privilege working with this team. I'm moving on to a new adventure, but I'll always cherish the work we did on [Project]. Let's stay in touch on LinkedIn.",
        category: "Goodbye",
        tags: ["Resignation", "Coworker"],
        tone: "Warm",
        emotionalIntensity: "Medium",
        riskLevel: "Safe"
    },
    {
        content: "I'm writing to formally resign from my position, effective [Date]. I'm incredibly grateful for the opportunities I've had here and will do everything I can to ensure a smooth handover.",
        category: "Goodbye",
        tags: ["Resignation", "Boss"],
        tone: "Professional",
        emotionalIntensity: "Low",
        riskLevel: "Safe"
    }
];
