-- Olynk Website Database Schema (Simplified Version)
-- Run this in your Supabase SQL editor to create the necessary tables
-- This version removes the problematic ALTER DATABASE command

-- Create tables with proper structure

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

-- Contact Forms Table
CREATE TABLE IF NOT EXISTS contact_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Signups Table
CREATE TABLE IF NOT EXISTS newsletter_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Early Access Requests Table
CREATE TABLE IF NOT EXISTS early_access_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    industry VARCHAR(255),
    company_size VARCHAR(100),
    use_case TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(100) DEFAULT 'early-access-form'
);

-- Page Views Analytics Table
CREATE TABLE IF NOT EXISTS page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page VARCHAR(255) NOT NULL,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_agent TEXT,
    ip_address INET,
    referrer VARCHAR(500)
);

-- Events Analytics Table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_data JSONB,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(255)
);

-- Blog Posts Table (for future blog functionality)
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255),
    featured_image VARCHAR(500),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_forms_status ON contact_forms(status);
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at);
CREATE INDEX IF NOT EXISTS idx_early_access_requests_status ON early_access_requests(status);
CREATE INDEX IF NOT EXISTS idx_early_access_requests_submitted_at ON early_access_requests(submitted_at);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_demo_requests_updated_at BEFORE UPDATE ON demo_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_forms_updated_at BEFORE UPDATE ON contact_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_early_access_requests_updated_at BEFORE UPDATE ON early_access_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) policies
-- Note: You may want to adjust these policies based on your security requirements

-- Demo Requests RLS
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert for demo requests
CREATE POLICY "Allow public insert on demo_requests" ON demo_requests
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all demo requests (for admin dashboard)
CREATE POLICY "Allow authenticated users to view demo_requests" ON demo_requests
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update demo requests
CREATE POLICY "Allow authenticated users to update demo_requests" ON demo_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Contact Forms RLS
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Allow public insert for contact forms
CREATE POLICY "Allow public insert on contact_forms" ON contact_forms
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all contact forms
CREATE POLICY "Allow authenticated users to view contact_forms" ON contact_forms
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update contact forms
CREATE POLICY "Allow authenticated users to update contact_forms" ON contact_forms
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Newsletter Signups RLS
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Allow public insert for newsletter signups
CREATE POLICY "Allow public insert on newsletter_signups" ON newsletter_signups
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all newsletter signups
CREATE POLICY "Allow authenticated users to view newsletter_signups" ON newsletter_signups
    FOR SELECT USING (auth.role() = 'authenticated');

-- Early Access Requests RLS
ALTER TABLE early_access_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert for early access requests
CREATE POLICY "Allow public insert on early_access_requests" ON early_access_requests
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all early access requests
CREATE POLICY "Allow authenticated users to view early_access_requests" ON early_access_requests
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update early access requests
CREATE POLICY "Allow authenticated users to update early_access_requests" ON early_access_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Page Views RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow public insert for page views
CREATE POLICY "Allow public insert on page_views" ON page_views
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all page views
CREATE POLICY "Allow authenticated users to view page_views" ON page_views
    FOR SELECT USING (auth.role() = 'authenticated');

-- Events RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public insert for events
CREATE POLICY "Allow public insert on events" ON events
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all events
CREATE POLICY "Allow authenticated users to view events" ON events
    FOR SELECT USING (auth.role() = 'authenticated');

-- Blog Posts RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public to view published blog posts
CREATE POLICY "Allow public to view published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Allow authenticated users to view all blog posts
CREATE POLICY "Allow authenticated users to view all blog posts" ON blog_posts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert blog posts
CREATE POLICY "Allow authenticated users to insert blog posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blog posts
CREATE POLICY "Allow authenticated users to update blog posts" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blog posts
CREATE POLICY "Allow authenticated users to delete blog posts" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some sample data for testing
INSERT INTO blog_posts (title, slug, content, excerpt, author, status, published_at) VALUES
('Welcome to Olynk', 'welcome-to-olynk', 'This is the first blog post for Olynk...', 'Welcome to our new blog where we share insights about inventory management and AI.', 'Olynk Team', 'published', NOW()),
('The Future of Inventory Management', 'future-of-inventory-management', 'AI is revolutionizing how businesses manage their inventory...', 'Discover how AI is transforming inventory management practices.', 'Olynk Team', 'published', NOW());

-- Create a view for dashboard statistics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM demo_requests WHERE status = 'pending') as pending_demos,
    (SELECT COUNT(*) FROM contact_forms WHERE status = 'new') as new_contacts,
    (SELECT COUNT(*) FROM early_access_requests WHERE status = 'pending') as pending_applications,
    (SELECT COUNT(*) FROM newsletter_signups WHERE created_at >= NOW() - INTERVAL '30 days') as newsletter_signups_30d,
    (SELECT COUNT(*) FROM page_views WHERE timestamp >= NOW() - INTERVAL '7 days') as page_views_7d;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated; 