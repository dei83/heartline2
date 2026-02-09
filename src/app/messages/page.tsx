import { MessageCard } from "@/components/ui/MessageCard";
import { getPublicMessages } from "@/lib/data/public-messages";
import { PublicMessage } from "@/types";

interface MessagesPageProps {
    searchParams: Promise<{ category?: string; tone?: string }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
    const { category, tone } = await searchParams;

    const messages = await getPublicMessages(category, tone);

    const title = category ? `${category} Messages` : "All Messages";

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary-900">{title}</h1>
                    <p className="text-muted-foreground mt-2">
                        {messages.length} result{messages.length !== 1 && 's'} found
                        {tone && <span className="ml-1">with {tone} tone</span>}
                    </p>
                </div>

                <div className="flex gap-2 text-sm">
                    {/* Simple Filter Links for Demo */}
                    <a href="/messages" className={`px-3 py-1 rounded-full border ${!category ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200'}`}>All</a>
                    <a href="/messages?category=Birthday" className={`px-3 py-1 rounded-full border ${category === 'Birthday' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200'}`}>Birthday</a>
                    <a href="/messages?category=Thank You" className={`px-3 py-1 rounded-full border ${category === 'Thank You' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200'}`}>Thank You</a>
                    <a href="/messages?category=Sympathy" className={`px-3 py-1 rounded-full border ${category === 'Sympathy' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200'}`}>Sympathy</a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
            </div>

            {messages.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-lg">
                    <p className="text-lg text-muted-foreground">No messages found for this category.</p>
                    <p className="text-sm text-muted-foreground mt-2">Try checking back later or browsing all messages.</p>
                </div>
            )}
        </div>
    );
}
