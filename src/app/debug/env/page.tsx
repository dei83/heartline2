'use client';

import { useEffect, useState } from 'react';

export default function DebugEnvPage() {
    const [env, setEnv] = useState<Record<string, string | boolean>>({});

    useEffect(() => {
        setEnv({
            NEXT_PUBLIC_SUPABASE_URL_EXISTS: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            NEXT_PUBLIC_SUPABASE_URL_VALUE: process.env.NEXT_PUBLIC_SUPABASE_URL ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10)}...` : 'MISSING',
            NEXT_PUBLIC_SUPABASE_ANON_KEY_EXISTS: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            NEXT_PUBLIC_SUPABASE_ANON_KEY_VALUE: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...` : 'MISSING',
            NODE_ENV: process.env.NODE_ENV || 'unknown',
        });
    }, []);

    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
            <h1>Diagnostic: Environment Variables</h1>
            <p>This page checks if the browser can see the REQUIRED Supabase variables.</p>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
                {JSON.stringify(env, null, 2)}
            </pre>
            <div style={{ marginTop: '2rem' }}>
                <h3>Next Steps:</h3>
                <ul>
                    {(!env.NEXT_PUBLIC_SUPABASE_URL_EXISTS || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY_EXISTS) ? (
                        <li style={{ color: 'red', fontWeight: 'bold' }}>
                            ERROR: Variables are MISSING. Please check Vercel Settings - Environment Variables.
                            Ensure "Production" is checked and names are EXACTLY as shown above.
                        </li>
                    ) : (
                        <li style={{ color: 'green' }}>
                            SUCCESS: Browser can see the variables. If you still see errors, check Supabase RLS policies.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
