import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Timeline } from "@/components/dashboard/Timeline";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { getDashboardStats, getUpcomingEventsServer } from "@/lib/data/contacts-server";

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

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
