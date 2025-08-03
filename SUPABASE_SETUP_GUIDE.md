# Supabase Setup Guide

## 🚨 **Current Issue: Supabase Project Not Found**

The current Supabase configuration is pointing to a project that doesn't exist or is inaccessible. Let's fix this!

## 🔧 **Step 1: Create a New Supabase Project**

1. **Go to [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Click "New Project"**
3. **Fill in the details:**
   - **Name**: `olynk-website`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
4. **Click "Create new project"**

## 🔑 **Step 2: Get Your Project Credentials**

1. **Go to your project dashboard**
2. **Navigate to Settings → API**
3. **Copy these values:**
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 📝 **Step 3: Create Environment File**

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_SERVICE_KEY=your-service-key-here
```

**Replace the placeholder values with your actual credentials.**

## 🗄️ **Step 4: Set Up Database Schema**

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `database_schema.sql`**
4. **Click "Run" to create all tables**

## 🔐 **Step 5: Configure Row Level Security (RLS)**

After running the schema, enable RLS on all tables:

1. **Go to Authentication → Policies**
2. **Enable RLS on each table**
3. **The schema already includes the necessary policies**

## 🧪 **Step 6: Test the Connection**

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Try submitting a contact form**
3. **Check the browser console for any errors**

## 📊 **Step 7: Verify Database Tables**

Go to your Supabase dashboard → Table Editor and verify these tables exist:

- ✅ `user_profiles`
- ✅ `admin_users`
- ✅ `waitlist_users`
- ✅ `user_sessions`
- ✅ `contact_submissions`
- ✅ `demo_requests`
- ✅ `early_access_requests`
- ✅ `newsletter_subscriptions`
- ✅ `blog_posts`
- ✅ `dashboard_stats`

## 🚀 **Step 8: Create Your First Admin User**

1. **Sign up through your website** (`/signup`)
2. **Go to Supabase SQL Editor**
3. **Run this SQL (replace with your email):**

```sql
-- Promote your user to admin
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Create admin user record
INSERT INTO admin_users (id, permissions, can_manage_users, can_manage_content, can_view_analytics, can_manage_settings)
SELECT id, '["all"]'::jsonb, true, true, true, true
FROM user_profiles 
WHERE email = 'your-email@example.com';
```

## 🔍 **Troubleshooting**

### **If you still get connection errors:**

1. **Check your `.env.local` file exists**
2. **Verify the URL format is correct**
3. **Make sure you copied the keys correctly**
4. **Check that your Supabase project is active**

### **Common Issues:**

- **"Project not found"**: Double-check your project URL
- **"Invalid API key"**: Verify you copied the correct key
- **"Permission denied"**: Make sure RLS policies are set up correctly

## 📞 **Need Help?**

1. **Check Supabase documentation**: https://supabase.com/docs
2. **Verify your project status**: https://supabase.com/dashboard
3. **Test connection**: Try the Supabase dashboard SQL editor

## 🎉 **Success Indicators**

Once everything is working:

- ✅ Contact forms submit successfully
- ✅ Admin dashboard loads without errors
- ✅ Blog posts can be created and viewed
- ✅ User authentication works
- ✅ No more "ERR_NAME_NOT_RESOLVED" errors

Your Olynk website will be fully functional with Supabase! 🚀 