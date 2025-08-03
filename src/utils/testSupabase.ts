// Test Supabase Setup Utility
export const testSupabaseSetup = () => {
  console.log('🧪 Testing Supabase Setup...');
  
  // Check if environment variables are available
  const hasUrl = !!import.meta.env.VITE_SUPABASE_URL;
  const hasAnonKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
  const hasServiceKey = !!import.meta.env.VITE_SUPABASE_SERVICE_KEY;
  
  console.log('Environment Variables:');
  console.log('- VITE_SUPABASE_URL:', hasUrl ? '✅ Available' : '❌ Missing');
  console.log('- VITE_SUPABASE_ANON_KEY:', hasAnonKey ? '✅ Available' : '❌ Missing');
  console.log('- VITE_SUPABASE_SERVICE_KEY:', hasServiceKey ? '✅ Available' : '❌ Missing');
  
  if (!hasUrl || !hasAnonKey) {
    console.error('❌ Missing required Supabase environment variables');
    console.log('📋 To fix this:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Create a new project or select existing');
    console.log('3. Go to Settings → API');
    console.log('4. Copy Project URL and anon key');
    console.log('5. Add to Vercel environment variables');
    return false;
  }
  
  console.log('✅ Environment variables are set up correctly');
  return true;
};

export default testSupabaseSetup; 