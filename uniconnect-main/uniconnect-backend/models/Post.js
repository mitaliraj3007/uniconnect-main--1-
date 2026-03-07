import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  image: String,
  likes: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);