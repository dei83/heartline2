// import Snoowrap from 'snoowrap';

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const USERNAME = process.env.REDDIT_USERNAME;
const PASSWORD = process.env.REDDIT_PASSWORD;

// let client: Snoowrap | null = null;
let client: any = null;

export function getRedditClient() {
    // TEMPORARY: Force mock mode due to build environment issues with snoowrap
    console.warn("Real Reddit Scraper disabled due to build environment issues. Using MOCK data.");
    return null as any;

    /*
    if (client) return client;

    if (!CLIENT_ID || !CLIENT_SECRET || !USERNAME || !PASSWORD) {
        console.warn("Reddit API credentials missing. Scraper will run in MOCK mode.");
        return null;
    }

    try {
        const Snoowrap = require('snoowrap');
        client = new Snoowrap({
            userAgent: 'heartline-crm-v1.0 (by /u/' + USERNAME + ')',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            username: USERNAME,
            password: PASSWORD
        });
    } catch (e) {
        console.error("Failed to load snoowrap", e);
        return null;
    }

    return client;
    */
}

export const MOCK_REDDIT_DATA = [
    {
        subreddit: "relationships",
        id: "mock_1",
        title: "[MOCK] My partner forgot our anniversary",
        selftext: "I feel so hurt because I dropped so many hints...",
        author: { name: "mock_user_1" },
        score: 150,
        num_comments: 45,
        created_utc: Date.now() / 1000
    },
    {
        subreddit: "careerguidance",
        id: "mock_2",
        title: "[MOCK] How to tell my boss I'm burnout?",
        selftext: "I've been working 60h weeks and I just can't take it anymore...",
        author: { name: "tired_dev" },
        score: 320,
        num_comments: 89,
        created_utc: Date.now() / 1000
    }
];
