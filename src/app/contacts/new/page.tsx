import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ContactForm } from "@/components/contacts/ContactForm";

export default async function NewContactPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Add New Contact</h1>
            <ContactForm userId={user.id} />
        </div>
    );
}
