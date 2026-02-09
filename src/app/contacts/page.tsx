import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getContactsServer } from "@/lib/data/contacts-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ContactsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const contacts = await getContactsServer(user.id);

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your relationships and important dates.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search contacts..."
                            className="pl-9 w-full rounded-lg bg-background"
                        />
                    </div>
                    <Button asChild>
                        <Link href="/contacts/new">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Contact
                        </Link>
                    </Button>
                </div>
            </div>

            {contacts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-dashed">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                        <UserPlus size={24} />
                    </div>
                    <h3 className="text-lg font-semibold">No contacts yet</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
                        Add your first contact to start tracking birthdays, anniversaries, and more.
                    </p>
                    <Button asChild>
                        <Link href="/contacts/new">Add Compadre</Link>
                    </Button>
                </div>
            ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {contacts.map((contact) => (
                            <div key={contact.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <Link href={`/contacts/${contact.id}`} className="flex items-center gap-4 flex-1">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} />
                                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{contact.name}</h3>
                                        <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                                    </div>
                                    <div className="hidden md:flex gap-2">
                                        {contact.tags?.map(tag => (
                                            <span key={tag} className="text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
