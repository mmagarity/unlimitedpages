/**
 * Supabase Client Configuration
 * This file initializes and exports the Supabase client for use throughout the application
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bjffotfpudthwkezppub.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZmZvdGZwdWR0aHdrZXpwcHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjQ2MDUsImV4cCI6MjAyNTUwMDYwNX0.Nt0YPjEZ6qkOTBFCQQJxlhVFYvTJBLFgUVNdZNPvvBE'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

// Create Supabase client with auth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
