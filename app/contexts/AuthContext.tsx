// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "lucia"; // Ensure this is the correct import path for Lucia's User type

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user when the app loads
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        // Optionally handle the error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Optionally, render a loading state or spinner
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
