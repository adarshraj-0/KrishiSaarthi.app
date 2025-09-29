
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { UserRole } from '@/lib/types';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userName: string | null;
  userEmail: string | null;
}

interface AuthContextType extends AuthState {
  login: (role: UserRole, name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ 
    isAuthenticated: false, 
    userRole: null,
    userName: null,
    userEmail: null
  });

  useEffect(() => {
    // Check for saved auth state in localStorage
    try {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        if (parsedAuth.isAuthenticated) {
          setAuth(parsedAuth);
        }
      }
    } catch (error) {
      console.error("Failed to parse auth from localStorage", error);
      localStorage.removeItem('auth');
    }
  }, []);

  const login = (role: UserRole, name: string, email: string) => {
    const newAuth = { isAuthenticated: true, userRole: role, userName: name, userEmail: email };
    setAuth(newAuth);
    try {
      localStorage.setItem('auth', JSON.stringify(newAuth));
    } catch (error) {
      console.error("Failed to save auth to localStorage", error);
    }
  };

  const logout = () => {
    const newAuth = { isAuthenticated: false, userRole: null, userName: null, userEmail: null };
    setAuth(newAuth);
    try {
      localStorage.removeItem('auth');
    } catch (error) {
      console.error("Failed to remove auth from localStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
