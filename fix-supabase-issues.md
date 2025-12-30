# Fix Supabase Authentication Issues

## Issues Identified

1. **Multiple GoTrueClient instances** - Fixed in `src/supabase.ts`
2. **400 error on token endpoint** - Authentication configuration issue
3. **500 errors on user_profiles table** - Database schema or RLS policy issues

## Step-by-Step Fix

### 1. Database Setup (Run in Supabase SQL Editor)

First, ensure your database schema is properly set up. Run this in your Supabase SQL editor:

```sql
-- Drop existing tables if they exist (be careful with production data)
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS waitlist_users CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- User Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'waitlist' CHECK (role IN ('admin', 'waitlist', 'user')),
    company VARCHAR(255),
    position VARCHAR(255),
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (for admin-specific data)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    permissions JSONB DEFAULT '[]'::jsonb,
    can_manage_users BOOLEAN DEFAULT false,
    can_manage_content BOOLEAN DEFAULT false,
    can_view_analytics BOOLEAN DEFAULT true,
    can_manage_settings BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waitlist Users Table (for waitlist-specific data)
CREATE TABLE IF NOT EXISTS waitlist_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    waitlist_position INTEGER,
    priority_level VARCHAR(50) DEFAULT 'normal' CHECK (priority_level IN ('low', 'normal', 'high', 'vip')),
    expected_access_date DATE,
    referral_source VARCHAR(255),
    additional_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_users_position ON waitlist_users(waitlist_position);
CREATE INDEX IF NOT EXISTS idx_waitlist_users_priority ON waitlist_users(priority_level);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_waitlist_users_updated_at BEFORE UPDATE ON waitlist_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- User Profiles RLS Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON user_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow insert for authenticated users (for signup)
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin Users RLS Policies
CREATE POLICY "Admins can view admin users" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update admin users" ON admin_users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Waitlist Users RLS Policies
CREATE POLICY "Users can view own waitlist data" ON waitlist_users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all waitlist users" ON waitlist_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update waitlist users" ON waitlist_users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 'waitlist');
    
    -- Create waitlist user entry
    INSERT INTO public.waitlist_users (id, waitlist_position)
    VALUES (NEW.id, (SELECT COALESCE(MAX(waitlist_position), 0) + 1 FROM public.waitlist_users));
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
```

### 2. Environment Variables Check

Ensure your `.env.local` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_SERVICE_KEY=your-service-key-here
```

**⚠️ Get your actual credentials from:** https://supabase.com/dashboard/project/_/settings/api

### 3. Create Your First Admin User

1. **Sign up as a regular user** through your website
2. **Run this SQL in Supabase** to promote yourself to admin:

```sql
-- Replace 'your-email@example.com' with your actual email
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Create admin user record
INSERT INTO admin_users (id, permissions, can_manage_users, can_manage_content, can_view_analytics, can_manage_settings)
SELECT id, '["all"]'::jsonb, true, true, true, true
FROM user_profiles 
WHERE email = 'your-email@example.com';
```

### 4. Test the Fix

1. Clear your browser's local storage
2. Restart your development server
3. Try logging in again

### 5. Additional Debugging

If you still see errors, check the browser console for:
- Authentication errors
- Database permission errors
- Network request failures

The main fixes implemented:
- ✅ Fixed multiple GoTrueClient instances
- ✅ Improved singleton pattern
- ✅ Added proper storage configuration
- ✅ Provided complete database schema setup
- ✅ Fixed RLS policies

Run the database setup SQL first, then test your authentication flow. 