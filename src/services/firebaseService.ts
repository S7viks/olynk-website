import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Types for your data
export interface DemoRequest {
  id?: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContactForm {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

export interface NewsletterSignup {
  id?: string;
  email: string;
  createdAt: Timestamp;
}

// Basic Firebase service
export const firebaseService = {
  // Create a new document
  async addDocument(collectionName: string, data: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  },

  // Get a single document by ID
  async getDocument(collectionName: string, docId: string): Promise<any> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  },

  // Get all documents from a collection
  async getDocuments(collectionName: string): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error);
      throw error;
    }
  },

  // Update a document
  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Delete a document
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      throw error;
    }
  },

  // Query documents with filters
  async queryDocuments(
    collectionName: string, 
    filters: Array<{ field: string; operator: any; value: any }> = [],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<any[]> {
    try {
      let q: any = collection(db, collectionName);
      
      // Apply filters
      filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
      
      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }
      
      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error querying documents from ${collectionName}:`, error);
      throw error;
    }
  },

  // Real-time listener
  subscribeToCollection(
    collectionName: string,
    callback: (docs: any[]) => void,
    filters: Array<{ field: string; operator: any; value: any }> = []
  ) {
    let q: any = collection(db, collectionName);
    
    // Apply filters
    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });
    
    return onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(documents);
    });
  }
};

// Specific service functions for your app
export const demoService = {
  // Submit demo request
  async submitDemoRequest(data: Omit<DemoRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<string> {
    return await firebaseService.addDocument('demoRequests', {
      ...data,
      status: 'pending'
    });
  },

  // Get all demo requests
  async getDemoRequests(): Promise<DemoRequest[]> {
    return await firebaseService.getDocuments('demoRequests');
  },

  // Update demo request status
  async updateDemoStatus(demoId: string, status: DemoRequest['status']): Promise<void> {
    await firebaseService.updateDocument('demoRequests', demoId, { status });
  },

  // Get pending demo requests
  async getPendingDemos(): Promise<DemoRequest[]> {
    return await firebaseService.queryDocuments('demoRequests', [
      { field: 'status', operator: '==', value: 'pending' }
    ], 'createdAt', 'desc');
  }
};

export const contactService = {
  // Submit contact form
  async submitContactForm(data: Omit<ContactForm, 'id' | 'createdAt'>): Promise<string> {
    return await firebaseService.addDocument('contactForms', data);
  },

  // Get all contact forms
  async getContactForms(): Promise<ContactForm[]> {
    return await firebaseService.getDocuments('contactForms');
  },

  // Update submission status
  async updateSubmissionStatus(submissionId: string, status: 'new' | 'read' | 'replied' | 'archived'): Promise<void> {
    await firebaseService.updateDocument('contactForms', submissionId, { 
      status,
      updatedAt: new Date().toISOString()
    });
  },

  // Get submissions by status
  async getSubmissionsByStatus(status: 'new' | 'read' | 'replied' | 'archived'): Promise<ContactForm[]> {
    return await firebaseService.queryDocuments('contactForms', [
      { field: 'status', operator: '==', value: status }
    ], 'createdAt', 'desc');
  }
};

export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string): Promise<string> {
    return await firebaseService.addDocument('newsletterSignups', { email });
  },

  // Check if email is already subscribed
  async isSubscribed(email: string): Promise<boolean> {
    const subscriptions = await firebaseService.queryDocuments('newsletterSignups', [
      { field: 'email', operator: '==', value: email }
    ]);
    return subscriptions.length > 0;
  }
};

export const earlyAccessService = {
  // Submit early access application
  async submitApplication(data: any): Promise<string> {
    return await firebaseService.addDocument('earlyAccessRequests', {
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      source: 'early-access-form'
    });
  },

  // Get all early access applications
  async getApplications(): Promise<any[]> {
    return await firebaseService.getDocuments('earlyAccessRequests');
  },

  // Get pending applications
  async getPendingApplications(): Promise<any[]> {
    return await firebaseService.queryDocuments('earlyAccessRequests', [
      { field: 'status', operator: '==', value: 'pending' }
    ], 'submittedAt', 'desc');
  },

  // Update application status
  async updateApplicationStatus(applicationId: string, status: 'pending' | 'approved' | 'rejected' | 'contacted'): Promise<void> {
    await firebaseService.updateDocument('earlyAccessRequests', applicationId, { 
      status,
      updatedAt: new Date().toISOString()
    });
  },

  // Get applications by industry
  async getApplicationsByIndustry(industry: string): Promise<any[]> {
    return await firebaseService.queryDocuments('earlyAccessRequests', [
      { field: 'industry', operator: '==', value: industry }
    ], 'submittedAt', 'desc');
  }
};

// Analytics tracking
export const analyticsService = {
  // Track page view
  async trackPageView(page: string, userId?: string): Promise<string> {
    return await firebaseService.addDocument('pageViews', {
      page,
      userId,
      timestamp: Timestamp.now(),
      userAgent: navigator.userAgent
    });
  },

  // Track custom event
  async trackEvent(eventName: string, eventData: any, userId?: string): Promise<string> {
    return await firebaseService.addDocument('events', {
      eventName,
      eventData,
      userId,
      timestamp: Timestamp.now()
    });
  }
};

export default firebaseService; 