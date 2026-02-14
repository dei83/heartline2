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

    useEffect(() => {
        // Initialize Supabase client ONLY inside useEffect to avoid SSR issues
        // and ensure we are in the browser environment
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

                // Listen for auth changes
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

        const cleanup = initAuth();
        // Since initAuth is async and returns a cleanup function via promise (which useEffect doesn't support directly for cleanup),
        // we handle subscription cleanup differently or accept that for a top-level provider it persists.
        // Simplified for stability: The listener is attached once.

    }, [router]);

    const handleSession = async (session: Session | null, supabase: any) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
            await fetchUserProfile(currentUser.id, supabase);
        } else {
            setUserProfile(null);
        }
        setLoading(false);
    };

    const fetchUserProfile = async (userId: string, supabase: any) => {
        try {
            const { data, error } = await supabase
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

    const handleSession = async (session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
            await fetchUserProfile(currentUser.id);
        } else {
            setUserProfile(null);
        }
        setLoading(false);
    };

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
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

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) console.error("Error logging in:", error);
    };

    const signInWithEmail = async (email: string) => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                // set this to false if you do not want the user to be automatically signed up
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
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, signInWithGoogle, signInWithEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
