/**
 * Supabase Client Configuration
 * This file initializes and exports the Supabase client for use throughout the application
 * 
 * Environment Variables Required:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase project's anon key
 */

import { createClient } from '@supabase/supabase-js'

// Get environment variables, with fallback to process.env for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing Supabase URL. Please check your environment variables.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase Anon Key. Please check your environment variables.')
}

// Create and export Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
