import { PublicMessage } from "@/types";

type MessageData = Omit<PublicMessage, "id" | "likes">;

export const mothersDayMessages: MessageData[] = [
    // --- SINCERE & WARM (10) ---
    { content: "Happy Mother's Day! Thank you for being my rock, my cheerleader, and my best friend.", category: "Mother's Day", tags: ["sincere", "family"], tone: "Warm" },
    { content: "To the woman who does it all—Happy Mother's Day! I appreciate you more than words can say.", category: "Mother's Day", tags: ["appreciation"], tone: "Sincere" },
    { content: "Happy Mother's Day, Mom. Your love creates a home wherever you are.", category: "Mother's Day", tags: ["touching"], tone: "Heartfelt" },
    { content: "Wishing you a day as beautiful and kind as your heart. Happy Mother's Day!", category: "Mother's Day", tags: ["compliment"], tone: "Warm" },
    { content: "Thank you for all the sacrifices you've made and the love you've given. Happy Mother's Day.", category: "Mother's Day", tags: ["gratitude"], tone: "Deep" },
    { content: "Happy Mother's Day! You are the heart of our family.", category: "Mother's Day", tags: ["family"], tone: "Sincere" },
    { content: "I am who I am today because of you. Thank you, Mom. Happy Mother's Day!", category: "Mother's Day", tags: ["gratitude"], tone: "Emotional" },
    { content: "Sending you all my love today. I hope you feel spoiled and cherished!", category: "Mother's Day", tags: ["love"], tone: "Warm" },
    { content: "Happy Mother's Day to the strongest woman I know.", category: "Mother's Day", tags: ["respect"], tone: "Admiration" },
    { content: "You make life sweeter just by being in it. Have a wonderful Mother's Day!", category: "Mother's Day", tags: ["sweet"], tone: "Cheerful" },

    // --- FUNNY & WITTY (10) ---
    { content: "Happy Mother's Day! Thanks for not leaving me in a basket on a doorstep. You're the real MVP.", category: "Mother's Day", tags: ["funny", "joke"], tone: "Humorous" },
    { content: "Happy Mother's Day to the person who knows all my passwords (and secrets). Love you!", category: "Mother's Day", tags: ["funny"], tone: "Witty" },
    { content: "Mom, you were right about everything. There, I said it. Happy Mother's Day! 🏳️", category: "Mother's Day", tags: ["admission", "funny"], tone: "Playful" },
    { content: "Happy Mother's Day! I promise to clean my room... eventually. Love, your favorite mess.", category: "Mother's Day", tags: ["funny"], tone: "Cheeky" },
    { content: "Thanks for putting up with me all these years. You deserve a medal (and wine). Happy Mother's Day! 🍷", category: "Mother's Day", tags: ["funny"], tone: "Humorous" },
    { content: "Happy Mother's Day! I love you more than I love my phone. (Okay, maybe a tie). 📱", category: "Mother's Day", tags: ["funny", "modern"], tone: "Witty" },
    { content: "Happy Mother's Day from your favorite financial burden. Love you! 💸", category: "Mother's Day", tags: ["funny", "self-deprecating"], tone: "Sarcastic" },
    { content: "To the woman who survived my teenage years: You are a saint. Happy Mother's Day! 😇", category: "Mother's Day", tags: ["funny"], tone: "Grateful" },
    { content: "Happy Mother's Day! Let's pretend I got you a yacht. 🛥️", category: "Mother's Day", tags: ["funny"], tone: "Silly" },
    { content: "Happy Mother's Day! Thanks for the genes! (I turned out pretty great, right?) 😉", category: "Mother's Day", tags: ["funny"], tone: "Confident" },

    // --- SHORT & SWEET (5) ---
    { content: "Happy Mother's Day, Mom! Love you tons. ❤️", category: "Mother's Day", tags: ["short"], tone: "Casual" },
    { content: "Best. Mom. Ever. Happy Mother's Day! 🏆", category: "Mother's Day", tags: ["short", "compliment"], tone: "Enthusiastic" },
    { content: "Wishing you the best day, Mom! 💐", category: "Mother's Day", tags: ["short"], tone: "Simple" },
    { content: "Happy Mother's Day! xoxo", category: "Mother's Day", tags: ["short"], tone: "Affectionate" },
    { content: "Love you, Mom. Today and always.", category: "Mother's Day", tags: ["short"], tone: "Sincere" },

    // --- FOR GRANDMOTHERS / MOTHER FIGURES (5) ---
    { content: "Happy Mother's Day to an amazing Grandma! Thanks for spoiling me rotten.", category: "Mother's Day", tags: ["grandma"], tone: "Warm" },
    { content: "Happy Mother's Day! You're like a mom to me, and I'm so grateful for you.", category: "Mother's Day", tags: ["mentor", "non-bio"], tone: "Grateful" },
    { content: "Wishing a beautiful Mother's Day to the matriarch of our family! 👑", category: "Mother's Day", tags: ["grandma", "respect"], tone: "Celebratory" },
    { content: "Happy Mother's Day! Thank you for stepping in and loving me like your own.", category: "Mother's Day", tags: ["stepmom", "aunt"], tone: "Appreciative" },
    { content: "To my second mom: Happy Mother's Day! Life is better with you in it.", category: "Mother's Day", tags: ["mother-figure"], tone: "Sincere" }
];
