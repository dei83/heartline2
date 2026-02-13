import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    console.log("[AdminLayout] User Check:", {
        hasUser: !!user,
        email: user?.email,
        error: error?.message
    });

    if (!user) {
        console.log("[AdminLayout] Redirecting to /login due to missing user");
        redirect("/login");
    }

    return (
        <div className="flex h-screen bg-muted/30 flex-col md:flex-row">
            <AdminSidebar userEmail={user.email} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
                {children}
            </main>
        </div>
    );
}
