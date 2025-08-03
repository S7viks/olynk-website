import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import authService, { UserProfile, AdminUser, WaitlistUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  adminUser: AdminUser | null;
  waitlistUser: WaitlistUser | null;
  isAdmin: boolean;
  isWaitlistUser: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (data: any) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (data: any) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [waitlistUser, setWaitlistUser] = useState<WaitlistUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = profile?.role === 'admin';
  const isWaitlistUser = profile?.role === 'waitlist';

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const currentSession = await authService.getCurrentSession();
        setSession(currentSession);
        setUser(currentSession?.user || null);

        if (currentSession?.user) {
          await loadUserData(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setProfile(null);
          setAdminUser(null);
          setWaitlistUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      // Load user profile
      const { profile: userProfile } = await authService.getUserProfile(userId);
      setProfile(userProfile);

      if (userProfile?.role === 'admin') {
        // Load admin user data
        const { adminUser: adminData } = await authService.getAdminUser(userId);
        setAdminUser(adminData);
      } else if (userProfile?.role === 'waitlist') {
        // Load waitlist user data
        const { waitlistUser: waitlistData } = await authService.getWaitlistUser(userId);
        setWaitlistUser(waitlistData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await authService.signIn({ email, password });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (data: any) => {
    try {
      const { error } = await authService.signUp(data);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await authService.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await authService.resetPassword(email);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const { error } = await authService.updateUserProfile(data);
      if (!error) {
        await refreshProfile();
      }
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserData(user.id);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    adminUser,
    waitlistUser,
    isAdmin,
    isWaitlistUser,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 