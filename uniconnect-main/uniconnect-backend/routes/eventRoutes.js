import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// 1. GET UPCOMING events for a specific college
router.get("/:college", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const events = await Event.find({ 
      college: req.params.college,
      date: { $gte: today } 
    }).sort({ date: 1 }); 

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server Error fetching events" });
  }
});

// 2. POST a new event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error posting event:", error);
    res.status(400).json({ message: "Failed to post event" });
  }
});

export default router;