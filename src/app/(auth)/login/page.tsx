"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const message = searchParams.get("message");

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
        } catch (err) {
            setError("Google login failed. Please try again.");
            setIsLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError(null);
        try {
            await signInWithEmail(email);
            setIsEmailSent(true);
        } catch (err: any) {
            setError(err.message || "Failed to send login link.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-500">
                                Heartline
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                        <p className="mt-2 text-gray-500">Sign in to your account</p>
                    </div>

                    {message && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {isEmailSent ? (
                        <div className="text-center space-y-4 p-6 bg-green-50 rounded-xl">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-green-900">Check your email</h3>
                            <p className="text-green-700">
                                We sent a magic link to <strong>{email}</strong>.<br />
                                Click the link to log in.
                            </p>
                            <button
                                onClick={() => setIsEmailSent(false)}
                                className="text-sm text-green-700 hover:underline mt-2"
                            >
                                Try a different email
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                        placeholder="you@example.com"
                                        disabled={isLoading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Send Magic Link
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google (Optional)
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative bg-gray-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
                <div className="relative h-full flex flex-col justify-end p-12 text-white">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-serif italic">
                            "The right words at the right time can change everything."
                        </p>
                        <footer className="text-sm font-medium text-gray-300">
                            &mdash; Heartline Team
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
