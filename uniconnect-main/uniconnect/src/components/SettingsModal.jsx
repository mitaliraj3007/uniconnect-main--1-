import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import toast from "react-hot-toast";

export default function SettingsModal({ isOpen, onClose }) {
  const { user, setUser } = useAuth();
  
  // Profile & Academic State
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  
  // Preference Toggles
  const [isPrivate, setIsPrivate] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // 1. Sync state with user data when modal opens
  useEffect(() => {
    if (user && isOpen) {
      setUsername(user.username || "");
      setProfilePic(user.profilePic || "");
      setBio(user.bio || "");
      setBranch(user.branch || "Computer Science");
      setYear(user.year || "1st Year");
      setIsPrivate(user.preferences?.isPrivate ?? false);
      setNotifications(user.preferences?.notifications ?? true);
    }
  }, [user, isOpen]);

  
  if (!isOpen) return null;

// 3. Update Function
  const handleUpdate = async (e) => {
    e.preventDefault();

    // 🛑 1. Stop fake users from trying to save to the database
    if (!user || !user._id) {
      toast.error("Cannot save settings for Guest accounts! Please log in with a real account.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          profilePic, 
          bio,
          branch,
          year,
          preferences: { isPrivate, notifications } 
        }),
      });

      // ✅ 2. Handle Success
      if (res.ok) {
        const updatedData = await res.json();
        setUser(updatedData);
        toast.success("Settings updated successfully!");
        onClose();
      } 
      // ❌ 3. Handle Backend Errors (Instead of failing silently)
      else {
        const errorData = await res.json();
        console.error("Backend Error:", errorData);
        toast.error("Failed to save. Check terminal for errors.");
      }

    } catch (err) {
      console.error("Network Error:", err);
      toast.error("Server is not responding.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl overflow-y-auto max-h-[90vh] hide-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-['Poppins'] tracking-tight">Profile Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">✕</button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative group">
               <img 
                src={profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
                className="w-24 h-24 rounded-full border-4 border-indigo-500/50 object-cover shadow-lg shadow-indigo-500/20" 
                alt="Profile"
              />
            </div>
            <div className="w-full">
               <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Avatar URL</label>
               <input 
                type="text" 
                placeholder="Paste Image URL"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
          </div>

          {/* Academic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Branch</label>
              <select 
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              >
                <option value="Computer Science">CSE</option>
                <option value="Information Technology">IT</option>
                <option value="Electronics">ECE</option>
                <option value="Mechanical">ME</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Year</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          {/* Username & Bio */}
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Bio</label>
              <textarea 
                placeholder="Share your interests or skills..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition-all"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">App Preferences</h3>
            
           

            <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-white text-sm font-medium">🔒 Private Account</span>
              <button 
                type="button"
                onClick={() => setIsPrivate(!isPrivate)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isPrivate ? 'bg-indigo-600' : 'bg-slate-600'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full absolute top-1 transition-all duration-300 ${isPrivate ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-xl shadow-indigo-900/20">
            Save All Changes
          </button>
        </form>
      </div>
    </div>
  );
}