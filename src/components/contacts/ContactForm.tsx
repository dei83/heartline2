"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Contact, RelationshipType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
    initialData?: Contact;
    userId: string;
}

const RELATIONSHIPS: RelationshipType[] = ["Friend", "Family", "Partner", "Colleague", "Other"];

export function ContactForm({ initialData, userId }: ContactFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        relationship: initialData?.relationship || "Friend",
        birthdate: initialData?.birthdate || "",
        anniversary: initialData?.anniversary || "",
        notes: initialData?.notes || "",
        tags: initialData?.tags?.join(", ") || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRelationshipChange = (value: string) => {
        setFormData({ ...formData, relationship: value as RelationshipType });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const contactData = {
            user_id: userId,
            name: formData.name,
            relationship: formData.relationship,
            birthdate: formData.birthdate || null,
            anniversary: formData.anniversary || null,
            notes: formData.notes,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            updated_at: new Date().toISOString(),
        };

        try {
            if (initialData) {
                const { error } = await supabase
                    .from("contacts")
                    .update(contactData)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("contacts")
                    .insert([contactData]);
                if (error) throw error;
            }

            router.push("/dashboard"); // Redirect to dashboard or contacts list
            router.refresh();
        } catch (err: any) {
            console.error("Error saving contact:", err);
            setError(err.message || "Failed to save contact");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl border shadow-sm">
            <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alice Smith"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="relationship">Relationship <span className="text-red-500">*</span></Label>
                <Select value={formData.relationship} onValueChange={handleRelationshipChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                        {RELATIONSHIPS.map(rel => (
                            <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthday</Label>
                    <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="anniversary">Anniversary</Label>
                    <Input
                        id="anniversary"
                        name="anniversary"
                        type="date"
                        value={formData.anniversary}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. High School, Hiking, Coffee"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Gift ideas, favorite things, etc."
                    rows={4}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Contact" : "Save Contact"}
                </Button>
            </div>
        </form>
    );
}
