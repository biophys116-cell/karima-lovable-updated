import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, getCurrentUser, login as doLogin, register as doRegister, logout as doLogout, initializeData } from '@/lib/data-store';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider - Manages global authentication state
 * Provides user context and auth methods to entire app
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user on mount
  useEffect(() => {
    try {
      initializeData();
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize auth';
      console.error('❌ Auth initialization error:', err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized login function
  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = await Promise.resolve(doLogin(email, password));
      
      if (user) {
        setUser(user);
        return user;
      } else {
        setError('Invalid email or password');
        return null;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      console.error('❌ Login error:', err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized register function
  const register = useCallback(async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      const user = await Promise.resolve(doRegister(name, email, password));
      
      if (user) {
        setUser(user);
        return user;
      } else {
        setError('Email already registered');
        return null;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      console.error('❌ Register error:', err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await doLogout();
      setUser(null);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      console.error('❌ Logout error:', err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin' || false,
        isLoggedIn: !!user,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
