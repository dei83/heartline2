import { createClient } from "@/lib/supabase/server";
import { Contact } from "@/types";

export async function getContactsServer(userId: string): Promise<Contact[]> {
    const supabase = await createClient();

    // Check if we have a user (though userId is passed, we need the client to be auth'd? 
    // Actually createClient() in server.ts handles cookies, so it should be auth'd if the user is logged in)
    // But we are passing userId manually? 
    // The query `.eq('user_id', userId)` ensures we only get that user's data.
    // RLS will also enforce only getting own data if the client is auth'd.

    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching contacts (server):', error);
        return [];
    }

    return data.map(mapContact);
}

export async function getDashboardStats(userId: string) {
    const contacts = await getContactsServer(userId);
    const eventCount = await getUpcomingEventCount(contacts);

    return {
        contactCount: contacts.length,
        eventCount: eventCount
    };
}

// Reuse the logic? Or duplicate for now to avoid shared dependency issues between server/client?
// I'll duplicate the logic for simplicity and to keep server code isolated.
async function getUpcomingEventCount(contacts: Contact[], days: number = 30): Promise<number> {
    const today = new Date();
    let count = 0;

    contacts.forEach(contact => {
        if (contact.birthdate && isWithinDays(contact.birthdate, today, days)) count++;
        if (contact.anniversary && isWithinDays(contact.anniversary, today, days)) count++;
    });

    return count;
}

export async function getUpcomingEventsServer(userId: string, days: number = 30) {
    const contacts = await getContactsServer(userId);
    const today = new Date();
    const upcoming: any[] = [];

    contacts.forEach(contact => {
        if (contact.birthdate) {
            const daysAway = getDaysAway(contact.birthdate, today);
            if (daysAway !== null && daysAway <= days) {
                upcoming.push({ contact, type: 'birthday', date: getNextDate(contact.birthdate, today), daysAway });
            }
        }
        if (contact.anniversary) {
            const daysAway = getDaysAway(contact.anniversary, today);
            if (daysAway !== null && daysAway <= days) {
                upcoming.push({ contact, type: 'anniversary', date: getNextDate(contact.anniversary, today), daysAway });
            }
        }
    });

    return upcoming.sort((a, b) => a.daysAway - b.daysAway);
}

function getDaysAway(dateStr: string, today: Date): number | null {
    const date = new Date(dateStr);
    const currentYear = today.getFullYear();
    let nextDate = new Date(currentYear, date.getMonth(), date.getDate());

    if (nextDate < today) {
        // If today is past the date, check if it's strictly past.
        // If today is March 10, and bday is March 10, nextDate < today is false (it is equal time? No, today has time).
        // Let's reset time to 0 for accurate day comp.
        const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (nextDate < todayZero) {
            nextDate = new Date(currentYear + 1, date.getMonth(), date.getDate());
        }
    }

    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = nextDate.getTime() - todayZero.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 ? diffDays : null;
}

function getNextDate(dateStr: string, today: Date): string {
    const date = new Date(dateStr);
    const currentYear = today.getFullYear();
    let nextDate = new Date(currentYear, date.getMonth(), date.getDate());

    // Reset today time
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (nextDate < todayZero) {
        nextDate = new Date(currentYear + 1, date.getMonth(), date.getDate());
    }
    return nextDate.toISOString().split('T')[0];
}

function isWithinDays(dateStr: string, today: Date, limit: number): boolean {
    const d = getDaysAway(dateStr, today);
    return d !== null && d <= limit;
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
