# Supabase Setup Guide for Olynk Website

This guide will help you set up Supabase as your database backend for the Olynk website.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Your Supabase project URL and API keys (already provided)

## Step 1: Database Setup

1. **Go to your Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project (or create a new one)

2. **Run the Database Schema**
   - Go to the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `database_schema.sql`
   - Click "Run" to execute the schema

3. **Verify Tables Created**
   - Go to the Table Editor
   - You should see the following tables:
     - `demo_requests`
     - `contact_forms`
     - `newsletter_signups`
     - `early_access_requests`
     - `page_views`
     - `events`
     - `blog_posts`

## Step 2: API Keys Configuration

The Supabase configuration has been set up in `src/supabase.ts` with your provided credentials:

- **Project URL**: `https://your-project-id.supabase.co` (get from Supabase dashboard)
- **Anonymous Key**: Already configured for client-side operations
- **Service Role Key**: Already configured for server-side operations

## Step 3: Testing the Integration

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Test Database Operations**
   - Submit a demo request through the website
   - Submit a contact form
   - Sign up for the newsletter
   - Check your Supabase dashboard to see the data

## Step 4: Environment Variables (Optional)

For better security, you can move the API keys to environment variables:

1. **Create a `.env.local` file** in your project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_SUPABASE_SERVICE_KEY=your-service-key-here
   ```
   
   **⚠️ SECURITY NOTE:** Never commit `.env.local` to version control. Get your actual keys from your Supabase dashboard at https://supabase.com/dashboard/project/_/settings/api

2. **Update `src/supabase.ts`** to use environment variables:
   ```typescript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
   const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
   ```

## Available Services

The Supabase integration provides the following services:

### Demo Service
- `submitDemoRequest()` - Submit a new demo request
- `getDemoRequests()` - Get all demo requests
- `updateDemoStatus()` - Update demo request status
- `getPendingDemos()` - Get pending demo requests

### Contact Service
- `submitContactForm()` - Submit a contact form
- `getContactForms()` - Get all contact forms
- `updateSubmissionStatus()` - Update submission status
- `getSubmissionsByStatus()` - Get submissions by status

### Newsletter Service
- `subscribe()` - Subscribe to newsletter
- `isSubscribed()` - Check if email is already subscribed

### Early Access Service
- `submitApplication()` - Submit early access application
- `getApplications()` - Get all applications
- `getPendingApplications()` - Get pending applications
- `updateApplicationStatus()` - Update application status
- `getApplicationsByIndustry()` - Get applications by industry

### Analytics Service
- `trackPageView()` - Track page views
- `trackEvent()` - Track custom events

## Usage Examples

### Submitting a Demo Request
```typescript
import { demoService } from './services/supabaseService';

const submitDemo = async () => {
  try {
    const demoId = await demoService.submitDemoRequest({
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Example Corp',
      phone: '+1234567890',
      message: 'Interested in learning more about Olynk'
    });
    console.log('Demo request submitted:', demoId);
  } catch (error) {
    console.error('Error submitting demo request:', error);
  }
};
```

### Submitting a Contact Form
```typescript
import { contactService } from './services/supabaseService';

const submitContact = async () => {
  try {
    const contactId = await contactService.submitContactForm({
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'I have a question about your services'
    });
    console.log('Contact form submitted:', contactId);
  } catch (error) {
    console.error('Error submitting contact form:', error);
  }
};
```

### Newsletter Signup
```typescript
import { newsletterService } from './services/supabaseService';

const subscribeToNewsletter = async (email: string) => {
  try {
    const isAlreadySubscribed = await newsletterService.isSubscribed(email);
    if (!isAlreadySubscribed) {
      const subscriptionId = await newsletterService.subscribe(email);
      console.log('Newsletter subscription successful:', subscriptionId);
    } else {
      console.log('Email already subscribed');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
  }
};
```

## Security Considerations

1. **Row Level Security (RLS)** is enabled on all tables
2. **Public insert policies** allow form submissions from unauthenticated users
3. **Authenticated user policies** allow viewing and updating data for admin purposes
4. **Service role key** should only be used for server-side operations

## Monitoring and Analytics

- Use the Supabase dashboard to monitor:
  - Database performance
  - API usage
  - Real-time subscriptions
  - Authentication events

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your Supabase project settings allow your domain
2. **RLS Policy Errors**: Check that the appropriate policies are in place
3. **Authentication Errors**: Verify your API keys are correct

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [Supabase JavaScript Client Documentation](https://supabase.com/docs/reference/javascript)
- Check the browser console for detailed error messages

## Next Steps

1. **Set up authentication** if you need user accounts
2. **Configure email notifications** for form submissions
3. **Set up real-time subscriptions** for live updates
4. **Implement admin dashboard** for managing submissions
5. **Add data validation** and error handling 