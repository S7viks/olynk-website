# Contact Form Setup Guide

## ✅ Contact Form Database Complete!

Your contact form is now fully connected to Supabase and ready to collect and manage submissions.

## 📁 What's Been Set Up:

### 1. **Contact Form Component** (`src/components/ContactForm.tsx`)
- Standalone contact form with Supabase integration
- Form validation and error handling
- Success/error state management
- Beautiful, responsive design

### 2. **Footer Contact Form** (`src/components/Footer.tsx`)
- Updated footer contact form to use Supabase
- Real-time form submission
- Success/error feedback
- Form state management

### 3. **Contact Form Dashboard** (`src/components/ContactFormDashboard.tsx`)
- Admin dashboard to view all contact submissions
- Filter by status (new, read, replied, archived)
- Search functionality
- Status management
- Detailed message view

### 4. **Supabase Integration** (`src/supabase.ts`)
- Enhanced `contactService` with complete CRUD operations
- Status management functions
- Query and filtering capabilities

## 🔥 Supabase Tables:

Your contact form submissions are stored in the `contactForms` collection with:
```typescript
{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  status?: 'new' | 'read' | 'replied' | 'archived';
  updatedAt?: string;
}
```

## 🌐 Available Routes:

1. **Contact Form**: `http://localhost:5173/contact`
2. **Contact Dashboard**: `http://localhost:5173/admin/contact-dashboard`
3. **Early Access Dashboard**: `http://localhost:5173/admin/dashboard`

## 📊 Contact Form Features:

### **Form Fields:**
- **Name** (required)
- **Email** (required)
- **Subject** (required)
- **Message** (required)

### **Status Management:**
- **New** - Just received
- **Read** - Viewed by admin
- **Replied** - Response sent
- **Archived** - Completed/closed

### **Dashboard Features:**
- View all submissions
- Filter by status
- Search by name, email, or subject
- Update submission status
- Reply directly via email
- Statistics overview

## 🎯 How to Use:

### **For Users:**
1. **Footer Form**: Use the contact form in the website footer
2. **Dedicated Page**: Visit `/contact` for a full-page contact form
3. **Form Validation**: All required fields are validated
4. **Success Feedback**: Users get confirmation when message is sent

### **For Admins:**
1. **View Submissions**: Visit `/admin/contact-dashboard`
2. **Manage Status**: Update submission status as you process them
3. **Search & Filter**: Find specific submissions quickly
4. **Reply**: Click "Reply via Email" to respond directly

## 📈 Usage Examples:

### **Submit Contact Form:**
```typescript
import { supabase } from '../supabase';

const handleSubmit = async (formData) => {
  try {
    await contactService.submitContactForm(formData);
    // Show success message
  } catch (error) {
    // Handle error
  }
};
```

### **View All Submissions:**
```typescript
const submissions = await contactService.getContactForms();
```

### **Update Status:**
```typescript
await contactService.updateSubmissionStatus(submissionId, 'read');
```

### **Get New Submissions:**
```typescript
const newSubmissions = await contactService.getSubmissionsByStatus('new');
```

## 🔐 Security Rules:

Make sure to set up Row Level Security (RLS) policies in your Supabase Dashboard:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public write for contact forms
    match /contactForms/{document} {
      allow write: if true;
      allow read: if request.auth != null; // Admin only
    }
  }
}
```

## 🚀 Next Steps:

1. **Test the Forms**: Try submitting messages through both forms
2. **Check Dashboard**: View submissions in the admin dashboard
3. **Set Up Email**: Configure email notifications for new submissions
4. **Customize**: Modify the form fields or styling as needed

## 📞 Support:

Your contact form is now fully functional and ready to collect real user inquiries! All submissions will be stored in Supabase and can be managed through the admin dashboard.

**Access Points:**
- Contact Form: `/contact`
- Admin Dashboard: `/admin/contact-dashboard`
- Footer Form: Available on all pages

The contact form database is now live and ready to use! 🎉 