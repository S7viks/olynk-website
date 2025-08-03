import { supabase, supabaseAdmin } from '../supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'waitlist' | 'user';
  company?: string;
  position?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  permissions: string[];
  can_manage_users: boolean;
  can_manage_content: boolean;
  can_view_analytics: boolean;
  can_manage_settings: boolean;
  created_at: string;
  updated_at: string;
}

export interface WaitlistUser {
  id: string;
  waitlist_position: number;
  priority_level: 'low' | 'normal' | 'high' | 'vip';
  expected_access_date?: string;
  referral_source?: string;
  additional_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  full_name: string;
  company?: string;
  position?: string;
  phone?: string;
}

export interface UpdateProfileData {
  full_name?: string;
  company?: string;
  position?: string;
  phone?: string;
  avatar_url?: string;
}

class AuthService {
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  // Get current session
  async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  // Sign up new user (defaults to waitlist role)
  async signUp(data: SignupData): Promise<{ user: User | null; error: AuthError | null }> {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          company: data.company,
          position: data.position,
          phone: data.phone,
        }
      }
    });

    return { user: authData.user, error };
  }

  // Sign in user
  async signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (data.user && !error) {
      // Update last login
      await this.updateLastLogin(data.user.id);
    }

    return { user: data.user, error };
  }

  // Sign out user
  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  // Reset password
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  }

  // Update password
  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  }

  // Get user profile
  async getUserProfile(userId?: string): Promise<{ profile: UserProfile | null; error: any }> {
    const currentUser = await this.getCurrentUser();
    const targetUserId = userId || currentUser?.id;

    if (!targetUserId) {
      return { profile: null, error: 'No user ID provided' };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', targetUserId)
      .single();

    return { profile: data, error };
  }

  // Update user profile
  async updateUserProfile(data: UpdateProfileData): Promise<{ profile: UserProfile | null; error: any }> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      return { profile: null, error: 'No authenticated user' };
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .update(data)
      .eq('id', currentUser.id)
      .select()
      .single();

    return { profile, error };
  }

  // Get admin user data
  async getAdminUser(userId?: string): Promise<{ adminUser: AdminUser | null; error: any }> {
    const currentUser = await this.getCurrentUser();
    const targetUserId = userId || currentUser?.id;

    if (!targetUserId) {
      return { adminUser: null, error: 'No user ID provided' };
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', targetUserId)
      .single();

    return { adminUser: data, error };
  }

  // Get waitlist user data
  async getWaitlistUser(userId?: string): Promise<{ waitlistUser: WaitlistUser | null; error: any }> {
    const currentUser = await this.getCurrentUser();
    const targetUserId = userId || currentUser?.id;

    if (!targetUserId) {
      return { waitlistUser: null, error: 'No user ID provided' };
    }

    const { data, error } = await supabase
      .from('waitlist_users')
      .select('*')
      .eq('id', targetUserId)
      .single();

    return { waitlistUser: data, error };
  }

  // Check if user is admin
  async isAdmin(userId?: string): Promise<boolean> {
    const { profile } = await this.getUserProfile(userId);
    return profile?.role === 'admin';
  }

  // Check if user is on waitlist
  async isWaitlistUser(userId?: string): Promise<boolean> {
    const { profile } = await this.getUserProfile(userId);
    return profile?.role === 'waitlist';
  }

  // Get all users (admin only)
  async getAllUsers(): Promise<{ users: UserProfile[]; error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { users: [], error: 'Unauthorized: Admin access required' };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    return { users: data || [], error };
  }

  // Get all waitlist users (admin only)
  async getAllWaitlistUsers(): Promise<{ users: WaitlistUser[]; error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { users: [], error: 'Unauthorized: Admin access required' };
    }

    const { data, error } = await supabase
      .from('waitlist_users')
      .select(`
        *,
        user_profiles (
          id,
          email,
          full_name,
          company,
          position,
          phone
        )
      `)
      .order('waitlist_position', { ascending: true });

    return { users: data || [], error };
  }

  // Update user role (admin only)
  async updateUserRole(userId: string, role: 'admin' | 'waitlist' | 'user'): Promise<{ error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { error: 'Unauthorized: Admin access required' };
    }

    const { error } = await supabase
      .from('user_profiles')
      .update({ role })
      .eq('id', userId);

    return { error };
  }

  // Update waitlist position (admin only)
  async updateWaitlistPosition(userId: string, position: number): Promise<{ error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { error: 'Unauthorized: Admin access required' };
    }

    const { error } = await supabase
      .from('waitlist_users')
      .update({ waitlist_position: position })
      .eq('id', userId);

    return { error };
  }

  // Update waitlist priority (admin only)
  async updateWaitlistPriority(userId: string, priority: 'low' | 'normal' | 'high' | 'vip'): Promise<{ error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { error: 'Unauthorized: Admin access required' };
    }

    const { error } = await supabase
      .from('waitlist_users')
      .update({ priority_level: priority })
      .eq('id', userId);

    return { error };
  }

  // Delete user (admin only)
  async deleteUser(userId: string): Promise<{ error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { error: 'Unauthorized: Admin access required' };
    }

    // Use admin client to delete user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    return { error };
  }

  // Update last login
  private async updateLastLogin(userId: string): Promise<void> {
    await supabase
      .from('user_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Get user count by role
  async getUserCountByRole(): Promise<{ counts: { admin: number; waitlist: number; user: number }; error: any }> {
    const isAdminUser = await this.isAdmin();
    if (!isAdminUser) {
      return { counts: { admin: 0, waitlist: 0, user: 0 }, error: 'Unauthorized: Admin access required' };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('role');

    if (error) {
      return { counts: { admin: 0, waitlist: 0, user: 0 }, error };
    }

    const counts = {
      admin: data?.filter(u => u.role === 'admin').length || 0,
      waitlist: data?.filter(u => u.role === 'waitlist').length || 0,
      user: data?.filter(u => u.role === 'user').length || 0,
    };

    return { counts, error: null };
  }
}

export const authService = new AuthService();
export default authService; 