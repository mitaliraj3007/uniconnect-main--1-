import Post from "../models/Post.js"; // Make sure to import your Post model

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name profilePicture") // Optional: if you want user info
      .populate("relatedEvent", "title _id")     // NEW: Populate related event details
      .sort({ createdAt: -1 });
      
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// CREATE A NEW POST (This is the function that was missing!)
export const createPost = async (req, res) => {
  try {
    const { content, image, isEventRelated, relatedEventId } = req.body;
    
    // We are extracting user ID assuming you have an authentication middleware 
    // that attaches req.user. If you don't have auth yet, you can temporarily 
    // hardcode an author ID or pass it in the body for testing.
    const newPost = new Post({
      author: req.user ? req.user.id : null, 
      content,
      image,
      isEventRelated: isEventRelated || false,
      relatedEvent: relatedEventId || null
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};