// routes/postRoutes.js
import express from "express";
import { getPosts, createPost } from "../controllers/postController.js";
import  {protect}  from "../Middleware/authmiddleware.js"; // <-- Import middleware

const router = express.Router();

// Public route: Anyone can see posts
router.get("/", getPosts);

// Protected route: Only logged in users can create posts
router.post("/", protect, createPost); 

export default router;