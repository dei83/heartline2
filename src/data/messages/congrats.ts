import { PublicMessage } from "@/types";

type MessageData = Omit<PublicMessage, "id" | "likes">;

export const congratsMessages: MessageData[] = [
    // --- FUNNY & WITTY (10) ---
    { content: "Congrats! You did the thing! 🎉", category: "Congrats", tags: ["funny", "short"], tone: "Enthusiastic" },
    { content: "Look at you, being all successful and stuff. Proud of you! 😎", category: "Congrats", tags: ["funny", "friend"], tone: "Playful" },
    { content: "Congrats! I'd say I'm surprised, but we both know you're amazing. 😉", category: "Congrats", tags: ["compliment"], tone: "Confident" },
    { content: "You did it! Now let's celebrate (aka drink). 🥂", category: "Congrats", tags: ["party", "funny"], tone: "Celebratory" },
    { content: "High five! ✋ (Don't leave me hanging).", category: "Congrats", tags: ["funny"], tone: "Casual" },
    { content: "Congrats! You're officially a big deal now. 🌟", category: "Congrats", tags: ["funny"], tone: "Hype" },
    { content: "Can I have your autograph before you get too famous? Congrats! ✍️", category: "Congrats", tags: ["funny"], tone: "Admiring" },
    { content: "Congrats! Please remember the little people (me). 😂", category: "Congrats", tags: ["funny"], tone: "Self-deprecating" },
    { content: "You crushed it! Like a grape. In a vineyard. Making wine. Which we should drink. Congrats! 🍷", category: "Congrats", tags: ["funny"], tone: "Witty" },
    { content: "Congrats! I knew you could do it (mostly). Just kidding, never doubted you! 😜", category: "Congrats", tags: ["funny"], tone: "Teasing" },

    // --- WARM & SINCERE (10) ---
    { content: "Congratulations! So incredibly happy for you.", category: "Congrats", tags: ["sincere"], tone: "Warm" },
    { content: "This is huge! You deserve every bit of this success.", category: "Congrats", tags: ["support"], tone: "Sincere" },
    { content: "So proud of your hard work and dedication. Congratulations! 👏", category: "Congrats", tags: ["proud"], tone: "Heartfelt" },
    { content: "Wishing you even more success in the future. Congrats!", category: "Congrats", tags: ["future"], tone: "Encouraging" },
    { content: "You've earned this moment. Enjoy it! 🌟", category: "Congrats", tags: ["deserved"], tone: "Warm" },
    { content: "Congratulations on your well-deserved success.", category: "Congrats", tags: ["formal"], tone: "Polite" },
    { content: "Sending you a huge congratulations on this amazing achievement!", category: "Congrats", tags: ["excited"], tone: "Enthusiastic" },
    { content: "Your perseverance has paid off. Congratulations. 💪", category: "Congrats", tags: ["hard-work"], tone: "Respectful" },
    { content: "So happy to hear your good news! Congrats! 🌈", category: "Congrats", tags: ["happiness"], tone: "Cheery" },
    { content: "Congratulations! The world is your oyster. 🦪", category: "Congrats", tags: ["classic"], tone: "Optimistic" },

    // --- SHORT & PUNCHY (10) ---
    { content: "Way to go! 🚀", category: "Congrats", tags: ["short"], tone: "Excited" },
    { content: "Congrats! 🎊", category: "Congrats", tags: ["short"], tone: "Simple" },
    { content: "So proud! ❤️", category: "Congrats", tags: ["short"], tone: "Warm" },
    { content: "You rock! 🎸", category: "Congrats", tags: ["short"], tone: "Casual" },
    { content: "Bravo! 👏", category: "Congrats", tags: ["short"], tone: "Classic" },
    { content: "Well done! 👍", category: "Congrats", tags: ["short"], tone: "Polite" },
    { content: "Cheers! 🥂", category: "Congrats", tags: ["short"], tone: "Celebratory" },
    { content: "Respect. ✊", category: "Congrats", tags: ["short"], tone: "Cool" },
    { content: "Nailed it. 🔨", category: "Congrats", tags: ["short"], tone: "Confident" },
    { content: "Huge! 💥", category: "Congrats", tags: ["short"], tone: "Hype" },

    // --- MILESTONES & GENERIC (10) ---
    { content: "Here's to your next chapter! Congrats! 📖", category: "Congrats", tags: ["new-chapter"], tone: "Inspirational" },
    { content: "Congratulations on reaching this milestone. 🏁", category: "Congrats", tags: ["milestone"], tone: "Sincere" },
    { content: "This calls for a celebration! Congrats! 🎂", category: "Congrats", tags: ["party"], tone: "Excited" },
    { content: "Keep shining! Congratulations. ✨", category: "Congrats", tags: ["encouragement"], tone: "Warm" },
    { content: "You continue to amaze me. Congrats! 😲", category: "Congrats", tags: ["compliment"], tone: "Admiring" },
    { content: "Success looks good on you. Congrats! 💃", category: "Congrats", tags: ["compliment"], tone: "Stylish" },
    { content: "Congratulations! I'm cheering for you always. 📣", category: "Congrats", tags: ["support"], tone: "Loyal" },
    { content: "What a fantastic achievement. Congrats! 🏆", category: "Congrats", tags: ["achievement"], tone: "Grateful" },
    { content: "Enjoy your victory lap! 🏎️", category: "Congrats", tags: ["success"], tone: "Fun" },
    { content: "Congratulations! Can't wait to see what you do next. 👀", category: "Congrats", tags: ["future"], tone: "Curious" }
];
