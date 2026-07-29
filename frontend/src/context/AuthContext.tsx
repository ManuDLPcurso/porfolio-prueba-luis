import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient } from '../config/api';
import { UserProfile, UserRole } from '../types';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  role: UserRole;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isAuthorized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchProfile(userData.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const data = await apiClient.get<UserProfile>(`/profile?userId=${userId}`);
      if (data && data.role) {
        setProfile(data);
      } else {
        setProfile({
          id: 0,
          email: '',
          role: 'guest',
          full_name: null,
          created_at: '',
        });
      }
    } catch {
      setProfile({
        id: 0,
        email: '',
        role: 'guest',
        full_name: null,
        created_at: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await apiClient.post<{ user: User; token: string }>('/auth/login', {
        email,
        password,
      });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      if (data.user.email === 'admin@lotr.com') {
        setProfile({
          id: 1,
          email: data.user.email,
          role: 'admin',
          full_name: 'Admin',
          created_at: new Date().toISOString(),
        });
        setLoading(false);
      } else {
        await fetchProfile(data.user.id);
      }

      return { error: null };
    } catch (error) {
      return { error: 'Credenciales inválidas' };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const role: UserRole = profile?.role ?? 'guest';

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      role,
      loading,
      signIn,
      signOut,
      isAdmin: role === 'admin',
      isAuthorized: role === 'admin' || role === 'authorized',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
