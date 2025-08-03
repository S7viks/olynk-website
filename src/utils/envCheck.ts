// Environment Variables Check Utility
export const checkEnvironmentVariables = () => {
  const envVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_SUPABASE_SERVICE_KEY: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
  };

  console.log('🔧 Environment Variables Check:');
  console.log('VITE_SUPABASE_URL:', envVars.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('VITE_SUPABASE_ANON_KEY:', envVars.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
  console.log('VITE_SUPABASE_SERVICE_KEY:', envVars.VITE_SUPABASE_SERVICE_KEY ? '✅ Set' : '❌ Missing');

  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value || value === 'undefined')
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars);
    return false;
  }

  console.log('✅ All environment variables are set');
  return true;
};

export default checkEnvironmentVariables; 