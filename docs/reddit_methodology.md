# Reddit Research Methodology for Message Sourcing

## Why Reddit?
- **Authenticity:** Real words written by real people, not marketing copy.
- **Context:** Rich situational context (e.g., "I sent this to my boss...").
- **Validation:** Upvote/Downvote system acts as crowd-sourced quality control.

## Target Subreddits

### 🎂 Birthday / Gratitude / Relationships
- `r/AskReddit`
- `r/relationships`
- `r/relationship_advice`
- `r/TrueOffMyChest` (for deep emotion)
- `r/CasualConversation`

### 💼 Workplace / Professional
- `r/careerguidance`
- `r/jobs`
- `r/antiwork` (Use as "what NOT to say" or distinct boundaries)

### 😔 Grief / Comfort
- `r/GriefSupport`
- `r/offmychest`

## Selection Criteria

### ✅ Include
- **Questions:** "What should I say to..." (Look for top voted answers)
- **Success Stories:** "I sent this and they appreciated it"
- **Sharing:** "This is what I wrote to my boss..."

### ❌ Exclude
- Jokes / Memes
- Excessive Profanity
- Low-context one-liners
- Pure venting without constructiveness

## Extraction & Processing Strategy

### Step 1: Raw Collection
- Maintain original grammar/slang initially to preserve "human" feel.
- Do not over-polish.

### Step 2: Metadata Tagging
Structure each extracted message with:
```json
{
  "category": "Workplace Difficult", // mapped from subreddit/context
  "relationship": "Boss", 
  "intent": "Boundaries", 
  "emotional_intensity": "Medium",
  "risk_level": "Safe",
  "source_url": "https://reddit.com/r/...", 
  "upvotes": 1500
}
```

### Step 3: Pattern Extraction (The "Secret Sauce")

**1. Soft Openers (The Hook)**
- "Just wanted to say..."
- "I know this might not mean much, but..."
- "I'm not great with words, but..."
*Goal: Remove robotic/AI tone.*

**2. The Emotional Core**
- Focus on specific actions/qualities.
- "I really appreciate [X]."
- Avoid over-explaining feelings.

**3. Low-Pressure Closers**
- "Hope you have a great day."
- "Thinking of you."
- "No pressure to reply."
*Goal: Remove burden from the recipient.*

## Storage Format
**Do NOT store:** "Thank you for everything."
**Store as Pattern:**
```
[Soft Opener] + [Core Emotion] + [Low-Pressure Closer]
```
