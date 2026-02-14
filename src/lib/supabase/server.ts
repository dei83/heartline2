import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
    const cookieStore = await cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // CRITICAL: Final safety net for Vercel build phase.
    // If env vars are missing (which happens during static generation), we MUST NOT crash.
    // We return a "dummy" client that does nothing but return null/error, so the build can finish.
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase credentials missing in createServerClient. Returning mock client to prevent crash.");
        return {
            from: () => ({
                select: () => ({
                    eq: () => ({
                        single: () => ({ data: null, error: { message: "Supabase not configured (mock)" } }),
                        order: () => ({ data: [], error: { message: "Supabase not configured (mock)" } }),
                    }),
                    order: () => ({ data: [], error: { message: "Supabase not configured (mock)" } }),
                }),
            }),
            auth: {
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            }
        } as any;
    }

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
