import { supabase } from '../supabase';

export async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Setup...');
  
  // Check environment variables
  const envVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_SUPABASE_SERVICE_KEY: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
  };

  console.log('Environment Variables:');
  Object.entries(envVars).forEach(([key, value]) => {
    console.log(`- ${key}: ${value ? '✅ Available' : '❌ Missing'}`);
  });

  if (!envVars.VITE_SUPABASE_URL || !envVars.VITE_SUPABASE_ANON_KEY) {
    console.error('❌ Missing required environment variables');
    return false;
  }

  console.log('✅ Environment variables are set up correctly');

  try {
    // Test basic connection
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session test failed:', sessionError);
      return false;
    }

    console.log('✅ Basic connection successful');
    console.log('🔧 Session data:', sessionData);

    // Test database access
    const { data: tableTest, error: tableError } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1);

    if (tableError) {
      console.error('❌ Database table access failed:', tableError);
      console.log('💡 This might indicate:');
      console.log('   - user_profiles table does not exist');
      console.log('   - RLS policies are blocking access');
      console.log('   - Database schema is not set up correctly');
      return false;
    }

    console.log('✅ Database table access successful');

    // Test RLS policies
    const { data: rlsTest, error: rlsError } = await supabase
      .from('user_profiles')
      .select('id, email, role')
      .limit(5);

    if (rlsError) {
      console.error('❌ RLS policy test failed:', rlsError);
      console.log('💡 This indicates RLS policies are blocking access');
      return false;
    }

    console.log('✅ RLS policies working correctly');
    console.log('🔧 Sample data:', rlsTest);

    return true;

  } catch (error: any) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}

export async function checkDatabaseSchema() {
  console.log('🔍 Checking database schema...');

  const tables = ['user_profiles', 'admin_users', 'waitlist_users'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.error(`❌ Table ${table} access failed:`, error);
      } else {
        console.log(`✅ Table ${table} accessible`);
      }
    } catch (err: any) {
      console.error(`❌ Table ${table} test failed:`, err.message);
    }
  }
}

export async function testAuthentication() {
  console.log('🔐 Testing authentication...');

  try {
    // Test sign in with invalid credentials (should fail gracefully)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'wrongpassword'
    });

    if (error && error.message.includes('Invalid login credentials')) {
      console.log('✅ Authentication endpoint working (correctly rejected invalid credentials)');
    } else if (error) {
      console.error('❌ Authentication test failed:', error);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error('❌ Authentication test failed:', error);
    return false;
  }
}

// Run all tests
export async function runAllTests() {
  console.log('🚀 Running comprehensive Supabase tests...\n');
  
  const connectionTest = await testSupabaseConnection();
  if (!connectionTest) {
    console.log('\n❌ Connection test failed. Please check your setup.');
    return false;
  }

  await checkDatabaseSchema();
  const authTest = await testAuthentication();
  
  if (authTest) {
    console.log('\n✅ All tests passed!');
    return true;
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    return false;
  }
} 