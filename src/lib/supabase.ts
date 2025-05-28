import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
});

// Set up session persistence
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    // Store the session
    localStorage.setItem('supabase.auth.token', session.access_token);
  } else {
    // Clear the session
    localStorage.removeItem('supabase.auth.token');
  }
});