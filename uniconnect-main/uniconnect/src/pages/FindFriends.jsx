import React, { useState } from "react";
import { motion } from "framer-motion";

const allFriends = [
  { id: 1, name: "Alice Johnson", university: "Chandigarh University", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Bob Williams", university: "Delhi University", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Charlie Brown", university: "IIT Bombay", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Daisy Patel", university: "NIT Trichy", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Emma Singh", university: "Amity University", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "Franklin Mehta", university: "SRM University", avatar: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "Grace Kumar", university: "BITS Pilani", avatar: "https://i.pravatar.cc/100?img=7" },
  { id: 8, name: "Harshit Rao", university: "Chandigarh University", avatar: "https://i.pravatar.cc/100?img=8" },
];

export default function FindFriends() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFriends = allFriends.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-[85vh] bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Find Friends 👥</h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or university..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md bg-gray-900 border border-purple-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* 🧑‍🤝‍🧑 Friends List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <motion.div
              key={friend.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 border border-purple-800 rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-purple-500/30 transition-all"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-20 h-20 rounded-full border-4 border-purple-500 mb-3"
              />
              <h3 className="text-lg font-semibold">{friend.name}</h3>
              <p className="text-sm text-purple-300">{friend.university}</p>
              <button className="mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-sm transition-all">
                Add Friend
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No friends found 😢
          </p>
        )}
      </div>
    </motion.div>
  );
}