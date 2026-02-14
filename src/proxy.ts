import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy
 * Refined for maximum stability on Vercel
 */
export async function proxy(request: NextRequest) {
    // 1. Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 2. Comprehensive check for missing or invalid variables
    const isMissing = !supabaseUrl || !supabaseAnonKey ||
        supabaseUrl === "undefined" || supabaseAnonKey === "undefined" ||
        supabaseUrl === "" || supabaseAnonKey === "";

    if (isMissing) {
        // Log the specific issue for Vercel logs
        console.warn("Proxy: [Critical] Supabase configuration is missing or invalid on Vercel.");
        console.warn(`Proxy: URL present: ${!!supabaseUrl}, Key present: ${!!supabaseAnonKey}`);

        // Return early with next response to avoid crashing the whole site
        return NextResponse.next()
    }

    try {
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        })

        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                request.cookies.set(name, value)
                            )
                            response = NextResponse.next({
                                request: {
                                    headers: request.headers,
                                },
                            })
                            cookiesToSet.forEach(({ name, value, options }) =>
                                response.cookies.set(name, value, options)
                            )
                        } catch (e) {
                            // If cookie setting fails, just proceed
                            console.error("Proxy: cookie set error", e)
                        }
                    },
                },
            }
        )

        // 3. Safe Refresh session
        // Using a try-catch specifically for the auth check to prevent 500
        try {
            await supabase.auth.getUser()
        } catch (authError) {
            console.error("Proxy: Auth session refresh failed:", authError)
        }

        return response
    } catch (e) {
        // 4. Catch-all for initialization or other runtime errors
        console.error("Proxy: unexpected execution error:", e)
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public folder)
         * - api (skip API routes to avoid potential loops or overhead)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
