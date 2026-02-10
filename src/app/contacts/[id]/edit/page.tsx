import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ContactForm } from "@/components/contacts/ContactForm";
import { Contact } from "@/types";

export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { id } = await params;

    // Fetch contact data to pre-fill form
    const { data: contact, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (error || !contact) {
        notFound();
    }

    // Map to camelCase for the form
    const mappedContact: Contact = {
        id: contact.id,
        userId: contact.user_id,
        name: contact.name,
        relationship: contact.relationship,
        birthdate: contact.birthdate,
        anniversary: contact.anniversary,
        notes: contact.notes,
        tags: contact.tags || [],
        lastContactedAt: contact.last_contacted_at,
        createdAt: contact.created_at
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Edit Contact</h1>
            <ContactForm userId={user.id} initialData={mappedContact} />
        </div>
    );
}
