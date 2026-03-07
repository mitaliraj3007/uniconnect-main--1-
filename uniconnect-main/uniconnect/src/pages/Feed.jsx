import React from "react";
import { motion } from "framer-motion";

const posts = [
  { id: 1, user: "Aarav", img: "https://picsum.photos/500?random=1", caption: "Exploring AI 🚀" },
  { id: 2, user: "Riya", img: "https://picsum.photos/500?random=2", caption: "Hackathon team ready!" },
  { id: 3, user: "Kabir", img: "https://picsum.photos/500?random=3", caption: "Campus vibes 💜" },
];

export default function Feed() {
  return (
    <div className="p-4 bg-gradient-to-br from-purple-800 via-purple-900 to-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Campus Feed</h1>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            className="bg-purple-700 rounded-2xl shadow-lg overflow-hidden"
          >
            <img src={post.img} alt="Post" className="w-full h-64 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-lg">{post.user}</h3>
              <p>{post.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}