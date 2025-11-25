import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();

      const userData = {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        avatar: firebaseUser.photoURL,
        token: token,
      };

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      setUser(userData);
    } else {
      // User logged out
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setLoading(false);
  });

  return () => unsubscribe();
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
