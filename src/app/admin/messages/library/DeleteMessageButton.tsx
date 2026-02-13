"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteMessageButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm('Are you sure you want to delete this message? This cannot be undone.')) {
            return;
        }

        setIsDeleting(true);

        try {
            const res = await fetch('/api/admin/messages/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.error || 'Failed to delete message');
                setIsDeleting(false);
                return;
            }

            // Refresh the page to update the list
            router.refresh();
            setIsDeleting(false);
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting');
            setIsDeleting(false);
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <button
                type="submit"
                disabled={isDeleting}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-200 text-red-600 text-sm rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </form>
    );
}
