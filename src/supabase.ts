import { createClient } from '@supabase/supabase-js'

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

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseInstance;
})();

// Create Supabase admin client for server-side operations (use with caution)
export const supabaseAdmin = (() => {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return supabaseAdminInstance;
})();

// Test connection (only once)
let connectionTested = false;
if (!connectionTested) {
  connectionTested = true;
  supabase.from('user_profiles').select('count').limit(1).then(() => {
    console.log('✅ Supabase connection successful');
  }).catch((error) => {
    console.error('❌ Supabase connection failed:', error.message);
  });
}

export default supabase 