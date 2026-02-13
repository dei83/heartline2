"use client";

import Link from "next/link";
import { LayoutDashboard, MessageSquare, FileText, Database, Settings, LogOut, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Trigger & Sidebar */}
            <div className="md:hidden">
                <div className="fixed top-0 left-0 right-0 bg-white border-b p-4 flex items-center justify-between z-50">
                    <Link href="/admin" className="font-bold text-lg text-primary">
                        Admin Panel
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Mobile Drawer */}
                <aside className={`
                    fixed inset-y-0 left-0 bg-white border-r shadow-lg flex flex-col z-50 w-64 transition-transform duration-300 mt-16
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <NavContent userEmail={userEmail} onItemClick={() => setIsOpen(false)} />
                </aside>
            </div>

            {/* Desktop Sidebar (Static) */}
            <aside className="hidden md:flex w-64 bg-white border-r flex-col h-screen sticky top-0">
                <div className="p-6 border-b">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <LayoutDashboard className="w-6 h-6" />
                        <span>Admin</span>
                    </Link>
                </div>
                <NavContent userEmail={userEmail} />
            </aside>
        </>
    );
}

function NavContent({ userEmail, onItemClick }: { userEmail?: string, onItemClick?: () => void }) {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const navItems = [
        { href: "/admin/messages", label: "Message Staging", icon: MessageSquare },
        { href: "/admin/messages/library", label: "Message Library", icon: Database },
        { href: "/admin/blog", label: "Blog Posts", icon: FileText },
        { href: "/admin/research", label: "Research Hub", icon: Search },
    ];

    return (
        <div className="flex flex-col flex-1 h-full bg-card">
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="px-3 mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Content
                </div>

                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onItemClick}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive(item.href)
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <item.icon className={`w-4 h-4 ${isActive(item.href) ? "text-primary" : "text-muted-foreground/70"}`} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border/50 bg-muted/20">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm ring-2 ring-background">
                        {userEmail?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate text-foreground">{userEmail}</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                </div>
                <form action="/auth/signout" method="post">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    );
}
