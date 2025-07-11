# Firebase Setup Guide for Olynk Website

## 🚀 Firebase is Now Connected!

Your Olynk website is now fully connected to Firebase with the following services:

- **Firestore Database** - For storing data
- **Authentication** - For user management (ready to use)
- **Storage** - For file uploads (ready to use)
- **Analytics** - For tracking user behavior

## 📁 Project Structure

```
src/
├── firebase.ts                 # Firebase configuration
├── services/
│   └── firebaseService.ts      # Database operations
└── components/
    └── DemoForm.tsx           # Example form using Firebase
```

## 🔧 Firebase Configuration

Your Firebase config is set up in `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyChZxNv1dnZGIHva3hyA_O-zUlZtFxiI4Y",
  authDomain: "olynk-5f8f3.firebaseapp.com",
  projectId: "olynk-5f8f3",
  storageBucket: "olynk-5f8f3.firebasestorage.app",
  messagingSenderId: "900465754898",
  appId: "1:900465754898:web:b194c222e227e0980769cb",
  measurementId: "G-5R3T7VRFQQ"
};
```

## 📊 Available Services

### 1. Demo Requests
```typescript
import { demoService } from '../services/firebaseService';

// Submit a demo request
await demoService.submitDemoRequest({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Tech Corp',
  phone: '+1234567890',
  message: 'Interested in AI demo'
});

// Get all demo requests
const demos = await demoService.getDemoRequests();

// Get pending demos
const pendingDemos = await demoService.getPendingDemos();

// Update demo status
await demoService.updateDemoStatus(demoId, 'contacted');
```

### 2. Contact Forms
```typescript
import { contactService } from '../services/firebaseService';

// Submit contact form
await contactService.submitContactForm({
  name: 'Jane Smith',
  email: 'jane@example.com',
  subject: 'General Inquiry',
  message: 'I have a question about your services'
});

// Get all contact forms
const contacts = await contactService.getContactForms();

// Update submission status
await contactService.updateSubmissionStatus(submissionId, 'read');

// Get submissions by status
const newSubmissions = await contactService.getSubmissionsByStatus('new');
```

### 3. Newsletter Signups
```typescript
import { newsletterService } from '../services/firebaseService';

// Subscribe to newsletter
await newsletterService.subscribe('user@example.com');

// Check if email is subscribed
const isSubscribed = await newsletterService.isSubscribed('user@example.com');
```

### 4. Early Access Applications
```typescript
import { earlyAccessService } from '../services/firebaseService';

// Submit early access application
await earlyAccessService.submitApplication({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Tech Corp',
  role: 'Operations Manager',
  industry: 'ecommerce',
  currentChallenges: 'Inventory management issues',
  expectedBenefits: 'Better forecasting',
  timeline: '1-3-months',
  additionalInfo: 'Interested in AI solutions'
});

// Get all applications
const applications = await earlyAccessService.getApplications();

// Get pending applications
const pendingApps = await earlyAccessService.getPendingApplications();

// Update application status
await earlyAccessService.updateApplicationStatus(appId, 'approved');
```

### 5. Analytics Tracking
```typescript
import { analyticsService } from '../services/firebaseService';

// Track page view
await analyticsService.trackPageView('/pricing', userId);

// Track custom event
await analyticsService.trackEvent('button_click', {
  button: 'demo_request',
  page: '/home'
}, userId);
```

## 🔥 Firestore Collections

Your data will be stored in these collections:

- **`demoRequests`** - Demo request submissions
- **`contactForms`** - Contact form submissions  
- **`newsletterSignups`** - Newsletter subscriptions
- **`earlyAccessRequests`** - Early access applications
- **`pageViews`** - Page view analytics
- **`events`** - Custom event tracking

## 📝 Example Usage in Components

### Demo Form Component
```typescript
import React, { useState } from 'react';
import { demoService } from '../services/firebaseService';

const DemoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await demoService.submitDemoRequest(formData);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
};
```

### Real-time Data Listening
```typescript
import { firebaseService } from '../services/firebaseService';

// Listen to demo requests in real-time
const unsubscribe = firebaseService.subscribeToCollection(
  'demoRequests',
  (demos) => {
    console.log('New demo requests:', demos);
  },
  [{ field: 'status', operator: '==', value: 'pending' }]
);

// Clean up listener
unsubscribe();
```

## 🔐 Security Rules

Make sure to set up Firestore security rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for demo requests
    match /demoRequests/{document} {
      allow read, write: if true; // For now, allow all access
    }
    
    // Allow read/write for contact forms
    match /contactForms/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write for newsletter signups
    match /newsletterSignups/{document} {
      allow read, write: if true;
    }
  }
}
```

## 🚀 Next Steps

1. **Test the Demo Form** - Try submitting a demo request
2. **Set up Security Rules** - Configure proper access controls
3. **Add Authentication** - Implement user login if needed
4. **Monitor Analytics** - Check Firebase Console for data
5. **Add More Features** - Extend the service as needed

## 📞 Support

If you need help with Firebase integration:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the `firebaseService.ts` file for available functions
- Test with the provided `DemoForm.tsx` component

Your Firebase setup is complete and ready to use! 🎉 