/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Manage product sales to local buyers or shops
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       required:
 *         - productId
 *         - buyerName
 *         - buyerAddress
 *         - soldQuantity
 *         - unitSellingPrice
 *         - saleDate
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product being sold (from Items collection)
 *           example: "691004456381ccb8eaf4899b"
 *         buyerName:
 *           type: string
 *           description: The name of the buyer or shop
 *           example: "Mobile Mart"
 *         buyerAddress:
 *           type: string
 *           description: Address of the buyer
 *           example: "Cuttack, Odisha"
 *         soldQuantity:
 *           type: number
 *           description: Quantity of items sold
 *           example: 5
 *         unitSellingPrice:
 *           type: number
 *           description: Selling price per unit
 *           example: 25000
 *         saleDate:
 *           type: string
 *           format: date
 *           description: Date of sale
 *           example: 2025-11-09
 *       example:
 *         productId: "691004456381ccb8eaf4899b"
 *         buyerName: "Gadget World"
 *         buyerAddress: "Bhubaneswar, Odisha"
 *         soldQuantity: 2
 *         unitSellingPrice: 82000
 *         saleDate: "2025-11-09"
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Record a new sale
 *     description: Creates a new sale record linked to an existing product.
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Sale created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Sale created successfully"
 *               sale:
 *                 _id: "673a1b2c9e8f4b45a8cf12d3"
 *                 buyerName: "Mobile Mart"
 *                 soldQuantity: 5
 *                 unitSellingPrice: 25000
 *                 totalSale: 125000
 *       400:
 *         description: Invalid or missing fields
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     description: Returns a list of all recorded sales with linked product details.
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of all sales
 *         content:
 *           application/json:
 *             example:
 *               - _id: "673a1b2c9e8f4b45a8cf12d3"
 *                 buyerName: "Mobile Mart"
 *                 soldQuantity: 5
 *                 unitSellingPrice: 25000
 *                 totalSale: 125000
 *                 productId:
 *                   _id: "673a1b2c4f8e9a12bc34de90"
 *                   productName: "Samsung A55"
 *                   supplierName: "Star Mobile Distributors"
 *                   costPrice: 20000
 *                   shippingCost: 500
 *                   totalCost: 20500
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     description: Fetch a specific sale record by its ID.
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *         example: 673a1b2c9e8f4b45a8cf12d3
 *     responses:
 *       200:
 *         description: Sale details
 *         content:
 *           application/json:
 *             example:
 *               _id: "673a1b2c9e8f4b45a8cf12d3"
 *               buyerName: "Mobile Mart"
 *               soldQuantity: 5
 *               unitSellingPrice: 25000
 *               totalSale: 125000
 *               productId:
 *                 _id: "673a1b2c4f8e9a12bc34de90"
 *                 productName: "Samsung A55"
 *       404:
 *         description: Sale not found
 */

/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Fully update a sale (replace all fields)
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Sale fully updated
 *       404:
 *         description: Sale not found
 */

/**
 * @swagger
 * /sales/{id}:
 *   patch:
 *     summary: Partially update a sale (specific fields)
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             soldQuantity: 3
 *             unitSellingPrice: 85000
 *     responses:
 *       200:
 *         description: Sale partially updated
 *       404:
 *         description: Sale not found
 */

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found
 */

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  updateSalePartial,
  deleteSale
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/", verifyToken, createSale);
router.get("/", verifyToken, getAllSales);
router.get("/:id", verifyToken, getSaleById);
router.put("/:id", verifyToken, updateSale);
router.patch("/:id", verifyToken, updateSalePartial);
router.delete("/:id", verifyToken, deleteSale);

export default router;
