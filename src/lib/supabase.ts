import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and keys from environment variables
// SECURITY: Never hardcode credentials - they will be exposed in client-side code
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder that warns when features requiring Supabase are used
const createPlaceholderClient = () => {
    return new Proxy({} as any, {
        get: () => {
            console.warn('⚠️ Supabase is not configured. Database features will not work. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
            return () => Promise.reject(new Error('Supabase not configured'));
        }
    });
};

// Only create real client if credentials are available, otherwise use placeholder
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createPlaceholderClient();

// Helper to check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase not configured. Some features (waitlist, contact forms) will be disabled.');
}

export type WaitlistEntry = {
    full_name: string;
    email: string;
    company_name: string;
    website: string;
    company_size: string;
    role: string;
    pain_points: string[];
};
