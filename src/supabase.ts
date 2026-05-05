import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and keys from environment variables
// SECURITY: Never hardcode credentials - they will be exposed in client-side code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// Create a placeholder that warns when features requiring Supabase are used
const createPlaceholderClient = () => {
  return new Proxy({} as any, {
    get: () => {
      console.warn('⚠️ Supabase is not configured. Database features will not work. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      return () => Promise.reject(new Error('Supabase not configured'));
    }
  });
};

// Create Supabase client for client-side operations (singleton)
let supabaseInstance: ReturnType<typeof createClient> | null = null;
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  // Only create real client if credentials are available
  if (!supabaseUrl || !supabaseAnonKey) {
    return createPlaceholderClient();
  }

  if (!supabaseInstance) {
    // Check if already initialized globally
    if (typeof window !== 'undefined' && (window as any).__SUPABASE_CLIENT_INSTANCE__) {
      supabaseInstance = (window as any).__SUPABASE_CLIENT_INSTANCE__;
      return supabaseInstance;
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Ephemeral sessions: forget on reload, require sign-in again.
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: true,
        storage: undefined
      }
    });

    // Note: no global/window caching; keep auth ephemeral.
  }
  return supabaseInstance;
}

function getSupabaseAdminClient() {
  // Only create real admin client if credentials are available
  if (!supabaseUrl || !supabaseServiceKey) {
    return createPlaceholderClient();
  }

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