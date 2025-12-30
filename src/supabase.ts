import { createClient } from '@supabase/supabase-js'

// Global check to prevent multiple GoTrueClient instances
if (typeof window !== 'undefined' && (window as any).__SUPABASE_CLIENT_INITIALIZED__) {
  console.warn('⚠️ Supabase client already initialized, reusing existing instance');
}

// Get Supabase URL and keys from environment variables
// SECURITY: Never hardcode credentials - they will be exposed in client-side code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// Validate configuration - fail fast if required variables are missing
if (!supabaseUrl) {
  const error = '❌ CRITICAL: VITE_SUPABASE_URL is not configured. Please set it in your .env.local file'
  console.error(error)
  if (typeof window !== 'undefined') {
    throw new Error(error)
  }
}

if (!supabaseAnonKey) {
  const error = '❌ CRITICAL: VITE_SUPABASE_ANON_KEY is not configured. Please set it in your .env.local file'
  console.error(error)
  if (typeof window !== 'undefined') {
    throw new Error(error)
  }
}

// Create Supabase client for client-side operations (singleton)
let supabaseInstance: ReturnType<typeof createClient> | null = null;
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabaseInstance) {
    // Check if already initialized globally
    if (typeof window !== 'undefined' && (window as any).__SUPABASE_CLIENT_INSTANCE__) {
      supabaseInstance = (window as any).__SUPABASE_CLIENT_INSTANCE__;
      return supabaseInstance;
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
      }
    });
    
    // Mark as initialized globally
    if (typeof window !== 'undefined') {
      (window as any).__SUPABASE_CLIENT_INITIALIZED__ = true;
      (window as any).__SUPABASE_CLIENT_INSTANCE__ = supabaseInstance;
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

// Test connection (only once) - with error boundary
let connectionTested = false;
if (!connectionTested && typeof window !== 'undefined') {
  connectionTested = true;
  // Use a more reliable test query with error boundary
  try {
    // Test connection if credentials are configured
    if (supabaseUrl && supabaseAnonKey) {
      console.log('🔧 Testing Supabase connection...');
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
  } catch (error) {
    console.error('❌ Supabase initialization error:', error);
  }
}

export default supabase 