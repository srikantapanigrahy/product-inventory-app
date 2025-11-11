import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Sales from "./pages/Sales";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Centralized application routes
export default function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* ✅ Toast Container (global notifications) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
