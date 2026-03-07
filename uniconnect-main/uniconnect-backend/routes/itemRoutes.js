import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// 1. GET items (With Advanced Search & Filtering)
router.get("/:college", async (req, res) => {
  try {
    const { search, category, type, maxPrice } = req.query;
    
    // Start with the base rule: items must belong to the user's college
    let query = { college: req.params.college };

    // 🔍 SEARCH: Match title or description (case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // 🏷️ CATEGORY FILTER
    if (category && category !== "All") {
      query.category = category;
    }

    // 🤝 LISTING TYPE FILTER (Rent vs Sell)
    if (type && type !== "All") {
      query.listingType = type;
    }

    // 💰 PRICE FILTER: Less than or equal to ($lte) maxPrice
    if (maxPrice && maxPrice !== "10000") {
      query.price = { $lte: Number(maxPrice) };
    }

    // Execute the complex query and sort by newest
    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);

  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server Error fetching items" });
  }
});

// 2. POST a new item
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error posting item:", error);
    res.status(400).json({ message: "Failed to post item" });
  }
});

export default router;