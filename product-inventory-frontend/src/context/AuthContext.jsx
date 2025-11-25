import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Normal Login (email/password)
  const login = (userData) => {
    if (!userData?.token) {
      console.error("Login failed: Missing token");
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

  // ⭐ Google Login (Fixed)
  const googleLogin = async () => {
    try {
      // 1. Login with Firebase popup
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // 2. Get Firebase ID Token
      const idToken = await firebaseUser.getIdToken();

      // 3. Send Firebase token to backend
      const res = await api.post("/auth/google", { idToken });

      // 4. Backend JWT
      const backendToken = res.data.token;
      const backendUser = res.data.user;

      const userData = {
        email: backendUser.email,
        name: backendUser.name,
        avatar: backendUser.avatar,
        token: backendToken, // our backend JWT
      };

      // 5. Save JWT + user
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", backendToken);

      setUser(userData);
    } catch (err) {
      console.error("Google login failed:", err);
      throw err;
    }
  };

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
