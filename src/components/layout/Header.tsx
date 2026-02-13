"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";
import { MESSAGE_GROUPS } from "@/data/categories";

export function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary tracking-tight">Heartline</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {MESSAGE_GROUPS.map((group) => (
                            <div key={group.name} className="relative group">
                                <button className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors focus:outline-none py-2">
                                    {group.shortName} <ChevronDown className="w-4 h-4" />
                                </button>

                                <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-left">
                                    <div className="py-2">
                                        <Link
                                            href={`/messages?group=${encodeURIComponent(group.name)}`}
                                            className="block px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-100"
                                        >
                                            All {group.shortName}
                                        </Link>

                                        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                            {group.categories.map((cat) => (
                                                <Link
                                                    key={cat.name}
                                                    href={`/messages?category=${encodeURIComponent(cat.value)}`}
                                                    className="block px-4 py-2 text-sm text-foreground/70 hover:bg-gray-50 hover:text-primary transition-colors truncate"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Blog Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors focus:outline-none py-2">
                                Blog <ChevronDown className="w-4 h-4" />
                            </button>

                            <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-left">
                                <div className="py-2">
                                    <Link href="/blog" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors font-semibold border-b border-gray-100">
                                        All Posts
                                    </Link>
                                    <Link href="/blog?tag=Psychology" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors">
                                        Psychology & Science
                                    </Link>
                                    <Link href="/blog?tag=Real Stories" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors">
                                        Real Stories
                                    </Link>
                                    <Link href="/blog?tag=Data Insights" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors">
                                        Data Insights (Reddit)
                                    </Link>
                                    <Link href="/blog?tag=Relationships" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors">
                                        Relationship Dynamics
                                    </Link>
                                    <Link href="/blog?tag=Culture" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-50 hover:text-primary transition-colors">
                                        Culture & Etiquette
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary">
                                Dashboard
                            </Link>
                            <div className="relative group">
                                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20">
                                    {user.user_metadata?.avatar_url ? (
                                        <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || "User"} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <User className="w-5 h-5" />
                                    )}
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-xl py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-2 border-b border-border/50">
                                        <p className="text-sm font-medium text-foreground truncate">{user.user_metadata?.full_name || "User"}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/80 hover:bg-muted/50 hover:text-primary transition-colors">
                                        <Settings className="w-4 h-4" /> Settings
                                    </Link>
                                    <button onClick={() => logout()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                                Sign In
                            </Link>
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Join Heartline
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
