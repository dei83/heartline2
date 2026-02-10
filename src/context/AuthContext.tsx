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

    const supabase = createClient();

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            try {
                // If not configured, just stop loading
                if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                    console.log("Supabase not configured. Running in offline/demo mode.");
                    setLoading(false);
                    return;
                }

                const { data: { session } } = await supabase.auth.getSession();
                await handleSession(session);
            } catch (error) {
                console.error("Session check failed", error);
                setLoading(false);
            }
        };

        getSession();

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            await handleSession(session);
            router.refresh();
        });

        return () => subscription.unsubscribe();
    }, [router]);

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
