import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import { useTheme } from "../context/ThemeContext";
import "./../styles/authButtons.css";
import googleLogo from "../assets/google.png";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const nav = useNavigate();
  const { theme } = useTheme();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Normal login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login({ token: res.data.token });
      nav("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  // Google Login
  const handleGoogle = async () => {
    try {
      await googleLogin();   // AuthContext handles token + backend call
      nav("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google Sign-in failed");
    }
  };

  return (
    <div className="app-bg">
      <div className="auth-card" role="main" aria-labelledby="login-title">
        <h1 id="login-title" className="auth-title">
          Welcome back
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} aria-label="Login form">
          <div className="field">
            <input
              data-testid="login-email"
              className="input"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <label className="label">Email address</label>
          </div>

          <div className="field">
            <input
              data-testid="login-password"
              className="input"
              type="password"
              placeholder=" "
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <label className="label">Password</label>
          </div>

          <button data-testid="login-button" className="auth-button" type="submit">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="row">
          <div className="small">Or continue with</div>
        </div>

        {/* Social Login Section */}
        <div className="socials" role="list">

          {/* Google Login (Actual Button) */}
          <button className="google-btn" onClick={handleGoogle}>
            <img src={googleLogo} className="google-icon" alt="Google" />
            Continue with Google
          </button>
        </div>

        <p className="small">
          <span className="link" onClick={() => nav("/signup")}>
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
