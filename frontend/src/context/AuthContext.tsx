import React, { useState, useEffect } from "react";
import type { User } from "../types/auth";
import { AuthContext } from "./useAuth";
import { postAuthLogin } from "../api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    const loginData = await postAuthLogin({ email, password });
    const token = loginData.token;
    console.log("token: ", token);
    if (email === "admin" && password === "123") {
      const userData = { email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      throw new Error("Credenciais inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
