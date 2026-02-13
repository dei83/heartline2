import { PublicMessage } from "@/types";

type MessageData = Omit<PublicMessage, "id" | "likes">;

export const newBabyMessages: MessageData[] = [
    // --- FUNNY & REALISTIC (10) ---
    { content: "Congrats on the new tiny human! Get ready for poop. Lots of poop. 💩", category: "New Baby", tags: ["funny", "real"], tone: "Humorous" },
    { content: "Welcome to parenthood! Sleep is now a luxury item. Congrats! 😴", category: "New Baby", tags: ["funny", "sleep"], tone: "Sympathetic-Funny" },
    { content: "Congrats on creating a mini version of yourself! (Good luck with that). 😉", category: "New Baby", tags: ["funny"], tone: "Teasing" },
    { content: "So happy for you! Also, say goodbye to your free time. 👋", category: "New Baby", tags: ["funny"], tone: "Witty" },
    { content: "Congrats! Can't wait to smell that new baby smell (until it changes). 🍼", category: "New Baby", tags: ["funny"], tone: "Playful" },
    { content: "Bottle service has a whole new meaning now. Congrats! 🍾🍼", category: "New Baby", tags: ["funny", "party"], tone: "Witty" },
    { content: "Congrats on your promotion to 'Mom'/'Dad'! The pay is zero, but the benefits are cute. 👶", category: "New Baby", tags: ["funny"], tone: "Clever" },
    { content: "You made a person! That's wild. Congrats! 🤯", category: "New Baby", tags: ["funny"], tone: "Amazed" },
    { content: "Congrats on the baby! Let me know when you're ready for wine again. 🍷", category: "New Baby", tags: ["funny"], tone: "Friend" },
    { content: "Welcome to the club of no sleep and endless love. Mostly no sleep. Congrats! 🧟", category: "New Baby", tags: ["funny"], tone: "Real" },

    // --- WARM & SWEET (10) ---
    { content: "Welcome to the world, little one! So happy for your growing family.", category: "New Baby", tags: ["sincere"], tone: "Warm" },
    { content: "Congratulations on your beautiful new arrival! ❤️", category: "New Baby", tags: ["compliment"], tone: "Heartfelt" },
    { content: "So incredibly happy for you. Your baby is so lucky to have you as parents.", category: "New Baby", tags: ["compliment"], tone: "Sincere" },
    { content: "Wishing you endless joy and snuggles with your new bundle of joy.", category: "New Baby", tags: ["wishes"], tone: "Sweet" },
    { content: "Prepare for a lifetime of love. Congratulations! 🧸", category: "New Baby", tags: ["love"], tone: "Emotional" },
    { content: "A new baby is like a little bit of heaven on earth. Congrats! ☁️", category: "New Baby", tags: ["poetic"], tone: "Dreamy" },
    { content: "Your family just got a whole lot cuter. Congratulations! 🥰", category: "New Baby", tags: ["compliment"], tone: "Cheery" },
    { content: "Sending big love to the little one. Congrats! 💌", category: "New Baby", tags: ["love"], tone: "Warm" },
    { content: "May your baby be blessed with good health and happiness. 🙏", category: "New Baby", tags: ["blessing"], tone: "Formal-Warm" },
    { content: "Congratulations on this wonderful miracle. ✨", category: "New Baby", tags: ["miracle"], tone: "Awestruck" },

    // --- GENDER REVEAL (10) ---
    { content: "It's a Boy! 💙 Time to buy everything blue (or dinosaurs). Congrats!", category: "New Baby", tags: ["gender-reveal", "boy"], tone: "Excited" },
    { content: "It's a Girl! 🩷 Get ready for bows and attitude. Congrats!", category: "New Baby", tags: ["gender-reveal", "girl"], tone: "Excited" },
    { content: "Pink or Blue, we already love you! Congrats! 🩷💙", category: "New Baby", tags: ["gender-reveal"], tone: "Inclusive" },
    { content: "Team Boy! 🧢 Congrats on your little prince.", category: "New Baby", tags: ["gender-reveal", "boy"], tone: "Celebratory" },
    { content: "Team Girl! 🎀 Congrats on your little princess.", category: "New Baby", tags: ["gender-reveal", "girl"], tone: "Celebratory" },
    { content: "He's here! And he's perfect. Congrats! 💙", category: "New Baby", tags: ["birth-announcement", "boy"], tone: "Joyful" },
    { content: "She's here! And she's beautiful. Congrats! 🩷", category: "New Baby", tags: ["birth-announcement", "girl"], tone: "Joyful" },
    { content: "Can't wait to meet your little man. Congrats! 👔", category: "New Baby", tags: ["boy"], tone: "Warm" },
    { content: "Can't wait to meet your little lady. Congrats! 👗", category: "New Baby", tags: ["girl"], tone: "Warm" },
    { content: "Guns or glitter? Either way, congrats! 🔫✨", category: "New Baby", tags: ["gender-reveal", "funny"], tone: "Playful" },

    // --- SHORT & EXCITED (10) ---
    { content: "OMG! A baby! Congrats! 👶", category: "New Baby", tags: ["short"], tone: "Hype" },
    { content: "So tiny! So cute! Congrats! 🥺", category: "New Baby", tags: ["short"], tone: "Adoring" },
    { content: "Welcome, little one! 👋", category: "New Baby", tags: ["short"], tone: "Welcoming" },
    { content: "Congrats on the new addition! ➕", category: "New Baby", tags: ["short"], tone: "Happy" },
    { content: "Best news ever! Congrats! 📰", category: "New Baby", tags: ["short"], tone: "Excited" },
    { content: "Hello, baby! 👋", category: "New Baby", tags: ["short"], tone: "Cute" },
    { content: "Aww, congratulations! ❤️", category: "New Baby", tags: ["short"], tone: "Warm" },
    { content: "Enjoy every second. Congrats. ⏳", category: "New Baby", tags: ["advice"], tone: "Sincere" },
    { content: "Love the name! Congrats! 🏷️", category: "New Baby", tags: ["name"], tone: "Compliment" },
    { content: "Yay! A baby! 🎉", category: "New Baby", tags: ["short"], tone: "Simple" }
];
