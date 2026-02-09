import { createClient } from "@/lib/supabase/client";
import { Contact } from "@/types";

export async function getContacts(userId: string): Promise<Contact[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }

    return data.map(mapContact);
}

export async function getUpcomingEvents(userId: string, days: number = 30): Promise<{ contact: Contact, type: 'birthday' | 'anniversary', date: string, daysAway: number }[]> {
    const contacts = await getContacts(userId);
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + days);

    const upcoming: { contact: Contact, type: 'birthday' | 'anniversary', date: string, daysAway: number }[] = [];

    contacts.forEach(contact => {
        if (contact.birthdate) {
            checkDate(contact, 'birthday', contact.birthdate, today, days, upcoming);
        }
        if (contact.anniversary) {
            checkDate(contact, 'anniversary', contact.anniversary, today, days, upcoming);
        }
    });

    return upcoming.sort((a, b) => a.daysAway - b.daysAway);
}

function checkDate(contact: Contact, type: 'birthday' | 'anniversary', dateStr: string, today: Date, limitDays: number, list: any[]) {
    const date = new Date(dateStr);
    const currentYear = today.getFullYear();

    // Check for this year
    let nextDate = new Date(currentYear, date.getMonth(), date.getDate());

    // If passed, check next year
    if (nextDate < today) {
        nextDate = new Date(currentYear + 1, date.getMonth(), date.getDate());
    }

    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays <= limitDays) {
        list.push({
            contact,
            type,
            date: nextDate.toISOString().split('T')[0],
            daysAway: diffDays
        });
    }
}

function mapContact(row: any): Contact {
    return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        relationship: row.relationship,
        birthdate: row.birthdate,
        anniversary: row.anniversary,
        notes: row.notes,
        tags: row.tags || [],
        lastContactedAt: row.last_contacted_at,
        createdAt: row.created_at
    };
}
