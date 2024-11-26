import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

/**
 * Authentication Context Type Definition
 * Defines the shape of the authentication context
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null; confirmationRequired: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  signInWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
  inviteUser: (email: string) => Promise<{ error: AuthError | null }>;
  changeEmail: (newEmail: string) => Promise<{ error: AuthError | null }>;
  reauthenticate: () => Promise<{ error: AuthError | null }>;
  confirmSignUp: (token: string) => Promise<{ error: AuthError | null }>;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * Manages authentication state and provides authentication methods
 * Features:
 * - User session management
 * - Sign up functionality
 * - Sign in functionality
 * - Sign out functionality
 * - Password reset
 * - Loading state management
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user has an active subscription
  const checkSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error checking subscription:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('🔐 Initializing auth state...');
    
    const initializeAuth = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Error getting session:', sessionError);
          return;
        }

        if (session) {
          console.log('✅ Found existing session:', session.user.email);
          setUser(session.user);
        } else {
          console.log('ℹ️ No active session found');
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Error during auth initialization:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event, session?.user?.email);
      
      if (session) {
        console.log('✅ Setting user:', session.user.email);
        setUser(session.user);
      } else {
        console.log('ℹ️ Clearing user');
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleaning up auth subscriptions');
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Sign up new user
   * @param email - User's email
   * @param password - User's password
   * @returns Object containing error (if any) and whether email confirmation is required
   */
  const signUp = async (email: string, password: string) => {
    try {
      console.log('🚀 Starting sign up process for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/payment`
        }
      });
      
      if (error) {
        console.error('❌ Sign up error:', error);
        return { error, confirmationRequired: false };
      }

      console.log('✅ Sign up successful:', data);
      return { error: null, confirmationRequired: true };
    } catch (error) {
      console.error('❌ Unexpected error during sign up:', error);
      return { error: error as AuthError, confirmationRequired: false };
    }
  };

  /**
   * Sign in existing user
   * @param email - User's email
   * @param password - User's password
   */
  const signIn = async (email: string, password: string) => {
    console.log('🔑 Attempting sign in for:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Sign in error:', error);
        throw error;
      }

      console.log('✅ Sign in successful:', data.user?.email);
      setUser(data.user);
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  };

  /**
   * Sign out current user
   */
  const signOut = async () => {
    console.log('🚪 Signing out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Sign out error:', error);
        throw error;
      }
      console.log('✅ Sign out successful');
      setUser(null);
    } catch (error) {
      console.error('❌ Sign out error:', error);
      throw error;
    }
  };

  /**
   * Send password reset email
   * @param email - User's email
   */
  const resetPassword = async (email: string) => {
    try {
      console.log('Attempting password reset for:', email);

      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error('Please check your internet connection and try again.');
      }

      // Basic reset password configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        console.error('Password reset error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        
        // Handle specific error cases
        switch (error.status) {
          case 422:
            throw new Error('Please enter a valid email address.');
          case 429:
            throw new Error('Too many attempts. Please wait 60 seconds before trying again.');
          case 500:
            // Check for SendGrid-specific errors
            if (error.message.includes('smtp') || error.message.includes('email')) {
              console.error('SendGrid SMTP error:', error);
              throw new Error('Email service configuration issue. Please contact support.');
            }
            throw new Error('Service error. Please try again in a few minutes.');
          case 503:
            throw new Error('Email service is temporarily unavailable. Please try again in a few minutes.');
          default:
            if (error.message.includes('User not found')) {
              throw new Error('No account found with this email address.');
            } else if (error.message.includes('rate limit')) {
              throw new Error('Too many password reset attempts. Please wait 60 seconds before trying again.');
            } else if (error.message.includes('spam')) {
              throw new Error('Email blocked by spam filters. Please check your spam folder or try a different email address.');
            } else {
              console.error('Unexpected error during password reset:', error);
              throw new Error('Unable to send reset email. Please try again or contact support if the issue persists.');
            }
        }
      }

      console.log('Password reset email request successful');
      return true;
    } catch (err) {
      console.error('Password reset failed:', err);
      throw err;
    }
  };

  /**
   * Sign in with magic link
   * @param email - User's email
   */
  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      return { error };
    } catch (err) {
      console.error('Magic link error:', err);
      return { error: err as AuthError };
    }
  };

  /**
   * Invite a new user
   * @param email - User's email
   */
  const inviteUser = async (email: string) => {
    try {
      const { error } = await supabase.auth.admin.inviteUserByEmail(email);
      return { error };
    } catch (err) {
      console.error('Invite user error:', err);
      return { error: err as AuthError };
    }
  };

  /**
   * Change user's email
   * @param newEmail - New email address
   */
  const changeEmail = async (newEmail: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      return { error };
    } catch (err) {
      console.error('Change email error:', err);
      return { error: err as AuthError };
    }
  };

  /**
   * Reauthenticate the current user
   */
  const reauthenticate = async () => {
    try {
      const { error } = await supabase.auth.reauthenticate();
      return { error };
    } catch (err) {
      console.error('Reauthentication error:', err);
      return { error: err as AuthError };
    }
  };

  /**
   * Confirm sign up with token
   * @param token - Confirmation token
   */
  const confirmSignUp = async (token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup'
      });
      return { error };
    } catch (err) {
      console.error('Confirm signup error:', err);
      return { error: err as AuthError };
    }
  };

  // Create context value object
  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithMagicLink,
    inviteUser,
    changeEmail,
    reauthenticate,
    confirmSignUp
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * @returns Authentication context value
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
