-- Olynk Database Setup Script
-- Run this in your Supabase SQL editor to fix authentication issues

-- Step 1: Drop existing tables if they exist (be careful with production data)
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS waitlist_users CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Step 2: Create User Profiles Table
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

-- Step 3: Create Admin Users Table
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

-- Step 4: Create Waitlist Users Table
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

-- Step 5: Create Indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_users_position ON waitlist_users(waitlist_position);
CREATE INDEX IF NOT EXISTS idx_waitlist_users_priority ON waitlist_users(priority_level);

-- Step 6: Create Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create Triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_waitlist_users_updated_at BEFORE UPDATE ON waitlist_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- Step 9: Create RLS Policies for User Profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

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

-- Step 10: Create RLS Policies for Admin Users
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

-- Step 11: Create RLS Policies for Waitlist Users
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

-- Step 12: Create Function to Handle New User Signup
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

-- Step 13: Create Trigger for New User Signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 14: Grant Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Step 15: Insert a test admin user (optional - replace with your email)
-- Uncomment and modify the lines below to create an admin user
-- INSERT INTO user_profiles (id, email, full_name, role) 
-- VALUES ('your-user-id-here', 'your-email@example.com', 'Admin User', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
-- 
-- INSERT INTO admin_users (id, permissions, can_manage_users, can_manage_content, can_view_analytics, can_manage_settings)
-- VALUES ('your-user-id-here', '["all"]'::jsonb, true, true, true, true)
-- ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully!' as status; 