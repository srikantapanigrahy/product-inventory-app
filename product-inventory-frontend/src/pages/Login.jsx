import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { theme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });

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

  // social stubs
  const socialLogin = (provider) => {
    // stub - replace with real oauth flow
    alert(`Social login: ${provider} (stub)`);
  };

  return (
    <div className="app-bg">
      <div className="auth-card" role="main" aria-labelledby="login-title">
        <h1 id="login-title" className="auth-title">Welcome back</h1>

        <form onSubmit={handleSubmit} aria-label="Login form">
          <div className="field">
            <input
              data-testid="login-email"
              className="input"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={(e)=>setForm({...form,email:e.target.value})}
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
              onChange={(e)=>setForm({...form,password:e.target.value})}
              required
            />
            <label className="label">Password</label>
          </div>

          <button data-testid="login-button" className="auth-button" type="submit">
            Login
          </button>
        </form>

        <div className="row">
          <div className="small">Or continue with</div>
          <div style={{width:8}} />
        </div>

        <div className="socials" role="list">
          <button className="social-btn social-google" onClick={()=>socialLogin("google")} aria-label="Sign in with Google">
            <img src="/logo192.png" alt="" style={{width:18,height:18}}/>
            <span>Google</span>
          </button>
          <button className="social-btn social-github" onClick={()=>socialLogin("github")} aria-label="Sign in with GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.38.5 0 5.88 0 12.5c0 5.28 3.438 9.748 8.205 11.327.6.112.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.617-4.042-1.617-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.49.997.107-.775.418-1.305.76-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.137 3.003.403 2.29-1.553 3.297-1.23 3.297-1.23.654 1.653.243 2.873.12 3.176.77.84 1.23 1.913 1.23 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.813 1.103.813 2.222 0 1.605-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.246 24 17.78 24 12.5 24 5.88 18.62.5 12 .5z"/></svg>
            <span>GitHub</span>
          </button>
        </div>

        <p className="small">
          <span className="link" onClick={()=>nav("/signup")}>Create account</span>
        </p>
      </div>
    </div>
  );
}
