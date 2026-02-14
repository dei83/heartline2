import { NextResponse, type NextRequest } from 'next/server'

/**
 * Minimal Proxy for troubleshooting
 */
export async function proxy(request: NextRequest) {
    // Purely passthrough to see if site boots up
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public folder)
         * - api (skip API routes)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
