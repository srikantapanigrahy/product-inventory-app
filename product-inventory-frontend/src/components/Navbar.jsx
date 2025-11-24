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
      {/* APP TITLE */}
      <div className="navbar-title" data-testid="navbar-title">
        📦 InventoryApp
      </div>

      {/* NAV LINKS */}
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
          data-tooltip="Manage Items"
        >
          Items
        </NavLink>

        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          data-testid="nav-sales"
          data-tooltip="View Sales"
        >
          Sales
        </NavLink>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="nav-actions">
        {/* THEME TOGGLE */}
        <button
          onClick={toggle}
          className="theme-toggle"
          data-testid="theme-toggle"
        >
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="logout-button"
          data-testid="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
