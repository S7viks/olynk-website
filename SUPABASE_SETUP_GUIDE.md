# Supabase Setup Guide for OLYNK

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and API keys

### 2. Set Environment Variables in Vercel
Add these to your Vercel project environment variables:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_KEY=your-service-key
```

### 3. Set Up Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database_schema.sql`
4. Run the script

### 4. Configure Authentication
1. Go to Authentication > Settings
2. Add your domain to allowed redirect URLs:
   - `https://olynk.vercel.app`
   - `https://olynk.vercel.app/auth/callback`
   - `http://localhost:5173` (for local development)

### 5. Set Up Row Level Security (RLS)
The database schema includes RLS policies, but you may need to:
1. Go to Authentication > Policies
2. Verify all tables have the correct policies
3. Test with a sample user

## 📊 Database Tables

### Core Tables
- **demo_requests**: Demo booking requests
- **contact_forms**: Contact form submissions
- **newsletter_signups**: Email newsletter signups
- **early_access_requests**: Early access applications
- **page_views**: Analytics tracking
- **events**: Event tracking
- **blog_posts**: Blog content management

### Admin Tables
- **user_profiles**: User profile information
- **admin_users**: Admin user permissions
- **waitlist_users**: Waitlist user management

## 🔧 Testing the Setup

### 1. Test Database Connection
Check the browser console for:
```
✅ Supabase connection successful
🔧 Supabase URL: https://your-project.supabase.co
```

### 2. Test Authentication
1. Try signing up a new user
2. Check if user appears in Authentication > Users
3. Verify user profile is created

### 3. Test Forms
1. Submit a demo request
2. Submit a contact form
3. Check if data appears in respective tables

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Supabase connection failed"
- Check environment variables in Vercel
- Verify project URL and keys
- Ensure project is not paused

#### 2. "RLS policy violation"
- Check RLS policies in Supabase dashboard
- Verify user authentication status
- Test with authenticated vs anonymous users

#### 3. "Table doesn't exist"
- Run the database schema script
- Check table names match exactly
- Verify schema is in 'public' schema

### Debug Commands
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check RLS policies
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Test insert permissions
INSERT INTO demo_requests (name, email, company) VALUES ('Test', 'test@test.com', 'Test Co');
```

## 📈 Analytics Setup

### Page Views Tracking
The schema includes page views tracking. To implement:
1. Add tracking to your React components
2. Use the `page_views` table
3. Consider privacy implications

### Event Tracking
Use the `events` table for custom event tracking:
```javascript
// Example event tracking
supabase.from('events').insert({
  event_name: 'button_click',
  event_data: { button: 'cta', page: 'home' },
  session_id: 'unique-session-id'
});
```

## 🔐 Security Considerations

### 1. API Key Security
- Never expose service keys in client code
- Use environment variables
- Rotate keys regularly

### 2. RLS Policies
- Review all RLS policies
- Test with different user roles
- Ensure proper data isolation

### 3. CORS Settings
- Configure allowed origins in Supabase
- Include your Vercel domain
- Add localhost for development

## 🚀 Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Database schema executed
- [ ] Authentication configured
- [ ] RLS policies verified
- [ ] CORS settings updated
- [ ] Test user accounts created
- [ ] Forms tested and working
- [ ] Admin dashboard accessible

## 📞 Support

If you encounter issues:
1. Check Supabase logs in dashboard
2. Verify environment variables
3. Test with simple queries first
4. Check browser console for errors

## 🔄 Updates

Keep your schema updated by:
1. Running migration scripts
2. Testing in development first
3. Backing up production data
4. Updating RLS policies as needed 