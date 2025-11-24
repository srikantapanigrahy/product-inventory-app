import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // Normal login
  const login = (userData) => {
    if (!userData?.token) {
      console.error("Missing token in login()");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);

    if (userData.apiKey) {
      localStorage.setItem("apiKey", userData.apiKey);
    }

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");
    setUser(null);
  };

  // ⭐ Google Login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const gUser = result.user;

    const userData = {
      email: gUser.email,
      name: gUser.displayName,
      avatar: gUser.photoURL,
      token: await gUser.getIdToken(),
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);

    setUser(userData);
  };

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
