import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SettingsModal from "../components/SettingsModal";

export default function Profile() {
  const { user, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Fallbacks in case data isn't set yet
  const username = user?.username || "Student";
  const branch = user?.branch || "Computer Science";
  const year = user?.year || "1st Year";
  const bio = user?.bio || "Hey there! I'm using UniConnect.";
  const profilePic = user?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-8 max-w-3xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="card p-8 flex flex-col items-center relative mt-12 mb-8">
        
        {/* Settings Gear Icon (Opens the Modal we just built) */}
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-indigo-500 hover:rotate-90 transition-all duration-300"
          title="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Avatar (Floating halfway out of the card) */}
        <div className="absolute -top-12">
          <img 
            src={profilePic} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-slate-50 dark:border-slate-800 object-cover shadow-lg bg-slate-100"
          />
        </div>

        {/* User Details */}
        <div className="mt-10 text-center w-full">
          <h1 className="text-2xl font-bold mb-1">{username}</h1>
          <p className="text-sm font-medium text-indigo-500 mb-4 tracking-wide uppercase flex items-center justify-center gap-2">
            <span>{branch}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>{year}</span>
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 w-full mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{bio}"</p>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-around items-center border-t border-slate-100 dark:border-slate-700 pt-6">
            <div className="text-center">
              <span className="block text-xl font-bold">12</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Posts</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <span className="block text-xl font-bold">48</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Friends</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <span className="block text-xl font-bold">3</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button (Moved down here for a cleaner header) */}
      <button 
        onClick={logout} 
        className="w-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:border dark:border-red-500/20 font-semibold py-3 rounded-2xl transition-colors duration-200"
      >
        Log Out
      </button>

      {/* Render the Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
}