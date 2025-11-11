import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
// import { useAuth } from "../context/AuthContext";
//import Navbar from "../components/Navbar";
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/dashboard/summary");
        console.log("✅ Dashboard summary:", res.data);
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Unable to fetch dashboard summary");
      }
    };

    fetchSummary();
  }, []);

  // ⚠️ Handle Error State
  if (error) {
    return (
      <>
        <Navbar data-testid="navbar" />
        <div data-testid="dashboard-error" style={{ padding: "2rem" }}>
          <h2 data-testid="error-title">⚠️ Error</h2>
          <p data-testid="error-message">{error}</p>
        </div>
      </>
    );
  }

  // ⏳ Handle Loading State
  if (!summary) {
    return (
      <>
        <Navbar data-testid="navbar" />
        <div data-testid="dashboard-loading" style={{ padding: "2rem" }}>
          <h3>Loading dashboard...</h3>
        </div>
      </>
    );
  }

  // ✅ Render Main Dashboard
  return (
    <>
      <Navbar data-testid="navbar" />
      <div
        data-testid="dashboard-page"
        style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}
      >
        <h2 data-testid="dashboard-title">📊 Business Summary</h2>

        {/* Cards Section */}
        <div
          data-testid="dashboard-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <div data-testid="dashboard-total-items-card" style={cardStyle}>
            <h3>Total Items</h3>
            <p data-testid="dashboard-total-items">{summary.totalItems}</p>
          </div>

          <div data-testid="dashboard-total-sales-card" style={cardStyle}>
            <h3>Total Sales</h3>
            <p data-testid="dashboard-total-sales">{summary.totalSales}</p>
          </div>

          <div data-testid="dashboard-total-revenue-card" style={cardStyle}>
            <h3>Total Revenue</h3>
            <p data-testid="dashboard-total-revenue">₹{summary.totalRevenue}</p>
          </div>

          <div data-testid="dashboard-total-profit-card" style={cardStyle}>
            <h3>Total Profit</h3>
            <p data-testid="dashboard-total-profit">₹{summary.totalProfit}</p>
          </div>
        </div>

        {/* Best Seller Section */}
        {summary.bestSellingProduct && (
          <div
            data-testid="dashboard-best-seller"
            style={{
              marginTop: "2rem",
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>🏆 Best Seller</h3>
            <p data-testid="best-seller-name">
              {summary.bestSellingProduct.name} —{" "}
              {summary.bestSellingProduct.totalSold} units sold
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// ✅ Card Styling
const cardStyle = {
  backgroundColor: "white",
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
};
