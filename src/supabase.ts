import { createClient } from '@supabase/supabase-js'

// Global check to prevent multiple GoTrueClient instances
if (typeof window !== 'undefined' && (window as any).__SUPABASE_CLIENT_INITIALIZED__) {
  console.warn('⚠️ Supabase client already initialized, reusing existing instance');
}

// Get Supabase URL and keys from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY || 'your-service-key'

// Validate configuration
if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
  console.error('❌ Supabase URL not configured. Please set VITE_SUPABASE_URL in your .env.local file');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
  console.error('❌ Supabase anon key not configured. Please set VITE_SUPABASE_ANON_KEY in your .env.local file');
}

// Create Supabase client for client-side operations (singleton)
let supabaseInstance: ReturnType<typeof createClient> | null = null;
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
    
    // Mark as initialized globally
    if (typeof window !== 'undefined') {
      (window as any).__SUPABASE_CLIENT_INITIALIZED__ = true;
    }
  }
  return supabaseInstance;
}

function getSupabaseAdminClient() {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return supabaseAdminInstance;
}

export const supabase = getSupabaseClient();
export const supabaseAdmin = getSupabaseAdminClient();

// Test connection (only once)
let connectionTested = false;
if (!connectionTested && typeof window !== 'undefined') {
  connectionTested = true;
  // Use a more reliable test query
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful');
    }
  }).catch((error) => {
    console.error('❌ Supabase connection failed:', error.message);
  });
}

export default supabase 