import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  buyerName: { type: String, required: true },
  buyerAddress: { type: String, required: true },
  soldQuantity: { type: Number, required: true },
  unitSellingPrice: { type: Number, required: true },
  totalSale: { type: Number },
  saleDate: { type: Date, required: true },
  totalAmount: { type: Number },
  totalProfit: { type: Number },
  totalSale: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

// ✅ Pre-save Hook: Auto-calculate totals
saleSchema.pre("save", async function (next) {
  try {
    const Item = mongoose.model("Item");
    const product = await Item.findById(this.productId);

    if (!product) return next(new Error("Product not found for this sale"));

    this.totalAmount = this.soldQuantity * this.unitSellingPrice;

    const totalCostPerUnit = product.costPrice + product.shippingCost;
    
    this.totalProfit = (this.unitSellingPrice - totalCostPerUnit) * this.soldQuantity;

    this.totalSale = this.soldQuantity * this.unitSellingPrice;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Sale", saleSchema);
