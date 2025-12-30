-- Olynk Website Database Setup
-- Run this in your Supabase SQL editor to create the necessary tables

-- Contact Forms Table
CREATE TABLE IF NOT EXISTS contact_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo Requests Table
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Signups Table
CREATE TABLE IF NOT EXISTS newsletter_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS ai_newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(255),
    industry VARCHAR(255),
    ai_interests TEXT[], -- Array of AI topics they're interested in
    subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'unsubscribed')),
    email_frequency VARCHAR(50) DEFAULT 'weekly' CHECK (email_frequency IN ('daily', 'weekly', 'monthly')),
    source VARCHAR(100) DEFAULT 'website', -- How they signed up
    preferences JSONB, -- Additional preferences as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_email_sent TIMESTAMP WITH TIME ZONE,
    email_opens INTEGER DEFAULT 0,
    email_clicks INTEGER DEFAULT 0
);

-- Early Access Requests Table
CREATE TABLE IF NOT EXISTS early_access_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    industry VARCHAR(255),
    company_size VARCHAR(100),
    use_case TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(100) DEFAULT 'early-access-form'
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist, then recreate them
DROP TRIGGER IF EXISTS update_contact_forms_updated_at ON contact_forms;
DROP TRIGGER IF EXISTS update_demo_requests_updated_at ON demo_requests;
DROP TRIGGER IF EXISTS update_early_access_requests_updated_at ON early_access_requests;
DROP TRIGGER IF EXISTS update_ai_newsletter_subscriptions_updated_at ON ai_newsletter_subscriptions;

-- Create triggers for updated_at
CREATE TRIGGER update_contact_forms_updated_at BEFORE UPDATE ON contact_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_demo_requests_updated_at BEFORE UPDATE ON demo_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_early_access_requests_updated_at BEFORE UPDATE ON early_access_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_newsletter_subscriptions_updated_at BEFORE UPDATE ON ai_newsletter_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) policies
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_access_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert on contact_forms" ON contact_forms;
DROP POLICY IF EXISTS "Allow public insert on demo_requests" ON demo_requests;
DROP POLICY IF EXISTS "Allow public insert on newsletter_signups" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow public insert on ai_newsletter_subscriptions" ON ai_newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow public insert on early_access_requests" ON early_access_requests;

DROP POLICY IF EXISTS "Allow authenticated users to view contact_forms" ON contact_forms;
DROP POLICY IF EXISTS "Allow authenticated users to view demo_requests" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated users to view newsletter_signups" ON newsletter_signups;
DROP POLICY IF EXISTS "Allow authenticated users to view ai_newsletter_subscriptions" ON ai_newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow authenticated users to view early_access_requests" ON early_access_requests;

DROP POLICY IF EXISTS "Allow authenticated users to update contact_forms" ON contact_forms;
DROP POLICY IF EXISTS "Allow authenticated users to update demo_requests" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated users to update ai_newsletter_subscriptions" ON ai_newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow authenticated users to update early_access_requests" ON early_access_requests;

-- Allow public insert for all tables
CREATE POLICY "Allow public insert on contact_forms" ON contact_forms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on demo_requests" ON demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on newsletter_signups" ON newsletter_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on ai_newsletter_subscriptions" ON ai_newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on early_access_requests" ON early_access_requests FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all data
CREATE POLICY "Allow authenticated users to view contact_forms" ON contact_forms FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to view demo_requests" ON demo_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to view newsletter_signups" ON newsletter_signups FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to view ai_newsletter_subscriptions" ON ai_newsletter_subscriptions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to view early_access_requests" ON early_access_requests FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update data
CREATE POLICY "Allow authenticated users to update contact_forms" ON contact_forms FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update demo_requests" ON demo_requests FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update ai_newsletter_subscriptions" ON ai_newsletter_subscriptions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update early_access_requests" ON early_access_requests FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_newsletter_email ON ai_newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_ai_newsletter_status ON ai_newsletter_subscriptions(subscription_status);
CREATE INDEX IF NOT EXISTS idx_ai_newsletter_created_at ON ai_newsletter_subscriptions(created_at);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated; 