import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  supplierName: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
  costPrice: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  totalCost: Number,
  stockQuantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{ timestamps: true }
);

// ✅ Virtuals for backward compatibility (optional)
itemSchema.virtual("name").get(function() {
  return this.productName;
});
itemSchema.virtual("dealerName").get(function() {
  return this.supplierName;
});
// ✅ Automatically calculate total cost
itemSchema.pre("save", function (next) {
  this.totalCost = this.purchasePrice + this.transportCost;
  next();
});

export default mongoose.model("Item", itemSchema);
