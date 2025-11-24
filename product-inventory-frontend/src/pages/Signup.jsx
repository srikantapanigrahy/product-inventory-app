import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Signup(){
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await api.post("/auth/signup", form);
      alert("Account created — login now");
      nav("/login");
    }catch(e){
      alert("Failed to create account");
    }
  };

  return (
    <div className="app-bg">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input className="input" placeholder=" " value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
            <label className="label">Full name</label>
          </div>

          <div className="field">
            <input className="input" placeholder=" " type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            <label className="label">Email</label>
          </div>

          <div className="field">
            <input className="input" placeholder=" " type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
            <label className="label">Password</label>
          </div>

          <button className="auth-button" type="submit">Sign up</button>
        </form>

        <div className="socials">
          <button className="social-btn social-google" onClick={()=>alert("Google signup (stub)")}>Google</button>
          <button className="social-btn social-github" onClick={()=>alert("GitHub signup (stub)")}>GitHub</button>
        </div>

        <p className="small">
          Already have an account? <span className="link" onClick={()=>nav("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}
