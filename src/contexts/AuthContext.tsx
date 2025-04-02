
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    username: "muser",
    password: "muser",
    type: "company",
    name: "Mock Company Owner",
    email: "owner@example.com",
  },
  {
    id: 2,
    username: "mpe",
    password: "mpe",
    type: "investor",
    name: "Mock Private Equity",
    email: "investor@example.com",
  },
];

interface User {
  id: number;
  username: string;
  type: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // Mock login - in a real app, this would call the API
  const login = async (username: string, password: string) => {
    // First check mock users (for frontend testing without backend)
    const mockUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (mockUser) {
      const { password, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      return true;
    }

    // If no mock user, try API (this would work when backend is running)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.name}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password",
        });
        return false;
      }
    } catch (error) {
      // If API call fails, show login error but don't prevent mock users from working
      if (!mockUser) {
        toast({
          variant: "destructive",
          title: "Login error",
          description: "Backend not available. Try mock users: muser/muser or mpe/mpe",
        });
        return false;
      }
      return true;
    }
  };

  // Mock register - in a real app, this would call the API
  const register = async (userData: any) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast({
          title: "Registration successful",
          description: "You can now login with your credentials",
        });
        return true;
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorData.message || "Something went wrong",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "Backend not available. Please use mock users for testing: muser/muser or mpe/mpe",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
