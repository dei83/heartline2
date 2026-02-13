export const MESSAGE_GROUPS = [
    {
        name: "Celebrations",
        shortName: "Celebrations",
        description: "Mark life's big moments with joy.",
        icon: "Gift",
        color: "bg-pink-50 text-pink-600",
        categories: [
            { name: "Happy Birthday", value: "Birthday" },
            { name: "Anniversary", value: "Anniversary" },
            { name: "Wedding & Engagement", value: "Wedding" },
            { name: "New Baby & Gender Reveal", value: "New Baby" },
            { name: "Graduation", value: "Graduation" },
            { name: "New Home", value: "New Home" },
            { name: "Religious Milestones", value: "Religious Milestone" },
        ]
    },
    {
        name: "Love & Connection",
        shortName: "Love",
        description: "Strengthen bonds with heartfelt words.",
        icon: "Heart",
        color: "bg-red-50 text-red-600",
        categories: [
            { name: "Thank You", value: "Thank You" },
            { name: "Thinking of You", value: "Thinking of You" },
            { name: "Love You", value: "Love You" },
            { name: "Friendship", value: "Friendship" },
            { name: "I Miss You", value: "Miss You" },
            { name: "Just Because", value: "Just Because" },
            { name: "Long Distance", value: "Long Distance" },
        ]
    },
    {
        name: "Support & Comfort",
        shortName: "Support",
        description: "Offer kindness when it's needed most.",
        icon: "HandHeart",
        color: "bg-blue-50 text-blue-600",
        categories: [
            { name: "Sympathy", value: "Sympathy" },
            { name: "Pet Sympathy", value: "Pet Sympathy" },
            { name: "Get Well Soon", value: "Get Well Soon" },
            { name: "Encouragement", value: "Encouragement" },
            { name: "Apologies", value: "Apology" },
            { name: "Breakups", value: "Breakup" },
        ]
    },
    {
        name: "Work & Life",
        shortName: "Work",
        description: "Professional and social etiquette.",
        icon: "Briefcase",
        color: "bg-slate-50 text-slate-600",
        categories: [
            { name: "New Job", value: "New Job" },
            { name: "Workplace Appreciation", value: "Workplace Appreciation" },
            { name: "Work Anniversary", value: "Work Anniversary" },
            { name: "Retirement", value: "Retirement" },
            { name: "Goodbye & Good Luck", value: "Goodbye" },
            { name: "Professional", value: "Professional" }
        ]
    }
];

export const messageCategories = {
    popular: MESSAGE_GROUPS[0].categories,
    other: [
        ...MESSAGE_GROUPS[1].categories,
        ...MESSAGE_GROUPS[2].categories,
        ...MESSAGE_GROUPS[3].categories
    ]
};
