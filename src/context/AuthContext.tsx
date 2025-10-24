import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = (): boolean => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        const userData = JSON.parse(session);
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem(SESSION_KEY);
    }
    setUser(null);
    setIsAuthenticated(false);
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validate input
      if (!email || !password) {
        toast.error('Please enter both email and password');
        return false;
      }

      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = { email: foundUser.email, name: foundUser.name };
        localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials. Please try again.');
        return false;
      }
    } catch (error) {
      toast.error('An error occurred during login');
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Validate input
      if (!email || !password || !name) {
        toast.error('Please fill in all fields');
        return false;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        toast.error('User already exists with this email');
        return false;
      }

      // Add new user
      const newUser = { email, password, name };
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Auto login
      const userData = { email, name };
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('An error occurred during signup');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, checkAuth }}>
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
