import { supabase, supabaseAdmin } from '../supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'waitlist' | 'user';
  tenant_id?: string | null;
  company?: string;
  position?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug?: string | null;
  created_at: string;
  updated_at: string;
}

export type TenantMembershipRole = 'owner' | 'admin' | 'member';

export interface TenantMembership {
  tenant_id: string;
  user_id: string;
  role: TenantMembershipRole;
  created_at: string;
  updated_at: string;
}

export interface OnboardingSubmission {
  tenant_id: string;
  created_by?: string | null;
  answers: Record<string, unknown>;
  pilot_key?: string | null;
  pilot_routing?: Record<string, unknown> | null;
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

export interface EnsureWaitlistOptions {
  referral_source?: string;
  additional_notes?: string;
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
  tenant_id?: string | null;
}

class AuthService {
  private deriveTenantName(profile: UserProfile | null, user: User): string {
    const company = profile?.company?.trim();
    if (company) return company;
    const email = user.email?.trim();
    if (email && email.includes('@')) {
      const domain = email.split('@')[1];
      if (domain) return domain;
    }
    return 'New workspace';
  }

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

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // If it's a 500 error, it might be a database schema issue
        if (error.code === '500') {
          return { profile: null, error: 'Database schema issue. Please check if user_profiles table exists and RLS policies are set up correctly.' };
        }
        return { profile: null, error };
      }

      return { profile: data, error: null };
    } catch (err: any) {
      console.error('Exception in getUserProfile:', err);
      return { profile: null, error: err.message || 'Failed to fetch user profile' };
    }
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

  /**
   * Ensure the current user has a tenant (workspace) attached.
   * - If `user_profiles.tenant_id` already exists, return it.
   * - Otherwise: create a tenant, create membership (owner), and update `user_profiles.tenant_id`.
   */
  async ensureTenantForCurrentUser(): Promise<{ tenantId: string | null; error: any }> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) return { tenantId: null, error: 'No authenticated user' };

    const { profile, error: profileError } = await this.getUserProfile(currentUser.id);
    if (profileError) return { tenantId: null, error: profileError };

    const existingTenantId = profile?.tenant_id || null;
    if (existingTenantId) return { tenantId: existingTenantId, error: null };

    const tenantName = this.deriveTenantName(profile, currentUser);

    const { data: tenantRow, error: tenantError } = await supabase
      .from('tenants')
      .insert({ name: tenantName })
      .select('id')
      .single();
    if (tenantError) return { tenantId: null, error: tenantError };

    const tenantId = tenantRow?.id as string | undefined;
    if (!tenantId) return { tenantId: null, error: 'Failed to create tenant' };

    const { error: membershipError } = await supabase.from('tenant_memberships').insert({
      tenant_id: tenantId,
      user_id: currentUser.id,
      role: 'owner',
    });
    if (membershipError) return { tenantId: null, error: membershipError };

    const { error: attachError } = await supabase
      .from('user_profiles')
      .update({ tenant_id: tenantId })
      .eq('id', currentUser.id);
    if (attachError) return { tenantId: null, error: attachError };

    return { tenantId, error: null };
  }

  async upsertTenantOnboarding(input: {
    tenantId: string;
    answers: Record<string, unknown>;
    pilotKey?: string | null;
    pilotRouting?: Record<string, unknown> | null;
  }): Promise<{ submission: OnboardingSubmission | null; error: any }> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) return { submission: null, error: 'No authenticated user' };

    const payload = {
      tenant_id: input.tenantId,
      created_by: currentUser.id,
      answers: input.answers,
      pilot_key: input.pilotKey ?? null,
      pilot_routing: input.pilotRouting ?? null,
    };

    const { data, error } = await supabase
      .from('onboarding_submissions')
      .upsert(payload, { onConflict: 'tenant_id' })
      .select('*')
      .single();

    return { submission: data as OnboardingSubmission | null, error };
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

  /**
   * Ensure the currently authenticated user is marked as a waitlist user.
   * - Best-effort updates `user_profiles.role` to `waitlist` (if RLS allows)
   * - Upserts into `waitlist_users`
   */
  async ensureWaitlistOnAuth(options: EnsureWaitlistOptions = {}): Promise<{ error: any }> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) return { error: 'No authenticated user' };

    // 1) Ensure role is waitlist (best effort)
    try {
      await supabase
        .from('user_profiles')
        .update({ role: 'waitlist' })
        .eq('id', currentUser.id);
    } catch {
      // ignore (RLS may block this)
    }

    // 2) Ensure waitlist_users record exists
    try {
      const { data: existing, error: existingError } = await supabase
        .from('waitlist_users')
        .select('id')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (existingError) {
        // fall through and try insert anyway
        console.warn('waitlist_users select failed:', existingError);
      }

      if (existing?.id) {
        const { error } = await supabase
          .from('waitlist_users')
          .update({
            referral_source: options.referral_source,
            additional_notes: options.additional_notes,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentUser.id);
        return { error };
      }

      // Attempt insert with defaults.
      const insertPayload: Partial<WaitlistUser> & { id: string } = {
        id: currentUser.id,
        // priority_level defaults to normal in most schemas; provide a sane fallback:
        priority_level: 'normal',
        referral_source: options.referral_source,
        additional_notes: options.additional_notes,
      };

      const { error: insertError } = await supabase.from('waitlist_users').insert(insertPayload);
      if (!insertError) return { error: null };

      // Fallback for schemas that require explicit waitlist_position.
      const { data: lastRow, error: lastError } = await supabase
        .from('waitlist_users')
        .select('waitlist_position')
        .order('waitlist_position', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (lastError) return { error: insertError };

      const nextPosition = (lastRow?.waitlist_position || 0) + 1;
      const { error: insertWithPosError } = await supabase.from('waitlist_users').insert({
        ...insertPayload,
        waitlist_position: nextPosition,
      });

      return { error: insertWithPosError };
    } catch (error: any) {
      return { error: error?.message || error };
    }
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