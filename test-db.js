const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
    console.log("Testing DB connection...");
    const { data, error } = await supabase.from('articles').select('count', { count: 'exact', head: true });
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Success! Count:", data); // data might be null for head:true with count, use distinct count
        // Actually count is in the return object property 'count' usually
    }
    // Full select
    const { data: full, error: fullError } = await supabase.from('articles').select('id, title').limit(1);
    console.log("Full Select:", fullError ? fullError : full);
}

test();
