export const getPosts = (req, res) => {
  res.json([
    { id: 1, author: "Sawan", content: "Looking for teammates for Hackathon!" },
    { id: 2, author: "Aarav", content: "Anyone working on AI projects?" },
  ]);
};

export const createPost = (req, res) => {
  const { author, content } = req.body;
  res.status(201).json({ message: "Post created", post: { author, content } });
};