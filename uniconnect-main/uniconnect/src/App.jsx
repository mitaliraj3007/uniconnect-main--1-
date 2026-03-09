import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Context & Components
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

// Pages
import Login from "./pages/Login";
import SelectCollege from "./pages/SelectCollege";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import RentHub from "./pages/RentHub";
import Settings from "./pages/Settings";
import FindFriends from "./pages/FindFriends";
import CreatePost from "./pages/CreatePost";
import Events from "./pages/Events.jsx";
import CampusReels from "./pages/CampusReels.jsx";

function AppContent() {
  const { user, setUser, college, setCollege } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🌙 Theme Logic 
  useEffect(() => {
    const isDark = user?.preferences?.isDark ?? true; 
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [user?.preferences?.isDark]);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/select-college");
  };

  const handleGuestLogin = () => {
    setUser({ name: "Guest User", email: "guest@gmail.com", type: "guest" });
    navigate("/select-college");
  };

  const handleAdminLogin = () => {
    setUser({ name: "Admin", email: "admin@uniconnect.com", type: "admin" });
    navigate("/feed");
  };

  const handleCollegeSelect = (collegeData) => {
    setCollege({ name: collegeData }); 
    navigate("/feed");
  };

  const isLoggedIn = !!user;
  const hideTopButtons = ["/", "/select-college"].includes(location.pathname);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white relative overflow-hidden">
      
      <Toaster position="top-center" reverseOrder={false} />

      {/* Floating Top Buttons... */}
      {!hideTopButtons && isLoggedIn && (
        <div className="absolute top-4 right-4 flex space-x-3 z-50">
          <button
            onClick={() => navigate("/chat")}
            className="p-3 bg-purple-700 hover:bg-purple-800 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 text-white"
            title="Chat"
          >
            💬
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="p-3 bg-purple-700 hover:bg-purple-800 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 text-white"
            title="Profile"
          >
            👤
          </button>
        </div>
      )}

      {/* Floating Create Post Button */}
      {isLoggedIn && !hideTopButtons && (
        <button
          onClick={() => navigate("/create")}
          className="fixed bottom-20 right-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-3xl font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-50"
          title="Create Post"
        >
          ＋
        </button>
      )}

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} onGuestLogin={handleGuestLogin} onAdminLogin={handleAdminLogin} />} />
          <Route path="/select-college" element={isLoggedIn ? <SelectCollege onSelect={handleCollegeSelect} /> : <Navigate to="/" />} />
          <Route path="/feed" element={isLoggedIn && college ? <><Navbar /><Feed /></> : <Navigate to="/" />} />
          <Route path="/friends" element={isLoggedIn ? <><Navbar /><FindFriends /></> : <Navigate to="/" />} />
          <Route path="/chat" element={isLoggedIn ? <><Navbar /><Chat /></> : <Navigate to="/" />} />
          <Route path="/rent" element={isLoggedIn ? <><Navbar /><RentHub /></> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <><Navbar /><Profile /></> : <Navigate to="/" />} />
          <Route path="/settings" element={isLoggedIn ? <><Navbar /><Settings /></> : <Navigate to="/" />} />
          <Route path="/events" element={<ProtectedRoute><Navbar /><Events /></ProtectedRoute>} />
          <Route path="/create" element={isLoggedIn ? <><Navbar /><CreatePost /></> : <Navigate to="/" />} />
          <Route path="/reels" element={<ProtectedRoute><Navbar /><CampusReels /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

// Wrapping everything safely in AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}