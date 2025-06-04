import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '../../shared/src/types/user';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  login: (email: string, password: string) => Promise<UserProfile>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: 'athlete' | 'recruiter',
    sport?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const { token, user } = JSON.parse(stored);
      setToken(token);
      setUser(user);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      email,
      password,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem('auth', JSON.stringify(res.data));
    return res.data.user as UserProfile;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: 'athlete' | 'recruiter',
    sport?: string
  ) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      name,
      email,
      password,
      role,
      sport,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem('auth', JSON.stringify(res.data));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
