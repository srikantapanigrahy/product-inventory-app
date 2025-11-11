import Item from "../models/Item.js";

/**
 * @desc Create a new item (wholesaler purchase)
 * @route POST /api/items
 * @access Private
 */
export const createItem = async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      userId: req.user?.id || null //Attach user only if token-based
    });

    await newItem.save();
    res.status(201).json({
      message: "Item added successfully",
      item: newItem
    });
  } catch (error) {
    console.error("❌ Error saving item:", error.message);
    res.status(400).json({ error: "Error saving item" });
  }
};

/**
 * @desc Get all items for a user
 * @route GET /api/items
 * @access Private
 */
// ✅ Get all items
export const getAllItems = async (req, res) => {
  try {
    // 🧩 Dynamic filter: if API key used → show all, else filter by userId
    const filter = req.user.apiKey ? {} : { userId: req.user.id };

    const items = await Item.find(filter).sort({ createdAt: -1 });

    if (!items.length) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Error fetching items:", error.message);
    res.status(500).json({ error: "Server error fetching items" });
  }
};

/**
 * @desc Get a single item by ID
 * @route GET /api/items/:id
 * @access Private
 */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("❌ Error fetching item:", err);
    res.status(400).json({ error: "Invalid item ID" });
  }
};

/**
 * @desc Update an item partially
 * @route PATCH /api/items/:id
 * @access Private
 */
export const updateItemPartial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedItem = await Item.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item partially updated (PATCH)",
      updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: "Server error updating item" });
  }
};

/**
 * @desc Update an item
 * @route PUT /api/items/:id
 * @access Private
 */
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item fully updated (PUT)",
      updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: "Server error updating item" });
  }
};


/**
 * @desc Delete an item
 * @route DELETE /api/items/:id
 * @access Private
 */
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.status(204).send(); // No content
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(400).json({ error: "Failed to delete item" });
  }
};
