import { PublicMessage } from "@/types";

export const missYouMessages: Omit<PublicMessage, "id" | "likes">[] = [
    // --- ROMANTIC (Short) ---
    { content: "My bed is too big without you.", category: "Miss You", tags: ["Partner", "Short"], tone: "Romantic", length: "Short" },
    { content: "Counting down the seconds until I see you again.", category: "Miss You", tags: ["Partner", "Anticipation"], tone: "Romantic", length: "Short" },
    { content: "Every song runs out of words, just like I run out of ways to say I miss you.", category: "Miss You", tags: ["Partner", "Poetic"], tone: "Romantic", length: "Medium" },
    { content: "You're the missing puzzle piece to my day.", category: "Miss You", tags: ["Partner", "Sweet"], tone: "Romantic", length: "Short" },
    { content: "Wish you were here to hold my hand.", category: "Miss You", tags: ["Partner", "Physical Touch"], tone: "Romantic", length: "Short" },
    { content: "Everything reminds me of you today.", category: "Miss You", tags: ["Partner", "Daily Life"], tone: "Romantic", length: "Short" },
    { content: "I miss your laugh. It's my favorite sound.", category: "Miss You", tags: ["Partner", "Specific"], tone: "Romantic", length: "Short" },
    { content: "Distance means so little when someone means so much.", category: "Miss You", tags: ["Partner", "Long Distance"], tone: "Romantic", length: "Short" },
    { content: "Just a text to say: I'm thinking of you and I miss you terribly.", category: "Miss You", tags: ["Partner", "Check-in"], tone: "Romantic", length: "Medium" },
    { content: "Sending you a virtual hug because I can't give you a real one right now.", category: "Miss You", tags: ["Partner", "Virtual"], tone: "Romantic", length: "Medium" },

    // --- ROMANTIC (Medium/Long) ---
    {
        content: "I didn't realize how much I rely on your presence until you weren't here. The house is too quiet, and my coffee doesn't taste the same. Come back soon.",
        category: "Miss You",
        tags: ["Partner", "Home"],
        tone: "Romantic",
        emotionalIntensity: "Medium",
        length: "Long"
    },
    {
        content: "They say absence makes the heart grow fonder, but it mostly just makes me really impatient. I can't wait to just sit in the same room as you again.",
        category: "Miss You",
        tags: ["Partner", "Funny"],
        tone: "Romantic",
        emotionalIntensity: "Medium",
        length: "Medium"
    },
    {
        content: "I caught myself reaching for your hand while walking today, only to remember you're miles away. It's a physical ache, missing you. Please hurry home.",
        category: "Miss You",
        tags: ["Partner", "Long Distance", "Deep"],
        tone: "Romantic",
        emotionalIntensity: "High",
        length: "Long"
    },

    // --- PLATONIC / FRIENDS (Short) ---
    { content: "We are overdue for a catch-up. Miss your face!", category: "Miss You", tags: ["Friend", "Casual"], tone: "Warm", length: "Short" },
    { content: "Thinking of you! Let's grab coffee soon.", category: "Miss You", tags: ["Friend", "Plan"], tone: "Casual", length: "Short" },
    { content: "Life's boring without my partner in crime.", category: "Miss You", tags: ["Best Friend", "Funny"], tone: "Playful", length: "Short" },
    { content: "Saw this meme and thought of you. Miss you!", category: "Miss You", tags: ["Friend", "Meme"], tone: "Casual", length: "Short" },
    { content: "Hope you're having an awesome week. Miss you loads!", category: "Miss You", tags: ["Friend", "Support"], tone: "Warm", length: "Short" },
    { content: "It's been way too long. When are we hanging out?", category: "Miss You", tags: ["Friend", "Direct"], tone: "Casual", length: "Short" },
    { content: "Just wanted to say hi and that I miss our chats.", category: "Miss You", tags: ["Friend", "Sincere"], tone: "Warm", length: "Medium" },
    { content: "My life needs more of your energy in it.", category: "Miss You", tags: ["Friend", "Compliment"], tone: "Warm", length: "Short" },

    // --- PLATONIC / FRIENDS (Medium/Long) ---
    {
        content: "I drove past our favorite spot today and it made me miss you so much. We need to go back there as soon as you're free!",
        category: "Miss You",
        tags: ["Friend", "Nostalgia"],
        tone: "Warm",
        length: "Medium"
    },
    {
        content: "I know we're both busy, but I just wanted to pause and say I miss you. You're such an important part of my life and I hate that we haven't connected lately.",
        category: "Miss You",
        tags: ["Friend", "Sincere", "Deep"],
        tone: "Sincere",
        emotionalIntensity: "Medium",
        length: "Long"
    },
    {
        content: "Do you remember that time we laughed until we couldn't breathe? I miss that. I miss us. Let's make time for some joy soon.",
        category: "Miss You",
        tags: ["Best Friend", "Memory"],
        tone: "Nostalgic",
        emotionalIntensity: "Medium",
        length: "Long"
    },

    // --- FAMILY (Short/Medium) ---
    { content: "Thinking of home and missing everyone today.", category: "Miss You", tags: ["Family", "Home"], tone: "Warm", length: "Short" },
    { content: "Miss you, Mom/Dad! Hope you're doing well.", category: "Miss You", tags: ["Parent", "Casual"], tone: "Warm", length: "Short" },
    { content: "Can't wait for the next family gathering. Miss you all!", category: "Miss You", tags: ["Family", "Reunion"], tone: "Excited", length: "Short" },
    { content: "Sending big hugs from afar!", category: "Miss You", tags: ["Family", "Distance"], tone: "Warm", length: "Short" },
    { content: "Home doesn't feel like home without you here.", category: "Miss You", tags: ["Family", "Deep"], tone: "Sincere", length: "Medium" },

    // --- LONG DISTANCE (Specific) ---
    { content: "Technology is great, but it's no substitute for your hug.", category: "Miss You", tags: ["Long Distance", "Reality"], tone: "Sincere", length: "Medium" },
    { content: "Another day down, another day closer to you.", category: "Miss You", tags: ["Long Distance", "Hope"], tone: "Optimistic", length: "Short" },
    { content: "I hate the miles between us, but I love who I'm waiting for.", category: "Miss You", tags: ["Long Distance", "Romantic"], tone: "Romantic", length: "Medium" },
    { content: "Goodnight from this time zone. Miss you always.", category: "Miss You", tags: ["Long Distance", "Night"], tone: "Warm", length: "Short" },

    // --- FUNNY / WITTY ---
    { content: "I miss you like an idiot misses the point.", category: "Miss You", tags: ["Funny", "Witty"], tone: "Humorous", length: "Short" },
    { content: "Come back. I'm bored.", category: "Miss You", tags: ["Funny", "Direct"], tone: "Playful", length: "Short" },
    { content: "I miss you. Also, I forgot my Netflix password. But mostly I miss you.", category: "Miss You", tags: ["Funny", "Honest"], tone: "Humorous", length: "Medium" },
    { content: "My dog misses you. I do too, I guess.", category: "Miss You", tags: ["Funny", "Pet"], tone: "Playful", length: "Short" },
    { content: "I miss you more than coffee. And that's saying a lot.", category: "Miss You", tags: ["Funny", "Coffee"], tone: "Humorous", length: "Short" }
];
