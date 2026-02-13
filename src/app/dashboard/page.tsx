import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Timeline } from "@/components/dashboard/Timeline";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { getDashboardStats, getUpcomingEventsServer } from "@/lib/data/contacts-server";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log("Dashboard: No user found, redirecting to login");
        redirect("/login");
    }

    console.log("Dashboard: User authenticated", user.id);

    // Fetch data in parallel
    const [stats, events] = await Promise.all([
        getDashboardStats(user.id),
        getUpcomingEventsServer(user.id)
    ]);

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl">
            <DashboardHeader stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Timeline (2/3 width) */}
                <div className="md:col-span-2 space-y-8">
                    <Timeline events={events} />
                </div>

                {/* Right Column: Quick Actions & Other widgets (1/3 width) */}
                <div className="space-y-8">
                    <QuickActions />

                    {/* Admin Tools (Visible to all in dev mode for testing) */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Admin Tools</h3>
                        <a
                            href="/admin/messages"
                            className="block w-full text-center py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium mb-2"
                        >
                            Manage Content Engine →
                        </a>
                        <a
                            href="/admin/blog"
                            className="block w-full text-center py-2 px-4 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                            Manage Blog Posts →
                        </a>
                        <a
                            href="/admin/research"
                            className="block w-full text-center py-2 px-4 bg-orange-50 text-orange-900 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium mt-2"
                        >
                            Research Hub (New) →
                        </a>
                    </div>

                    {/* Placeholder for future widgets like "Relationship Health" */}
                    <div className="bg-gradient-to-br from-rose-100 to-indigo-100 dark:from-rose-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-rose-200 dark:border-rose-900/50">
                        <h3 className="font-semibold text-rose-900 dark:text-rose-100 mb-2">Did you know?</h3>
                        <p className="text-sm text-rose-800 dark:text-rose-200/80">
                            Regular check-ins (even just a text!) strengthen relationships by 40%. Send a message today!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
