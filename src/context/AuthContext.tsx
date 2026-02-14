"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signInWithGoogle: async () => { },
    signInWithEmail: async () => { },
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Helper functions defined outside useEffect to be reusable, 
    // but they require a supabase instance passed to them to avoid top-level init
    const fetchUserProfile = async (userId: string, supabaseClient: any) => {
        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                setUserProfile(data as UserProfile);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleSession = async (session: Session | null, supabaseClient: any) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
            await fetchUserProfile(currentUser.id, supabaseClient);
        } else {
            setUserProfile(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        const initAuth = async () => {
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                console.log("Supabase not configured. Running in offline/demo mode.");
                setLoading(false);
                return;
            }

            const supabase = createClient();

            try {
                const { data: { session } } = await supabase.auth.getSession();
                await handleSession(session, supabase);

                const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
                    await handleSession(session, supabase);
                    router.refresh();
                });

                return () => subscription.unsubscribe();
            } catch (error) {
                console.error("Session check failed", error);
                setLoading(false);
            }
        };

        initAuth();
    }, [router]);

    const signInWithGoogle = async () => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) console.error("Error logging in:", error);
    };

    const signInWithEmail = async (email: string) => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    const logout = async () => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        setUserProfile(null);
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, signInWithGoogle, signInWithEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
