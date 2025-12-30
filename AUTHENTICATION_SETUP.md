# Olynk Authentication System Setup Guide

This guide will help you set up the complete authentication system for your Olynk website, including admin login, waitlist management, and user authentication.

## 🚀 Quick Start

### 1. Database Setup

First, run the authentication schema in your Supabase SQL editor:

```sql
-- Copy and paste the contents of database_schema_auth.sql
-- This will create all necessary tables and security policies
```

### 2. Create Your First Admin User

1. **Sign up as a regular user**:
   - Go to `/signup` on your website
   - Create an account with your admin email
   - Verify your email

2. **Promote to admin** (run in Supabase SQL editor):
   ```sql
   -- Replace 'your-admin-email@example.com' with your actual email
   UPDATE user_profiles 
   SET role = 'admin' 
   WHERE email = 'your-admin-email@example.com';
   
   -- Create admin user record
   INSERT INTO admin_users (id, permissions, can_manage_users, can_manage_content, can_view_analytics, can_manage_settings)
   SELECT id, '["all"]'::jsonb, true, true, true, true
   FROM user_profiles 
   WHERE email = 'your-admin-email@example.com';
   ```

## 📋 System Overview

### User Roles

1. **Admin Users** (`role = 'admin'`)
   - Full access to admin dashboard
   - Can manage all users and waitlist
   - Can view analytics and manage content
   - Access to `/admin` route

2. **Waitlist Users** (`role = 'waitlist'`)
   - Can view their waitlist position
   - Access to waitlist dashboard
   - Can update their profile
   - Access to `/dashboard` route

3. **Regular Users** (`role = 'user'`)
   - Full platform access
   - Can use all features
   - Profile management

### Authentication Flow

```
User Registration → Email Verification → Role Assignment → Dashboard Access
```

## 🔧 Database Schema

### Tables Created

1. **`user_profiles`** - Main user information
2. **`admin_users`** - Admin-specific permissions
3. **`waitlist_users`** - Waitlist position and priority
4. **`user_sessions`** - Session tracking

### Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Automatic role assignment** on signup (defaults to waitlist)
- **Permission-based access** control
- **Session management** and tracking

## 🎯 Features

### Admin Dashboard (`/admin`)

- **Overview**: Key metrics and quick actions
- **User Management**: View, edit, and delete users
- **Waitlist Management**: Manage positions and priorities
- **Analytics**: View detailed statistics
- **Content Management**: Manage blog posts and content
- **Settings**: System configuration

### Waitlist Dashboard (`/dashboard`)

- **Position Display**: Shows current waitlist position
- **Progress Tracking**: Visual progress indicator
- **Estimated Wait Time**: Calculated based on position
- **Profile Management**: Update personal information
- **Priority Status**: Shows priority level (low/normal/high/vip)

### Authentication Pages

- **Login** (`/login`): Sign in with email/password
- **Signup** (`/signup`): Create new account
- **Waitlist** (`/waitlist`): Join waitlist with extended form

## 🛠️ API Endpoints

### Authentication Service Methods

```typescript
// User Management
authService.signUp(data)
authService.signIn(credentials)
authService.signOut()
authService.resetPassword(email)

// Profile Management
authService.getUserProfile()
authService.updateUserProfile(data)

// Admin Functions
authService.getAllUsers()
authService.updateUserRole(userId, role)
authService.deleteUser(userId)

// Waitlist Functions
authService.getAllWaitlistUsers()
authService.updateWaitlistPosition(userId, position)
authService.updateWaitlistPriority(userId, priority)
```

## 🔒 Security Considerations

### Row Level Security Policies

- Users can only view their own profile
- Admins can view all user data
- Waitlist users can only see their own waitlist data
- Public insert allowed for signup forms

### Password Security

- Minimum 6 characters required
- Supabase handles password hashing
- Password reset via email

### Session Management

- Automatic session tracking
- Last login timestamps
- Secure session tokens

## 🧪 Testing the System

### 1. Test User Registration

```bash
# Visit /signup and create a test account
# Verify email confirmation works
# Check that user is assigned to waitlist role
```

### 2. Test Admin Access

```bash
# Create admin user (see setup above)
# Visit /admin
# Verify all admin features work
```

### 3. Test Waitlist Features

```bash
# Create waitlist user
# Visit /dashboard
# Verify position and priority display
```

### 4. Test User Management

```bash
# As admin, go to Users tab
# Try changing user roles
# Test user deletion
```

## 🔧 Configuration

### Environment Variables (Optional)

For enhanced security, move API keys to environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_KEY=your-service-key
```

Then update `src/supabase.ts`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
```

### Customization

#### Styling
- All components use Tailwind CSS
- Color scheme matches your existing design
- Dark mode support included

#### Features
- Easy to extend with additional roles
- Modular component structure
- TypeScript interfaces for type safety

## 🚨 Troubleshooting

### Common Issues

1. **"Permission denied" errors**
   - Ensure RLS policies are properly set
   - Check user role assignments
   - Verify admin permissions

2. **Users not appearing in admin dashboard**
   - Check if user profiles were created
   - Verify admin role assignment
   - Check database permissions

3. **Waitlist position not updating**
   - Ensure waitlist_users table exists
   - Check trigger functions
   - Verify position calculation logic

### Debug Mode

Enable debug logging in `src/services/authService.ts`:

```typescript
// Add console.log statements for debugging
console.log('Auth operation:', operation, data);
```

## 📈 Analytics Integration

The system automatically tracks:

- User registrations
- Login sessions
- Role changes
- Waitlist movements
- Admin actions

View analytics in the admin dashboard under the Analytics tab.

## 🔄 Future Enhancements

Potential improvements:

1. **Email Notifications**: Automated emails for role changes
2. **Advanced Permissions**: Granular permission system
3. **Audit Logging**: Track all admin actions
4. **Bulk Operations**: Mass user management
5. **API Rate Limiting**: Prevent abuse
6. **Two-Factor Authentication**: Enhanced security

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify database schema is correctly applied
3. Test with a fresh user account
4. Review Supabase logs for backend errors

## 🎉 Success!

Once setup is complete, you'll have:

- ✅ Secure user authentication
- ✅ Admin dashboard with full user management
- ✅ Waitlist system with position tracking
- ✅ Role-based access control
- ✅ Modern, responsive UI
- ✅ Type-safe TypeScript implementation

Your Olynk website now has a complete authentication and user management system! 