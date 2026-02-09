import { createBrowserClient } from '@supabase/ssr'

export const isSupabaseConfigured = () => {
    return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export const createClient = () => {
    if (!isSupabaseConfigured()) {
        console.warn("Supabase is not configured. Using mock client or throwing error if used.");
        // Return a mock or throw, but for now we expect callers to check isSupabaseConfigured
        // To be safe against crashes, we return a minimal dummy if really needed, 
        // but it's better to let `createBrowserClient` handle it or pass empty strings 
        // which will cause connection errors (handled in try/catch).
        // Passing empty strings allows code to run but fail later.
        return createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
        )
    }
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
