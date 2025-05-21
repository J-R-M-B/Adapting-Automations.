import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase';

type UserRole = 'admin' | 'website' | 'chatbot' | 'phone_agent' | 'social_media' | 'outreach' | 'user';

interface UserData {
  role: UserRole;
  details: {
    first_name?: string;
    last_name?: string;
    country?: string;
    phone?: string;
    account_data?: Record<string, any>;
  };
  settings: {
    language_preference: string;
    theme: string;
    notifications: Record<string, any>;
  };
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAllowed: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: User | null;
    userData: UserData | null;
    loading: boolean;
  }>({
    user: null,
    userData: null,
    loading: true,
  });

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleError) throw roleError;

      // Fetch user details
      const { data: detailsData, error: detailsError } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (detailsError) throw detailsError;

      // Fetch user settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (settingsError) throw settingsError;

      return {
        role: roleData.role,
        details: detailsData,
        settings: settingsData
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        setState({
          user: session.user,
          userData,
          loading: false,
        });
      } else {
        setState({
          user: null,
          userData: null,
          loading: false,
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        setState({
          user: session.user,
          userData,
          loading: false,
        });
      } else {
        setState({
          user: null,
          userData: null,
          loading: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signUp(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error('Signup error:', error);
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('Signup error:', error);
      return { error: 'Failed to create account. Please try again.' };
    }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  function isAllowed(requiredRole: UserRole): boolean {
    if (!state.userData) return false;
    if (state.userData.role === 'admin') return true;
    return state.userData.role === requiredRole;
  }

  return (
    <AuthContext.Provider value={{
      user: state.user,
      userData: state.userData,
      loading: state.loading,
      signUp,
      signIn,
      signOut,
      isAllowed,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function RequireAuth({ children, requiredRole }: { children: React.ReactNode, requiredRole?: UserRole }) {
  const { user, loading, isAllowed } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !isAllowed(requiredRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}