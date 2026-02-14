export default function HealthPage() {
    return (
        <div className="p-10 font-bold text-2xl text-green-500">
            System Status: OPERATIONAL
            <br />
            Process Env Check: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Supabase Configured" : "Supabase Missing"}
        </div>
    );
}
