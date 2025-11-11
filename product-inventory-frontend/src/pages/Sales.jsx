import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

import "../styles/buttons.css";
import "../styles/table.css";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    buyerName: "",
    buyerAddress: "",
    soldQuantity: "",
    unitSellingPrice: "",
    saleDate: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch sales and items on mount
  useEffect(() => {
    fetchSales();
    fetchItems();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
      // toast.success("Items fetched successfully");
    } catch (err) {
      toast.error("Error fetching items");
      console.error("Error fetching items:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/sales/${editingId}`, form);
        toast.success("Sale updated successfully ✏️");
      } else {
        await api.post("/sales", form);
        toast.success("Sale recorded successfully 💰");
      }
      setForm({
        productId: "",
        buyerName: "",
        buyerAddress: "",
        soldQuantity: "",
        unitSellingPrice: "",
        saleDate: "",
      });
      setEditingId(null);
      fetchSales();
    } catch (err) {
      toast.error("Failed to save sale ❌");
      console.error("Error saving sale:", err);
    }
  };

  const handleEdit = (sale) => {
    setEditingId(sale._id);
    setForm({
      productId: sale.productId?._id || "",
      buyerName: sale.buyerName,
      buyerAddress: sale.buyerAddress,
      soldQuantity: sale.soldQuantity,
      unitSellingPrice: sale.unitSellingPrice,
      saleDate: sale.saleDate?.split("T")[0] || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale?")) return;
    try {
      await api.delete(`/sales/${id}`);
      toast.success("Sale deleted 🗑️");
      fetchSales();
    } catch (err) {
      toast.error("Failed to delete sale ❌");
      console.error("Error deleting sale:", err);
    }
  };

  return (
    <>
      <Navbar data-testid="navbar" />

      <div style={{ padding: "2rem" }} data-testid="sales-page">
        <h2 data-testid="sales-title">🧾 Sales Management</h2>

        {/* 🧍‍♂️ Add / Edit Sale Form */}
        <form
          data-testid="sales-form"
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <select
            name="productId"
            data-testid="select-product"
            value={form.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.productName}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="buyerName"
            placeholder="Buyer Name"
            data-testid="input-buyer-name"
            value={form.buyerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="buyerAddress"
            placeholder="Buyer Address"
            data-testid="input-buyer-address"
            value={form.buyerAddress}
            onChange={handleChange}
          />
          <input
            type="number"
            name="soldQuantity"
            placeholder="Quantity"
            data-testid="input-sold-quantity"
            value={form.soldQuantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="unitSellingPrice"
            placeholder="Unit Price"
            data-testid="input-unit-price"
            value={form.unitSellingPrice}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="saleDate"
            data-testid="input-sale-date"
            value={form.saleDate}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="action-button action-add"
            data-testid="submit-sale-button"
          >
            {editingId ? "Update Sale" : "Add Sale"}
          </button>
        </form>

        {/* 📋 Sales Table */}
        <div className="table-container">
          <table className="table" data-testid="sales-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Buyer</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total Sale</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty">
                    No sales records found.
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale._id} data-testid={`sales-row-${sale._id}`}>
                    <td>{sale.productId?.productName || "—"}</td>
                    <td>{sale.buyerName}</td>
                    <td>{sale.soldQuantity}</td>
                    <td>₹{sale.unitSellingPrice}</td>
                    <td>₹{sale.totalSale || sale.soldQuantity * sale.unitSellingPrice}</td>
                    <td>{sale.saleDate?.split("T")[0]}</td>
                    <td>
                      <button
                        className="action-button action-edit"
                        data-testid={`edit-sale-${sale._id}`}
                        onClick={() => handleEdit(sale)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-button action-delete"
                        data-testid={`delete-sale-${sale._id}`}
                        onClick={() => handleDelete(sale._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
