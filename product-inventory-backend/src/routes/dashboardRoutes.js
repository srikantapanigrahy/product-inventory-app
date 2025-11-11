/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Get summarized business insights (items, sales, profits)
 */

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Item from "../models/Item.js";
import Sale from "../models/Sale.js";

const router = express.Router();

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get business summary data
 *     description: Returns total products, total sales, total revenue, and total profit.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary data
 *         content:
 *           application/json:
 *             example:
 *               totalItems: 12
 *               totalSales: 6
 *               totalRevenue: 960000
 *               totalProfit: 210000
 *               bestSellingProduct:
 *                 name: "HP Laptop"
 *                 totalSold: 5
 */
router.get("/summary", verifyToken, async (req, res) => {
  try {
    const userFilter = req.user.apiKey ? {} : { userId: req.user.id };

    const totalItems = await Item.countDocuments(userFilter);
    const totalSales = await Sale.countDocuments(userFilter);

    // Calculate total revenue and profit
    const allSales = await Sale.find(userFilter).populate("productId", "costPrice shippingCost");
    let totalRevenue = 0;
    let totalProfit = 0;

    for (const sale of allSales) {
      const soldQty = Number(sale.soldQuantity) || 0;
      const sellPrice = Number(sale.unitSellingPrice) || 0;
      const costPrice = Number(sale.productId?.costPrice) || 0;
      const shippingCost = Number(sale.productId?.shippingCost) || 0;

      const revenue = soldQty * sellPrice;
      const cost = soldQty * (costPrice + shippingCost);

      totalRevenue += revenue;
      totalProfit += revenue - cost;
    }

    // Best selling product (most quantity sold)
    const bestProduct = await Sale.aggregate([
      { $match: userFilter },
      { $group: { _id: "$productId", totalSold: { $sum: "$soldQuantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ]);

    let bestSellingProduct = null;
    if (bestProduct.length > 0) {
      const product = await Item.findById(bestProduct[0]._id);
      bestSellingProduct = {
        name: product?.productName,
        totalSold: bestProduct[0].totalSold,
      };
    }

    res.status(200).json({
      totalItems,
      totalSales,
      totalRevenue,
      totalProfit,
      bestSellingProduct,
    });
  } catch (err) {
    console.error("❌ Error generating dashboard summary:", err.message);
    res.status(500).json({ error: "Server error generating summary" });
  }
});

export default router;
