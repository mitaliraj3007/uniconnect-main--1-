import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CampusFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:50001/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-white">
        🌐 Loading Campus Feed...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        😔 No posts yet. Try seeding the database again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-darkBg text-white p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-neonPink to-neonBlue bg-clip-text text-transparent"
      >
        🏫 Campus Feed
      </motion.h1>

      <div className="grid gap-6 max-w-2xl mx-auto">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-cardBg p-5 rounded-2xl shadow-[0_0_20px_#60A5FA22] hover:shadow-[0_0_30px_#EC489955] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={post.user?.profilePic || "https://i.pravatar.cc/150"}
                alt="user"
                className="w-12 h-12 rounded-full border-2 border-neonBlue"
              />
              <div>
                <h2 className="font-semibold text-neonBlue">
                  @{post.user?.username || "unknown"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-200 mb-3">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="rounded-xl shadow-lg w-full max-h-96 object-cover hover:scale-[1.02] transition"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CampusFeed;