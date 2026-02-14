import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase credentials missing in browser createClient. Returning mock.");
        return {
            auth: {
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                signInWithOAuth: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
                signInWithOtp: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
                signOut: () => Promise.resolve({ error: null }),
            },
            from: () => ({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
                    }),
                }),
            }),
        } as any;
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
