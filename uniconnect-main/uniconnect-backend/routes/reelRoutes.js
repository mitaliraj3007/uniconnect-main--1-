import express from "express";
import Reel from "../models/Reel.js";

const router = express.Router();

// GET all reels (newest first)
router.get("/", async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching reels" });
  }
});

// POST a new reel
router.post("/", async (req, res) => {
  try {
    const newReel = new Reel(req.body);
    await newReel.save();
    res.status(201).json(newReel);
  } catch (error) {
    res.status(400).json({ message: "Failed to post reel" });
  }
});

export default router;