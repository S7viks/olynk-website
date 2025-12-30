import { supabase, supabaseAdmin } from '../supabase';
import { PostgrestError } from '@supabase/supabase-js';

// Types for your data
export interface DemoRequest {
  id?: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ContactForm {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface NewsletterSignup {
  id?: string;
  email: string;
  created_at: string;
}

// Basic Supabase service
export const supabaseService = {
  // Create a new record
  async addRecord(tableName: string, data: any): Promise<string> {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert({
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return result.id;
    } catch (error) {
      console.error(`Error adding record to ${tableName}:`, error);
      throw error;
    }
  },

  // Get a single record by ID
  async getRecord(tableName: string, recordId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', recordId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error getting record from ${tableName}:`, error);
      throw error;
    }
  },

  // Get all records from a table
  async getRecords(tableName: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error getting records from ${tableName}:`, error);
      throw error;
    }
  },

  // Update a record
  async updateRecord(tableName: string, recordId: string, data: any): Promise<void> {
    try {
      const { error } = await supabase
        .from(tableName)
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', recordId);

      if (error) throw error;
    } catch (error) {
      console.error(`Error updating record in ${tableName}:`, error);
      throw error;
    }
  },

  // Delete a record
  async deleteRecord(tableName: string, recordId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', recordId);

      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw error;
    }
  },

  // Query records with filters
  async queryRecords(
    tableName: string,
    filters: Record<string, any> = {},
    orderByField: string = 'created_at',
    orderDirection: 'asc' | 'desc' = 'desc',
    limitCount?: number
  ): Promise<any[]> {
    try {
      let query = supabase
        .from(tableName)
        .select('*');

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      // Apply ordering
      query = query.order(orderByField, { ascending: orderDirection === 'asc' });

      // Apply limit
      if (limitCount) {
        query = query.limit(limitCount);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error querying records from ${tableName}:`, error);
      throw error;
    }
  },

  // Real-time subscription
  subscribeToTable(
    tableName: string,
    callback: (records: any[]) => void,
    filters: Record<string, any> = {}
  ) {
    let query = supabase
      .channel(`${tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
          filter: filters
        },
        (payload) => {
          // Fetch updated data
          this.getRecords(tableName).then(callback);
        }
      )
      .subscribe();

    return query;
  }
};

// Specific service functions for your app
export const demoService = {
  // Submit demo request
  async submitDemoRequest(data: Omit<DemoRequest, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<string> {
    return await supabaseService.addRecord('demo_requests', {
      ...data,
      status: 'pending'
    });
  },

  // Get all demo requests
  async getDemoRequests(): Promise<DemoRequest[]> {
    return await supabaseService.getRecords('demo_requests');
  },

  // Update demo request status
  async updateDemoStatus(demoId: string, status: DemoRequest['status']): Promise<void> {
    await supabaseService.updateRecord('demo_requests', demoId, { status });
  },

  // Get pending demo requests
  async getPendingDemos(): Promise<DemoRequest[]> {
    return await supabaseService.queryRecords('demo_requests', {
      status: 'pending'
    });
  }
};

export const contactService = {
  // Submit contact form
  async submitContactForm(data: Omit<ContactForm, 'id' | 'created_at'>): Promise<string> {
    return await supabaseService.addRecord('contact_forms', data);
  },

  // Get all contact forms
  async getContactForms(): Promise<ContactForm[]> {
    return await supabaseService.getRecords('contact_forms');
  },

  // Update submission status
  async updateSubmissionStatus(submissionId: string, status: 'new' | 'read' | 'replied' | 'archived'): Promise<void> {
    await supabaseService.updateRecord('contact_forms', submissionId, { 
      status,
      updated_at: new Date().toISOString()
    });
  },

  // Get submissions by status
  async getSubmissionsByStatus(status: 'new' | 'read' | 'replied' | 'archived'): Promise<ContactForm[]> {
    return await supabaseService.queryRecords('contact_forms', {
      status
    });
  }
};

export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string): Promise<string> {
    return await supabaseService.addRecord('newsletter_signups', { email });
  },

  // Check if email is already subscribed
  async isSubscribed(email: string): Promise<boolean> {
    const subscriptions = await supabaseService.queryRecords('newsletter_signups', {
      email
    });
    return subscriptions.length > 0;
  }
};

export const earlyAccessService = {
  // Submit early access application
  async submitApplication(data: any): Promise<string> {
    return await supabaseService.addRecord('early_access_requests', {
      ...data,
      status: 'pending',
      submitted_at: new Date().toISOString(),
      source: 'early-access-form'
    });
  },

  // Get all early access applications
  async getApplications(): Promise<any[]> {
    return await supabaseService.getRecords('early_access_requests');
  },

  // Get pending applications
  async getPendingApplications(): Promise<any[]> {
    return await supabaseService.queryRecords('early_access_requests', {
      status: 'pending'
    }, 'submitted_at', 'desc');
  },

  // Update application status
  async updateApplicationStatus(applicationId: string, status: 'pending' | 'approved' | 'rejected' | 'contacted'): Promise<void> {
    await supabaseService.updateRecord('early_access_requests', applicationId, { 
      status,
      updated_at: new Date().toISOString()
    });
  },

  // Get applications by industry
  async getApplicationsByIndustry(industry: string): Promise<any[]> {
    return await supabaseService.queryRecords('early_access_requests', {
      industry
    }, 'submitted_at', 'desc');
  }
};

// Analytics tracking
export const analyticsService = {
  // Track page view
  async trackPageView(page: string, userId?: string): Promise<string> {
    return await supabaseService.addRecord('page_views', {
      page,
      user_id: userId,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    });
  },

  // Track custom event
  async trackEvent(eventName: string, eventData: any, userId?: string): Promise<string> {
    return await supabaseService.addRecord('events', {
      event_name: eventName,
      event_data: eventData,
      user_id: userId,
      timestamp: new Date().toISOString()
    });
  }
};

export default supabaseService; 