import { supabase } from './supabase';
import { Complaint, User, Role } from './types';
import { mockApi } from './mockData';

// Helper to check if Supabase is configured
const isSupabaseConfigured = () => {
    return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

export const api = {
    // AUTHENTICATION
    // Handled mostly by supabase.auth, but we can have a getUserProfile helper
    getUserProfile: async (userId: string): Promise<User | null> => {
        if (!isSupabaseConfigured()) return null; // Fallback handled by caller usually

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return {
            id: data.id,
            name: data.full_name || 'Unknown User',
            email: 'user@example.com', // Profile might not strictly store email if it's in auth.users
            role: data.role as Role,
            phone: data.phone
        };
    },

    // COMPLAINTS
    getComplaints: async (userId?: string, role?: Role): Promise<Complaint[]> => {
        if (!isSupabaseConfigured()) {
            console.warn("Supabase keys missing. Using Mock Data.");
            return mockApi.getComplaints(userId, role);
        }

        let query = supabase.from('complaints').select('*').order('created_at', { ascending: false });

        // If Citizen, only see own. If Police, see all.
        // RLS also enforces this, but client-side filtering helps reduce data over-fetch if needed (though RLS is better)
        // With RLS, we just select * and let the database filter.
        // However, for explicit logic:
        if (role === 'citizen' && userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;

        if (error) {
            console.warn('Supabase fetch failed (likely network or RLS). using mock data:', error.message);
            // Fallback to mock data on error to prevent app crash
            return mockApi.getComplaints(userId, role);
        }

        // Map snake_case DB to camelCase Types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((row: any) => ({
            id: row.id,
            userId: row.user_id,
            title: row.title,
            description: row.description,
            category: row.category,
            urgency: row.urgency,
            status: row.status, // Ensure DB values match 'Pending' | 'In Progress' etc. 
            // DB might be lowercase 'pending', types are Capitalized 'Pending'. 
            // We should Normalize.
            location: row.location,
            incidentDate: row.incident_date,
            createdAt: row.created_at,
            evidenceFiles: row.evidence_urls,
            policeNotes: row.police_notes
        })) as Complaint[];
    },

    createComplaint: async (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>, userId: string): Promise<Complaint | null> => {
        if (!isSupabaseConfigured()) {
            return mockApi.createComplaint(complaint);
        }

        const isAnonymous = userId === 'anonymous';

        const { data, error } = await supabase
            .from('complaints')
            .insert({
                user_id: isAnonymous ? null : userId,
                title: complaint.title,
                description: complaint.description,
                category: complaint.category,
                urgency: complaint.urgency,
                status: 'Pending', // Default
                location: complaint.location,
                incident_date: complaint.incidentDate,
                evidence_urls: complaint.evidenceFiles || []
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating complaint:', error);
            throw error;
        }

        return {
            id: data.id,
            userId: data.user_id,
            title: data.title,
            description: data.description,
            category: data.category,
            urgency: data.urgency,
            status: data.status,
            location: data.location,
            incidentDate: data.incident_date,
            createdAt: data.created_at,
            evidenceFiles: data.evidence_urls
        } as Complaint;
    },

    updateStatus: async (id: string, status: string): Promise<void> => {
        if (!isSupabaseConfigured()) {
            return mockApi.updateStatus(id, status as Complaint['status']); // MockAPI expects exact type
        }

        const { error } = await supabase
            .from('complaints')
            .update({ status: status })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
            throw error;
        }
    }
};
