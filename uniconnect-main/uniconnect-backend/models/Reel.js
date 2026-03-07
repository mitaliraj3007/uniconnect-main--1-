import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  bgImage: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Reel", reelSchema);