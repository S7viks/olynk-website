import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bmfakoiiebmgsgdtimwdu.supabase.co'

// Anonymous client for client-side operations
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZmFrb2lpZWJtc2dkdGltd2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MjE4MDgsImV4cCI6MjA2OTI5NzgwOH0.z3sqY4qSnNXx2tYVkJu10KkQDWkXTi9cT8iilwnBB8w'

// Service role key for server-side operations (keep secure)
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZmFrb2lpZWJtc2dkdGltd2R1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzcyMTgwOCwiZXhwIjoyMDY5Mjk3ODA4fQ.dkPn-RLHV-hTkZiD1OUzRofwDH1N7U4FQOX8X9DieTk'

// Create Supabase client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create Supabase admin client for server-side operations (use with caution)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export default supabase 