// --- USER & AUTH ---
export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isPremium: boolean;
    stripeCustomerId?: string;
    createdAt: string;
}

// --- FREE MESSAGE LIBRARY ---
export interface PublicMessage {
    id: string;
    content: string;
    category: string; // Birthday, Anniversary, etc.
    tags: string[];
    tone?: "Casual" | "Neutral" | "Professional" | "Warm" | "Witty" | "Sincere" | "Humorous" | "Supportive" | "Playful" | "Trendy" | "Sarcastic" | "Empowering" | "Practical" | "Romantic" | "Grateful" | "Somber" | "Festive" | "Celebratory" | "Sarcastic-Affectionate" | "Cheeky" | "Stoic" | "Firm" | "Complimentary" | "Affectionate" | "Respectful" | string;
    source?: string; // e.g. "Reddit r/funny"
    likes: number;
}

// We also keep the generic Message type for compatibility if needed, 
// or alias it to PublicMessage for now.
export type Message = PublicMessage;

// --- CRM & CONTACTS ---
export type RelationshipType = "Friend" | "Family" | "Partner" | "Colleague" | "Other";

export interface Contact {
    id: string;
    userId: string;
    name: string;
    relationship: RelationshipType;
    birthdate?: string; // ISO date YYYY-MM-DD
    anniversary?: string;
    notes?: string;
    tags?: string[]; // e.g. "Loves Hiking", "Dog Person"
    lastContactedAt?: string;
    createdAt: string;
}

// --- CRM MESSAGES (Drafts & History) ---
export interface CRMMessage {
    id: string;
    userId: string;
    contactId: string;
    content: string; // The generated or sent message
    category: string;
    tone: string;
    emotionIntensity: number; // 1-10
    status: "draft" | "sent" | "scheduled";
    scheduledFor?: string;
    sentAt?: string;
    confidenceScore?: number; // AI safety score
    createdAt: string;
}

// --- BLOG & COMMUNITY ---
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Markdown
    author: string;
    coverImage?: string;
    tags: string[];
    publishedAt: string;
}
