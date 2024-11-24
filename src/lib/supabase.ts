import { createClient } from '@supabase/supabase-js';

// Force the new URL
const supabaseUrl = 'https://dhyhecbslbeehhnuwxtv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoeWhlY2JzbGJlZWhobnV3eHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNzE0MDAsImV4cCI6MjA0Nzk0NzQwMH0.7TH-n0OjOk0EC_SjNu66KmIBXGFE_AXnrZtryadJig0';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase configuration:', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing'
  });
  throw new Error('Missing Supabase configuration');
}

console.log('🔧 Initializing Supabase client with:', { url: supabaseUrl });

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'unlimitedpages@1.0.0'
    }
  }
});