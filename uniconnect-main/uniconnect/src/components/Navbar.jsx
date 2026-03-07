import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, setCollege } = useAuth();

  // --- NOTIFICATION STATE ---
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to UniConnect!", isRead: false },
    { id: 2, text: "Admin liked your post.", isRead: false },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("college");
    setUser(null);
    setCollege(null);
    navigate("/");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  if (!user) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-purple-900 text-white shadow-lg relative z-50">
      
      {/* LEFT SIDE: Logo & Main Navigation Links */}
      <div className="flex items-center gap-8">
        <div className="font-extrabold text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
          <Link to="/feed">UniConnect</Link>
        </div>
        
        {/* --- THE MISSING LINKS ARE BACK! --- */}
        <div className="hidden md:flex gap-5 text-sm font-semibold text-purple-200">
          <Link to="/feed" className="hover:text-white hover:underline underline-offset-4 transition">
            Feed
          </Link>
          <Link to="/friends" className="hover:text-white hover:underline underline-offset-4 transition">
            Find Friends
          </Link>
          <Link to="/rent" className="hover:text-white hover:underline underline-offset-4 transition">
            Rent Hub
          </Link>
          <Link to="/events" className="hover:text-white hover:underline underline-offset-4 transition">Events</Link>
          <Link to="/chat" className="hover:text-white hover:underline underline-offset-4 transition">
            Chat
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: Notifications, Profile, and Logout */}
      <div className="flex gap-6 items-center">
        
        {/* NOTIFICATION BELL */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-2xl hover:bg-white/10 rounded-full transition"
            title="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-purple-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 bg-white text-black rounded-xl shadow-2xl overflow-hidden border border-gray-200"
              >
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-purple-600 hover:text-purple-800 font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition ${notif.isRead ? "opacity-60" : "bg-purple-50/50"}`}
                      >
                        <p className="text-sm text-gray-800">{notif.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE & LOGOUT */}
        <Link to="/profile" className="hover:text-purple-300 transition font-medium">
          My Profile
        </Link>

        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold shadow-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}