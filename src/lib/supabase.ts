import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and keys from environment variables
// SECURITY: Never hardcode credentials - they will be exposed in client-side code
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate configuration - fail fast if required variables are missing
if (!supabaseUrl) {
    const error = '❌ CRITICAL: Supabase URL is not configured. Please set VITE_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in your .env.local file';
    console.error(error);
    if (typeof window !== 'undefined') {
        throw new Error(error);
    }
}

if (!supabaseAnonKey) {
    const error = '❌ CRITICAL: Supabase anon key is not configured. Please set VITE_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in your .env.local file';
    console.error(error);
    if (typeof window !== 'undefined') {
        throw new Error(error);
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WaitlistEntry = {
    full_name: string;
    email: string;
    company_name: string;
    website: string;
    company_size: string;
    role: string;
    pain_points: string[];
};
