import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css"; // optional global styles
import { ThemeProvider } from "./context/ThemeContext";

// ✅ Create root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ StrictMode for highlighting potential issues in development
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
