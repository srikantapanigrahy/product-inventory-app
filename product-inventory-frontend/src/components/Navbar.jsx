import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-title" data-testid="navbar-title">
        📦 InventoryApp
      </div>

      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          data-testid="nav-dashboard"
          data-tooltip="Go to Dashboard"
          
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/items"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          data-testid="nav-items"
          data-tooltip="Manage your Items"
        >
          Items
        </NavLink>

        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          data-testid="nav-sales"
          data-tooltip="View Sales History"
        >
          Sales
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="logout-button"
        data-testid="logout-button"
      >
        Logout
      </button>
      <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
        <button onClick={toggle} style={{
          padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
          background: "transparent", color: "var(--text)"
        }}>
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}
