import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

const STORAGE_KEY = "foodflow-auth";
const TOKEN_KEY = "foodflow-token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          const response = await authApi.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(response.user));
          }
        }
      } catch (err) {
        console.error("Session restore failed:", err);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async ({ email, password }) => {
    setError(null);
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const response = await authApi.login({ email, password });
      
      if (response.success && response.user && response.token) {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.user));
        setUser(response.user);
        return response.user;
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err) {
      const errorMsg = err.message || "Login failed";
      setError(errorMsg);
      throw err;
    }
  };

  const register = async (payload) => {
    setError(null);
    try {
      const response = await authApi.register(payload);
      
      if (response.success && response.user && response.token) {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.user));
        setUser(response.user);
        return response.user;
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (err) {
      const errorMsg = err.message || "Registration failed";
      setError(errorMsg);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
  };

  const completeOnboarding = () => {
    setUser((prev) => prev ? { ...prev, is_onboarding_completed: true } : null);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user, is_onboarding_completed: true }));
    }
  };

  const value = useMemo(
    () => ({
      user,
      role: user?.role || "CUSTOMER",
      isAuthenticated: !!user,
      isLoading,
      error,
      login,
      register,
      logout,
      completeOnboarding,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
