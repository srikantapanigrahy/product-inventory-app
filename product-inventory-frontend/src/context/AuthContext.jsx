import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state for smoother transitions

  // ✅ Restore user from localStorage on app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
      localStorage.clear(); // In case of corrupted data
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Login and persist data
  const login = (userData) => {
    if (!userData?.token) {
      console.error("⚠️ Missing token in userData during login.");
      return;
    }
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    if (userData.apiKey) {
      localStorage.setItem("apiKey", userData.apiKey);
    }
    setUser(userData);
  };

  // ✅ Logout and clear everything
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");
    setUser(null);
  };

  // ✅ If still loading user, show a fallback (optional)
  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
