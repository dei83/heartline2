
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
    console.log('Starting migration...');

    // 1. Fetch old posts
    const { data: posts, error: fetchError } = await supabase.from('posts').select('*');
    if (fetchError) {
        console.error('Error fetching posts:', fetchError);
        return;
    }

    console.log(`Found ${posts.length} posts to migrate.`);

    // 2. Insert into new articles table
    for (const post of posts) {
        const article = {
            id: post.id, // Keep ID to preserve links if possible, or let new ID gen if UUID conflict (but usually safe to keep)
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.content,
            featured_image_url: post.cover_image,
            status: post.published ? 'published' : 'draft',
            secondary_keywords: post.tags,
            published_at: post.published_at,
            created_at: post.created_at,
            updated_at: post.updated_at || new Date().toISOString(),
            // Defaults for new fields
            pillar: 'general',
            content_type: 'article',
            author: 'Admin'
        };

        const { error: insertError } = await supabase.from('articles').upsert(article);
        if (insertError) {
            console.error(`Failed to migrate post "${post.title}":`, insertError.message);
        } else {
            console.log(`Migrated: ${post.title}`);
        }
    }

    console.log('Migration complete!');
}

migrate();
