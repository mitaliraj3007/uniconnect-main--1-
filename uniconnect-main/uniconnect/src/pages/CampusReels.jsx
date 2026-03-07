import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext"; // Assuming you have this from the Events page!
import toast from "react-hot-toast";

export default function CampusReels() {
  const { user } = useAuth(); // Get the logged-in user
  const [reels, setReels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form state for a new reel
  const [newReel, setNewReel] = useState({ content: "", bgImage: "" });

  // 1. Fetch Reels from the Database
  const fetchReels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reels`);
      const data = await response.json();
      setReels(data);
    } catch (error) {
      console.error("Failed to fetch reels", error);
      toast.error("Could not load reels.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  // 2. Handle Posting a New Reel
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add the logged-in user's name as the author
    const reelData = {
      ...newReel,
      author: user?.username || user?.name || "Anonymous Student",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/reels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reelData),
      });

      if (response.ok) {
        toast.success("Reel posted!");
        setShowModal(false);
        setNewReel({ content: "", bgImage: "" }); // Reset form
        fetchReels(); // Refresh the feed!
      } else {
        toast.error("Failed to post reel.");
      }
    } catch (error) {
      toast.error("Server error.");
    }
  };

  if (isLoading) {
    return <div className="h-screen w-full bg-black flex items-center justify-center text-white">Loading Campus Reels...</div>;
  }

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory hide-scrollbar relative">
      
      {/* 🚀 Create Reel Floating Button */}
      <button 
        onClick={() => setShowModal(true)}
        className="absolute top-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-110 transition"
      >
        ➕ Create
      </button>

      {/* If Database is empty */}
      {reels.length === 0 && (
        <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
          <p className="text-xl mb-4">No Reels yet!</p>
          <button onClick={() => setShowModal(true)} className="text-cyan-400 underline">Be the first to post</button>
        </div>
      )}

      {/* The Reels Feed */}
      {reels.map((reel) => (
        <div key={reel._id} className="h-screen w-full snap-start snap-always relative flex justify-center items-center bg-gray-900">
          <img src={reel.bgImage} alt="Reel content" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"></div>

          <div className="absolute bottom-20 left-4 right-20 text-white z-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-sm uppercase">
                {reel.author.charAt(0)}
              </div>
              {reel.author}
            </h3>
            <p className="mt-2 text-sm text-gray-200 line-clamp-3">{reel.content}</p>
          </div>

          <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6 z-10">
            <button className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition"><span className="text-2xl">❤️</span></div>
              <span className="text-white text-xs mt-1">{reel.likes || 0}</span>
            </button>
            <button className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition"><span className="text-2xl">💬</span></div>
            </button>
          </div>
        </div>
      ))}

      {/* 📝 Create Reel Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-sm relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Post a Reel</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Image URL</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. https://picsum.photos/800/1200" 
                  className="w-full bg-black/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                  value={newReel.bgImage}
                  onChange={(e) => setNewReel({...newReel, bgImage: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Paste an image link for the background</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Caption</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="What's happening on campus?" 
                  className="w-full bg-black/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none resize-none"
                  value={newReel.content}
                  onChange={(e) => setNewReel({...newReel, content: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-500 transition">
                Share to Feed
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}