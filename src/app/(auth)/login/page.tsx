"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const { signInWithGoogle, user } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const router = useRouter();

    // If already logged in, redirect
    if (user) {
        router.push("/dashboard");
        return null;
    }

    const handleGoogleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg border border-border">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your CRM, saved messages, and calendar.
                    </p>
                </div>

                <div className="mt-8">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isSigningIn}
                        className="flex w-full justify-center items-center gap-2 rounded-md bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isSigningIn ? <Loader2 className="animate-spin h-5 w-5" /> : (
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                    d="M12.0003 20.41c1.65 0 3.3-.42 4.77-1.29l3.47 2.01c-2.34 1.41-5.11 2.05-7.94 1.76-4.35-.44-7.85-3.93-8.29-8.28-.44-4.35 2.48-8.31 6.56-9.58 3.03-.94 6.27-.2 8.65 1.57l-2.09 3.63c-1.35-1.01-3.18-1.27-4.78-.63-2.6 1.04-3.93 4.07-2.68 6.75 1.05 2.27 3.58 3.51 6.05 2.97 1.45-.32 2.65-1.29 3.29-2.65h-3.32v-3.76h7.17c.1.72.15 1.47.15 2.23 0 4.88-3.4 8.78-8.2 9.27z"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                        {isSigningIn ? "Signing in..." : "Sign in with Google"}
                    </button>
                </div>

                <div className="text-center text-xs text-muted-foreground mt-4">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>
        </div>
    );
}
