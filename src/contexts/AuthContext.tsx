import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

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
  resetPassword: (email: string) => Promise<void>;
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

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Sign up new user
   * @param email - User's email
   * @param password - User's password
   * @returns Object containing error (if any) and whether email confirmation is required
   */
  const signUp = async (email: string, password: string) => {
    try {
      console.log('Starting sign up process for:', email);
      
      // First, check if user exists - using auth API instead of direct DB query
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy-password-for-check'
      });

      if (!signInError || (signInError && !signInError.message.includes('Invalid login credentials'))) {
        return {
          error: {
            message: 'An account with this email already exists. Please sign in instead.',
            name: 'UserExistsError',
            status: 400
          } as AuthError,
          confirmationRequired: false
        };
      }

      // Proceed with sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: true
          }
        }
      });
      
      if (error) {
        console.error('Supabase sign up error:', error);
        return {
          error,
          confirmationRequired: false
        };
      }

      console.log('Sign up response:', {
        user: data?.user?.id,
        identities: data?.user?.identities?.length,
        confirmed: data?.user?.confirmed_at
      });
      
      // Only create profile if we have a user ID
      if (data?.user?.id) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                email: email,
                created_at: new Date().toISOString()
              }
            ]);

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
        } catch (profileErr) {
          console.error('Unexpected error creating profile:', profileErr);
        }
      }
      
      return {
        error: null,
        confirmationRequired: data?.user?.identities?.length === 0 || data?.user?.confirmed_at === null
      };
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      return {
        error: {
          message: 'An unexpected error occurred. Please try again.',
          name: 'UnexpectedError',
          status: 500
        } as AuthError,
        confirmationRequired: false
      };
    }
  };

  /**
   * Sign in existing user
   * @param email - User's email
   * @param password - User's password
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  /**
   * Sign out current user
   */
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Send password reset email
   * @param email - User's email
   */
  const resetPassword = async (email: string) => {
    try {
      console.log('Attempting password reset for:', email);

      // Send reset email with specific options
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
        captchaToken: undefined,
      });

      if (error) {
        console.error('Password reset error:', error);
        // Check for specific error types
        if (error.message?.includes('rate limit')) {
          throw new Error('Too many attempts. Please try again in a few minutes.');
        } else if (error.status === 500) {
          throw new Error('Service temporarily unavailable. Please try again later.');
        } else if (error.status === 422) {
          throw new Error('Invalid email format. Please check your email address.');
        } else {
          throw error;
        }
      }

      console.log('Password reset email sent successfully');
    } catch (err) {
      console.error('Password reset failed:', err);
      throw err;
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
