    -- Olynk Website Authentication Schema
    -- Run this in your Supabase SQL editor to add authentication tables

    -- ============================================================
    -- Multi-tenancy additions (tenants + memberships + onboarding)
    -- ============================================================

    -- Tenants Table (org/workspace)
    CREATE TABLE IF NOT EXISTS tenants (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Tenant Memberships Table
    CREATE TABLE IF NOT EXISTS tenant_memberships (
        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        PRIMARY KEY (tenant_id, user_id)
    );

    -- Tenant Onboarding (pilot routing + answers)
    CREATE TABLE IF NOT EXISTS onboarding_submissions (
        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE PRIMARY KEY,
        created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        answers JSONB NOT NULL DEFAULT '{}'::jsonb,
        pilot_key TEXT,
        pilot_routing JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

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

    -- If `user_profiles` already existed, ensure new columns are added.
    ALTER TABLE user_profiles
        ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL;

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

    -- User Sessions Table (for tracking login sessions)
    CREATE TABLE IF NOT EXISTS user_sessions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        ip_address INET,
        user_agent TEXT,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
    CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
    CREATE INDEX IF NOT EXISTS idx_user_profiles_tenant_id ON user_profiles(tenant_id);
    CREATE INDEX IF NOT EXISTS idx_waitlist_users_position ON waitlist_users(waitlist_position);
    CREATE INDEX IF NOT EXISTS idx_waitlist_users_priority ON waitlist_users(priority_level);
    CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
    CREATE INDEX IF NOT EXISTS idx_tenant_memberships_user_id ON tenant_memberships(user_id);
    CREATE INDEX IF NOT EXISTS idx_tenant_memberships_tenant_id ON tenant_memberships(tenant_id);

    -- Create updated_at trigger function (if not exists)
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Create triggers for updated_at
    DROP TRIGGER IF EXISTS update_tenants_updated_at ON tenants;
    CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_tenant_memberships_updated_at ON tenant_memberships;
    CREATE TRIGGER update_tenant_memberships_updated_at BEFORE UPDATE ON tenant_memberships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_onboarding_submissions_updated_at ON onboarding_submissions;
    CREATE TRIGGER update_onboarding_submissions_updated_at BEFORE UPDATE ON onboarding_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
    CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
    CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_waitlist_users_updated_at ON waitlist_users;
    CREATE TRIGGER update_waitlist_users_updated_at BEFORE UPDATE ON waitlist_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    -- Enable Row Level Security (RLS) policies

    -- Tenants RLS
    ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

    -- Authenticated users can create tenants (tenant name is non-sensitive)
    DROP POLICY IF EXISTS "Authenticated can create tenant" ON tenants;
    CREATE POLICY "Authenticated can create tenant" ON tenants
        FOR INSERT TO authenticated
        WITH CHECK (true);

    -- Users can view tenants they belong to
    DROP POLICY IF EXISTS "Members can view tenant" ON tenants;
    CREATE POLICY "Members can view tenant" ON tenants
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM tenant_memberships tm
                WHERE tm.tenant_id = tenants.id AND tm.user_id = auth.uid()
            )
        );

    -- Tenant Memberships RLS
    ALTER TABLE tenant_memberships ENABLE ROW LEVEL SECURITY;

    -- Users can create their own membership row (used during tenant bootstrap)
    DROP POLICY IF EXISTS "Users can create own membership" ON tenant_memberships;
    CREATE POLICY "Users can create own membership" ON tenant_memberships
        FOR INSERT TO authenticated
        WITH CHECK (user_id = auth.uid());

    -- Users can view memberships in tenants they belong to
    DROP POLICY IF EXISTS "Members can view tenant memberships" ON tenant_memberships;
    CREATE POLICY "Members can view tenant memberships" ON tenant_memberships
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM tenant_memberships tm
                WHERE tm.tenant_id = tenant_memberships.tenant_id AND tm.user_id = auth.uid()
            )
        );

    -- Onboarding submissions RLS
    ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

    -- Members can read onboarding for their tenant
    DROP POLICY IF EXISTS "Members can view tenant onboarding" ON onboarding_submissions;
    CREATE POLICY "Members can view tenant onboarding" ON onboarding_submissions
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM tenant_memberships tm
                WHERE tm.tenant_id = onboarding_submissions.tenant_id AND tm.user_id = auth.uid()
            )
        );

    -- Members can upsert/update onboarding for their tenant
    DROP POLICY IF EXISTS "Members can write tenant onboarding" ON onboarding_submissions;
    CREATE POLICY "Members can write tenant onboarding" ON onboarding_submissions
        FOR INSERT TO authenticated
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM tenant_memberships tm
                WHERE tm.tenant_id = onboarding_submissions.tenant_id AND tm.user_id = auth.uid()
            )
        );

    DROP POLICY IF EXISTS "Members can update tenant onboarding" ON onboarding_submissions;
    CREATE POLICY "Members can update tenant onboarding" ON onboarding_submissions
        FOR UPDATE TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM tenant_memberships tm
                WHERE tm.tenant_id = onboarding_submissions.tenant_id AND tm.user_id = auth.uid()
            )
        );

    -- User Profiles RLS
    ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

    -- Users can view their own profile
    DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
    CREATE POLICY "Users can view own profile" ON user_profiles
        FOR SELECT USING (auth.uid() = id);

    -- Users can update their own profile
    DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
    CREATE POLICY "Users can update own profile" ON user_profiles
        FOR UPDATE USING (auth.uid() = id);

    -- Users can insert their own profile (required for some bootstraps)
    DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
    CREATE POLICY "Users can insert own profile" ON user_profiles
        FOR INSERT WITH CHECK (auth.uid() = id);

    -- Admins can view all profiles
    DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
    CREATE POLICY "Admins can view all profiles" ON user_profiles
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM user_profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );

    -- Admins can update all profiles
    DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
    CREATE POLICY "Admins can update all profiles" ON user_profiles
        FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM user_profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );

    -- Admin Users RLS
    ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

    -- Admins can view admin users
    DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
    CREATE POLICY "Admins can view admin users" ON admin_users
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM user_profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );

    -- Admins can update admin users
    DROP POLICY IF EXISTS "Admins can update admin users" ON admin_users;
    CREATE POLICY "Admins can update admin users" ON admin_users
        FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM user_profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );

    -- Waitlist Users RLS
    ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

    -- Users can view their own waitlist data
    DROP POLICY IF EXISTS "Users can view own waitlist data" ON waitlist_users;
    CREATE POLICY "Users can view own waitlist data" ON waitlist_users
        FOR SELECT USING (auth.uid() = id);

    -- Admins can view all waitlist data
    DROP POLICY IF EXISTS "Admins can view all waitlist data" ON waitlist_users;
    CREATE POLICY "Admins can view all waitlist data" ON waitlist_users
        FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM user_profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );

    -- Admins can update waitlist data
    DROP POLICY IF EXISTS "Admins can update waitlist data" ON waitlist_users;
    CREATE POLICY "Admins can update waitlist data" ON waitlist_users
        FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM user_profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );

    -- User Sessions RLS
    ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

    -- Users can view their own sessions
    DROP POLICY IF EXISTS "Users can view own sessions" ON user_sessions;
    CREATE POLICY "Users can view own sessions" ON user_sessions
        FOR SELECT USING (auth.uid() = user_id);

    -- Admins can view all sessions
    DROP POLICY IF EXISTS "Admins can view all sessions" ON user_sessions;
    CREATE POLICY "Admins can view all sessions" ON user_sessions
        FOR SELECT USING (
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
        VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'waitlist');
        
        -- Create waitlist user entry
        INSERT INTO public.waitlist_users (id, waitlist_position)
        VALUES (NEW.id, (SELECT COALESCE(MAX(waitlist_position), 0) + 1 FROM public.waitlist_users));
        
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Trigger to create user profile on signup
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- Function to update last login
    CREATE OR REPLACE FUNCTION public.update_last_login()
    RETURNS TRIGGER AS $$
    BEGIN
        UPDATE public.user_profiles 
        SET last_login = NOW() 
        WHERE id = NEW.user_id;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Insert default admin user (you'll need to create this user in Supabase Auth first)
    -- Replace 'your-admin-email@example.com' with the actual admin email
    -- INSERT INTO user_profiles (id, email, full_name, role) 
    -- VALUES ('admin-user-id', 'your-admin-email@example.com', 'Admin User', 'admin')
    -- ON CONFLICT (id) DO UPDATE SET role = 'admin';

    -- Grant necessary permissions
    GRANT USAGE ON SCHEMA public TO anon, authenticated;
    GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
    GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated; 