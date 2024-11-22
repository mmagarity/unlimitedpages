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
      
      // First, check if user exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
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
        
        // Handle specific error cases
        if (error.message.includes('Database error')) {
          return {
            error: {
              message: 'Unable to create account at this time. Please try again later.',
              name: 'DatabaseError',
              status: 500
            } as AuthError,
            confirmationRequired: false
          };
        }
        
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
      
      // Create profile entry
      if (data?.user?.id) {
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
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
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
