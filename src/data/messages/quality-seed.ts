import { PublicMessage } from "@/types";

export const qualityMessages: Omit<PublicMessage, "id" | "likes">[] = [
    // --- WORKPLACE: DIFFICULT (Reddit Research Based) ---
    {
        content: "I want to be transparent that I don't have the bandwidth to take this on without dropping other priorities. Which of my current projects would you like me to deprioritize?",
        category: "Workplace Difficult",
        tags: ["Boundaries", "Workload", "Boss"],
        tone: "Professional",
        emotionalIntensity: "Medium",
        riskLevel: "Medium",
        source: "r/careerguidance",
    },
    {
        content: "I'm not comfortable discussing this topic at work. I'd prefer to keep our conversations focused on professional matters.",
        category: "Workplace Difficult",
        tags: ["Boundaries", "Personal", "Harassment"],
        tone: "Firm",
        emotionalIntensity: "High",
        riskLevel: "Risky",
        source: "r/antiwork",
    },
    {
        content: "I appreciate the feedback. To help me improve, could you provide a specific example of where I missed the mark?",
        category: "Workplace Difficult",
        tags: ["Feedback", "Growth"],
        tone: "Professional",
        emotionalIntensity: "Low",
        riskLevel: "Safe",
        source: "r/jobs",
    },

    // --- RELATIONSHIPS: APOLOGY (Reddit Research Based) ---
    {
        content: "I've been reflecting on our fight, and I realize I was listening to respond, not to understand. I'm sorry for validating your feelings. Can we try again?",
        category: "Apology",
        tags: ["Partner", "Conflict", "Growth"],
        tone: "Sincere",
        emotionalIntensity: "High",
        riskLevel: "Medium",
        source: "r/relationship_advice",
    },
    {
        content: "I know I hurt you, and I'm not expecting forgiveness right away. I just wanted to acknowledge my mistake and tell you I'm working on [Specific Issue].",
        category: "Apology",
        tags: ["Partner", "Serious"],
        tone: "Sincere",
        emotionalIntensity: "High",
        riskLevel: "Risky",
        source: "r/relationships",
    },

    // --- SOCIAL: SAYING NO (Reddit Research Based) ---
    {
        content: "Thank you so much for the invite! I'm in a season of saying no to everything so I can recharge. Hope you have the best time!",
        category: "Social Refusal",
        tags: ["Friend", "Boundaries"],
        tone: "Warm",
        emotionalIntensity: "Low",
        riskLevel: "Safe",
        source: "r/introvert",
    },
    {
        content: "I'm not up for a big gathering right now, but I'd love to grab coffee with just you next week.",
        category: "Social Refusal",
        tags: ["Friend", "Introvert"],
        tone: "Warm",
        emotionalIntensity: "Low",
        riskLevel: "Safe",
        source: "r/socialanxiety",
    },

    // --- CONDOLENCES (Reddit Research Based) ---
    {
        content: "I don't have the right words, but I want you to know I'm thinking of you. No need to reply to this, just wanted to send some love.",
        category: "Sympathy",
        tags: ["Grief", "Low Pressure"],
        tone: "Sincere",
        emotionalIntensity: "Medium",
        riskLevel: "Safe",
        source: "r/GriefSupport",
    },
    {
        content: "If you want to talk, I'm here. If you want a distraction, I have bad jokes. If you want silence, I can sit with you. Just let me know.",
        category: "Sympathy",
        tags: ["Grief", "Support"],
        tone: "Supportive",
        emotionalIntensity: "High",
        riskLevel: "Safe",
        source: "r/GriefSupport",
    }
];
