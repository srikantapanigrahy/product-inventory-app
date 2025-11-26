import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import "../styles/passwordStrength.css"; // optional for better UI

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordScore, setPasswordScore] = useState(0); // zxcvbn score 0-4

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Account created — login now");
      nav("/login");
    } catch (err) {
      alert("Failed to create account");
    }
  };

  const isPasswordStrong = passwordScore >= 3; // require score 3/4
  const doPasswordsMatch =
    form.password.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  return (
    <div className="app-bg">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
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
              placeholder=" "
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <label className="label">Email</label>
          </div>

          {/* Password */}
          <div className="field password-field">
            <input
              className="input"
              placeholder=" "
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <label className="label">Password</label>

            {/* Eye icon */}
            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Password Strength Meter */}
          <PasswordStrengthMeter
            password={form.password}
            setScore={setPasswordScore}
          />

          {/* Confirm Password */}
          <div className="field password-field">
            <input
              className="input"
              placeholder=" "
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <label className="label">Confirm password</label>

            {/* Eye icon */}
            <span
              className="password-eye"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Match Validation */}
          {!doPasswordsMatch && form.confirmPassword && (
            <p className="error-text">Passwords do not match</p>
          )}

          {/* Signup button disabled if weak password OR mismatch */}
          <button
            className="auth-button"
            type="submit"
            disabled={!isPasswordStrong || !doPasswordsMatch}
          >
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
