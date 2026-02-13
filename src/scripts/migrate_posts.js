
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        console.log('Loading env from:', envPath);
        if (!fs.existsSync(envPath)) {
            console.error('.env.local file not found at:', envPath);
            return {};
        }
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const firstEquals = line.indexOf('=');
            if (firstEquals !== -1) {
                const key = line.substring(0, firstEquals).trim();
                let value = line.substring(firstEquals + 1).trim();
                // Remove surrounding quotes if they exist
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                envVars[key] = value;
            }
        });
        return envVars;
    } catch (e) {
        console.error('Error loading .env.local', e);
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables. url:', !!supabaseUrl, 'key:', !!supabaseServiceKey);
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
            id: post.id,
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
