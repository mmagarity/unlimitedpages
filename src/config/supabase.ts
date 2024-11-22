/**
 * Supabase Client Configuration
 * This file initializes and exports the Supabase client for use throughout the application
 * 
 * Environment Variables Required:
 * - REACT_APP_SUPABASE_URL: Your Supabase project URL
 * - REACT_APP_SUPABASE_ANON_KEY: Your Supabase project's anon/public key
 */

import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
