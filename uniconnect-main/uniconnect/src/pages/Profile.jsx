import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  // Grab the logged-in user from your context!
  const { user, college } = useAuth(); 

  // Security check: If someone types /profile but isn't logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-2xl">Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl mt-10">
        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Profile
        </h1>
        
        <div className="space-y-4 text-lg">
          <p>
            <span className="text-purple-300 font-semibold">Username:</span> {user.username || user.name}
          </p>
          <p>
            <span className="text-purple-300 font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="text-purple-300 font-semibold">College:</span> {college ? college.name : "No college selected yet"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}