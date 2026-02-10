import { PublicMessage } from "@/types";

export const longMessages: Omit<PublicMessage, "id" | "likes">[] = [
    // --- ANNIVERSARY (Long & Heartfelt) ---
    {
        content: "Happy Anniversary to the person who knows me better than I know myself. Looking back on all the memories we've made, I'm just so grateful that I get to do life with you. Thank you for your patience, your kindness, and for always being my safe place. Here's to a lifetime more of us.",
        category: "Anniversary",
        tags: ["Partner", "Deep", "Gratitude"],
        tone: "Romantic",
        emotionalIntensity: "High",
        riskLevel: "Safe",
        length: "Long"
    },
    {
        content: "They say love is about finding someone you can't live without, but with you, it's so much more than that. It's finding someone who makes the mundane moments feel magic, who challenges me to be better, and who holds my hand through the storms. I love who I am when I'm with you.",
        category: "Anniversary",
        tags: ["Partner", "Growth", "Commitment"],
        tone: "Romantic",
        emotionalIntensity: "High",
        riskLevel: "Safe",
        length: "Long"
    },

    // --- BIRTHDAY (Best Friend - Long) ---
    {
        content: "Happy Birthday to the one who has seen me at my absolute worst and still chose to stick around. I honestly don't know how I would navigate this crazy life without your midnight pep talks, our endless meme exchanges, and your brutal honesty. You're not just a friend; you're family.",
        category: "Happy Birthday",
        tags: ["Best Friend", "Gratitude"],
        tone: "Sincere",
        emotionalIntensity: "High",
        riskLevel: "Safe",
        length: "Long"
    },

    // --- ENCOURAGEMENT (Long) ---
    {
        content: "I know things feel impossibly heavy right now, and I wish I could take some of that weight off your shoulders. Please remember that your productivity does not define your worth, and taking time to rest is not 'giving up'. I believe in you, not just for what you do, but for who you are.",
        category: "Encouragement",
        tags: ["Support", "Burnout", "Deep"],
        tone: "Supportive",
        emotionalIntensity: "High",
        riskLevel: "Safe",
        length: "Long"
    },

    // --- THANK YOU (Mentor/Parent - Long) ---
    {
        content: "I wanted to take a moment to properly thank you for everything you've done for me recently. Your guidance came at a time when I felt completely lost, and your belief in me gave me the courage to keep going. I hope one day I can pay it forward and be that person for someone else.",
        category: "Thank You",
        tags: ["Mentor", "Parent", "Life Changing"],
        tone: "Grateful",
        emotionalIntensity: "High",
        riskLevel: "Safe",
        length: "Long"
    }
];
