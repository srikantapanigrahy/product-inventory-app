import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", form);
      alert("Account created — login now");
      nav("/login");
    } catch (e) {
      alert("Failed to create account");
    }
  };

  return (
    <div className="app-bg">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="field">
            <input
              className="input"
              placeholder=" "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <label className="label">Full name</label>
          </div>

          {/* Email */}
          <div className="field">
            <input
              className="input"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <label className="label">Email</label>
          </div>

          {/* Password */}
          <div className="field">
            <input
              className="input"
              type="password"
              placeholder=" "
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <label className="label">Password</label>
          </div>

          {/* ⭐ Password Strength Meter */}
          <PasswordStrengthMeter
            password={form.password}
            email={form.email}
          />

          <button className="auth-button" type="submit">
            Sign up
          </button>
        </form>

        <p className="small">
          Already have an account?{" "}
          <span className="link" onClick={() => nav("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
