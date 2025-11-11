/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Manage purchased items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - productName
 *         - supplierName
 *         - costPrice
 *         - shippingCost
 *         - stockQuantity
 *       properties:
 *         productName:
 *           type: string
 *           description: Product name
 *         supplierName:
 *           type: string
 *           description: Supplier or dealer name
 *         costPrice:
 *           type: number
 *           description: Cost price of the item
 *         shippingCost:
 *           type: number
 *           description: Transportation or delivery cost
 *         stockQuantity:
 *           type: number
 *           description: Available stock count
 *         purchaseDate:
 *           type: string
 *           format: date
 *           description: Date of purchase
 *       example:
 *         productName: HP Laptop
 *         supplierName: Rajib Computers
 *         costPrice: 30000
 *         shippingCost: 2000
 *         stockQuantity: 20
 *         purchaseDate: 2025-11-09
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of all items
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Item details
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Fully update an item (replace all fields)
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item fully updated
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Partially update an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             shippingCost: 3500
 *             stockQuantity: 25
 *     responses:
 *       200:
 *         description: Item partially updated
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */



import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  updateItemPartial
} from "../controllers/itemController.js";

const router = express.Router();

// Route mappings
router.post("/", verifyToken, createItem);        // Create item
router.get("/", verifyToken, getAllItems);        // Get all items
router.get("/:id", verifyToken, getItemById);     // Get item by ID
router.put("/:id", verifyToken, updateItem);      // Update item
router.patch("/:id", verifyToken, updateItemPartial); // Partial update
router.delete("/:id", verifyToken, deleteItem);   // Delete item

export default router;
