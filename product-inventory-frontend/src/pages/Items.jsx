import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/buttons.css";
import "../styles/table.css"; // ✅ Added common table styling
import { toast } from "react-toastify";

export default function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    productName: "",
    supplierName: "",
    costPrice: "",
    shippingCost: "",
    stockQuantity: ""
  });
  const [editingItem, setEditingItem] = useState(null);

  // ✅ Load all items
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // ✅ Add Item
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/items", newItem);
      setNewItem({
        productName: "",
        supplierName: "",
        costPrice: "",
        shippingCost: "",
        stockQuantity: ""
      });
      toast.success("Item added successfully 📦");
      fetchItems();
    } catch (err) {
      toast.error("Failed to add item ❌");
      console.error("Error adding item:", err);
    }
  };

  // ✅ Delete Item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`/items/${id}`);
      toast.success("Item deleted 🗑️");
      fetchItems();
    } catch (err) {
      toast.error("Failed to delete item ❌");
      console.error("Error deleting item:", err);
    }
  };

  // ✅ Start Edit
  const handleEditStart = (item) => {
    setEditingItem(item);
  };

  // ✅ Save Edit (PATCH)
  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/items/${editingItem._id}`, editingItem);
      setEditingItem(null);
      toast.success("Item updated successfully ✏️");
      fetchItems();
    } catch (err) {
      toast.error("Failed to update item ❌");
      console.error("Error updating item:", err);
    }
  };

  return (
    <>
      <Navbar data-testid="navbar" />

      <div data-testid="items-page" style={{ padding: "2rem" }}>
        <h2 data-testid="items-title">📦 Items Management</h2>

        {/* ➕ Add Item Form */}
        <form
          data-testid="items-add-form"
          onSubmit={handleAdd}
          style={{
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <input
            data-testid="input-product-name"
            placeholder="Product Name"
            value={newItem.productName}
            onChange={(e) =>
              setNewItem({ ...newItem, productName: e.target.value })
            }
          />
          <input
            data-testid="input-supplier-name"
            placeholder="Supplier Name"
            value={newItem.supplierName}
            onChange={(e) =>
              setNewItem({ ...newItem, supplierName: e.target.value })
            }
          />
          <input
            data-testid="input-cost-price"
            placeholder="Cost Price"
            type="number"
            value={newItem.costPrice}
            onChange={(e) =>
              setNewItem({ ...newItem, costPrice: e.target.value })
            }
          />
          <input
            data-testid="input-shipping-cost"
            placeholder="Shipping Cost"
            type="number"
            value={newItem.shippingCost}
            onChange={(e) =>
              setNewItem({ ...newItem, shippingCost: e.target.value })
            }
          />
          <input
            data-testid="input-stock-quantity"
            placeholder="Stock Quantity"
            type="number"
            value={newItem.stockQuantity}
            onChange={(e) =>
              setNewItem({ ...newItem, stockQuantity: e.target.value })
            }
          />
          <button
            data-testid="items-add-button"
            type="submit"
            className="action-button action-add"
          >
            Add Item
          </button>
        </form>

        {/* 📋 Items Table (using shared CSS) */}
        <div className="table-container">
          <table className="table" data-testid="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Supplier</th>
                <th>Cost</th>
                <th>Shipping</th>
                <th>Stock</th>
                <th>Purchase Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty">
                    No items found. Add your first item above.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    data-testid={`items-row-${item._id}`}
                    key={item._id}
                    style={{ textAlign: "center" }}
                  >
                    {editingItem && editingItem._id === item._id ? (
                      <>
                        <td>
                          <input
                            data-testid="edit-product-name"
                            value={editingItem.productName}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                productName: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            data-testid="edit-supplier-name"
                            value={editingItem.supplierName}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                supplierName: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            data-testid="edit-cost-price"
                            type="number"
                            value={editingItem.costPrice}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                costPrice: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            data-testid="edit-shipping-cost"
                            type="number"
                            value={editingItem.shippingCost}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                shippingCost: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            data-testid="edit-stock-quantity"
                            type="number"
                            value={editingItem.stockQuantity}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                stockQuantity: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <button
                            data-testid="save-edit-button"
                            onClick={handleEditSave}
                            className="action-button action-save"
                          >
                            Save
                          </button>
                          <button
                            data-testid="cancel-edit-button"
                            onClick={() => setEditingItem(null)}
                            className="action-button action-cancel"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td data-testid="item-product-name">
                          {item.productName}
                        </td>
                        <td data-testid="item-supplier-name">
                          {item.supplierName}
                        </td>
                        <td data-testid="item-cost-price">
                          ₹{item.costPrice}
                        </td>
                        <td data-testid="item-shipping-cost">
                          ₹{item.shippingCost}
                        </td>
                        <td data-testid="item-stock-quantity">
                          {item.stockQuantity}
                        </td>
                        <td>
                          {item.purchaseDate
                            ? new Date(item.purchaseDate).toLocaleDateString()
                            : "—"}
                        </td>
                        <td>
                          <button
                            className="action-button action-edit"
                            data-testid={`edit-button-${item._id}`}
                            onClick={() => handleEditStart(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-button action-delete"
                            data-testid={`delete-button-${item._id}`}
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
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
