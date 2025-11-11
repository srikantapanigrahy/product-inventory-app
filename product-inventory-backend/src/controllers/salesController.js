import Sale from "../models/Sale.js";

// ✅ Create Sale
export const createSale = async (req, res) => {
  try {
    const sale = new Sale({ ...req.body, userId: req.user.id });
    await sale.save();
    res.status(201).json({ message: "Sale created successfully", sale });
  } catch (err) {
    console.error("Error creating sale:", err.message);
    res.status(400).json({ error: "Error creating sale" });
  }
};

// ✅ Get All Sales
export const getAllSales = async (req, res) => {
  try {
    const query = req.user.apiKey ? {} : { userId: req.user.id };
    const sales = await Sale.find(query)
      .populate("productId", "productName supplierName costPrice shippingCost totalCost");
    res.status(200).json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err.message);
    res.status(500).json({ error: "Server error fetching sales" });
  }
};

// ✅ Get Sale by ID
export const getSaleById = async (req, res) => {
  try {
    const query = req.user.apiKey
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    const sale = await Sale.findOne(query)
      .populate("productId", "productName supplierName costPrice shippingCost totalCost");

    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.status(200).json(sale);
  } catch (err) {
    console.error("Error fetching sale by ID:", err.message);
    res.status(500).json({ error: "Server error fetching sale" });
  }
};

// ✅ PUT (full update)
export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSale = await Sale.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json({ message: "Sale fully updated", updatedSale });
  } catch (err) {
    res.status(500).json({ error: "Server error updating sale" });
  }
};

// ✅ PATCH (partial update)
export const updateSalePartial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedSale = await Sale.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedSale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json({ message: "Sale partially updated", updatedSale });
  } catch (err) {
    res.status(500).json({ error: "Server error updating sale" });
  }
};

// ✅ DELETE Sale
export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await Sale.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedSale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting sale" });
  }
};
