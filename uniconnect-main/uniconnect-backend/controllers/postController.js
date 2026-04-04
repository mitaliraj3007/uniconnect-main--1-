export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name profilePicture") // Assuming you populate user info
      .populate("relatedEvent", "title _id")     // Populate event details
      .sort({ createdAt: -1 });
      
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};