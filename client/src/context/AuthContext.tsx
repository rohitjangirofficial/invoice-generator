// src/context/AuthContext.tsx
import API from "@/api";
import Loading from "@/components/common/Loading";
import axios from "axios";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define types
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await API.get("/admin/verify", {
          withCredentials: true,
        });
        setLoading(false);
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    verifyAdmin();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
