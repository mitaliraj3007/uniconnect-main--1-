import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  image: String,
  likes: Number,
  
  // NEW: Add a reference to the Event model
  isEventRelated: { type: Boolean, default: false },
  relatedEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    default: null
  },
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);