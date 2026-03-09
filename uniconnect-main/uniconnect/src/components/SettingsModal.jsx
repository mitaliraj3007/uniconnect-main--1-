import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import toast from "react-hot-toast";

export default function SettingsModal({ isOpen, onClose }) {
  const { user, setUser } = useAuth();
  
  // Profile State
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  
  // Preference Toggles
  const [isDark, setIsDark] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [bio, setBio] = useState(user?.bio || "");
const [branch, setBranch] = useState(user?.branch || "");
const [year, setYear] = useState(user?.year || "");

  // Sync state with user data when modal opens
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setProfilePic(user.profilePic || "");
      setIsDark(user.preferences?.isDark ?? true);
      setIsPrivate(user.preferences?.isPrivate ?? false);
      setNotifications(user.preferences?.notifications ?? true);
    }
  }, [user, isOpen]);

  // Immediate Theme Preview Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  if (!isOpen) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          profilePic, 
          preferences: { isDark, isPrivate, notifications } 
        }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setUser(updatedData);
        toast.success("Settings updated!");
        onClose();
      }
    } catch (err) {
      toast.error("Failed to save settings.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md p-6 shadow-2xl overflow-y-auto max-h-[90vh] hide-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-['Poppins']">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative group">
               <img 
                src={profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
                className="w-24 h-24 rounded-full border-4 border-purple-500/50 object-cover shadow-lg shadow-purple-500/20" 
                alt="Profile"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs text-white font-bold">CHANGE</span>
              </div>
            </div>
            
            <div className="w-full">
               <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Avatar URL</label>
               <input 
                type="text" 
                placeholder="Paste Image URL"
                className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Username</label>
            <input 
              type="text" 
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-2 text-white mt-1 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <hr className="border-gray-800" />

          {/* Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">App Preferences</h3>
            
            {/* Theme Toggle */}
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-lg">🌙</span>
                <span className="text-white text-sm font-medium">Dark Mode</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsDark(!isDark)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isDark ? 'bg-purple-600' : 'bg-gray-600'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full absolute top-1 transition-all duration-300 ${isDark ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            {/* Privacy Toggle */}
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔒</span>
                <span className="text-white text-sm font-medium">Private Account</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsPrivate(!isPrivate)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isPrivate ? 'bg-indigo-600' : 'bg-gray-600'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full absolute top-1 transition-all duration-300 ${isPrivate ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-900/20">
            Save All Changes
          </button>
        </form>
      </div>
    </div>
  );
}