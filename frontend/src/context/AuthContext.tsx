import React, { useState, useEffect } from "react";
import type { User } from "../types/auth";
import { AuthContext } from "./useAuth";
import { postAuthLogin } from "../api";
import api from "../services/axios";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  const login = async (email: string, password: string) => {
    const loginData = await postAuthLogin({ email, password });
    const tokenData = loginData.token;

    if (tokenData) {
      setToken(tokenData);
      const userData = { email };
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      throw new Error("Invalid credentials");
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
