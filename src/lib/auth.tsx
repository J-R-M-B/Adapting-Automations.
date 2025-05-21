import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase';

type UserRole = 'admin' | 'website' | 'phone_agent' | 'social_media' | 'outreach' | 'user';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
  isAllowed: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: User | null;
    session: Session | null;
    loading: boolean;
  }>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setState({
          user: session.user,
          session,
          loading: false,
        });
      } else {
        setState({
          user: null,
          session: null,
          loading: false,
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setState({
          user: session.user,
          session,
          loading: false,
        });
      } else {
        setState({
          user: null,
          session: null,
          loading: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to check if user has a specific role
  const isAllowed = (role: UserRole): boolean => {
    // If user is not authenticated, return false
    if (!state.user) return false;
    
    // For now, assuming email domain check for admin role
    // This can be enhanced to check user metadata or a roles table
    if (role === 'admin') {
      return state.user.email?.endsWith('@adaptingautomations.com') || false;
    }
    
    // Default user role for all authenticated users
    if (role === 'user') {
      return true;
    }
    
    // For other roles, you'd implement more specific checks
    // Possibly querying a user_roles table or checking user metadata
    return false;
  };

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
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('invalid_credentials');
        } else if (error.message.includes('Invalid email')) {
          throw new Error('invalid_email');
        } else if (error.message.includes('Invalid grant')) {
          throw new Error('invalid_grant');
        }
        throw error;
      }

      if (session?.user) {
        setState({
          user: session.user,
          session,
          loading: false,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setState({
      user: null,
      session: null,
      loading: false,
    });
  }

  async function resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: 'Failed to send reset password email. Please try again.' };
    }
  }

  async function updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('Update password error:', error);
      return { error: 'Failed to update password. Please try again.' };
    }
  }

  return (
    <AuthContext.Provider value={{
      user: state.user,
      session: state.session,
      loading: state.loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
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

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}