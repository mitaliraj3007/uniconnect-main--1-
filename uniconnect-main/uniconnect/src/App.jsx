import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Context & Components
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

// Pages
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import RentHub from "./pages/RentHub";
import Settings from "./pages/Settings";
import FindFriends from "./pages/FindFriends";
import CreatePost from "./pages/CreatePost";
import Events from "./pages/Events.jsx";
import CampusReels from "./pages/CampusReels.jsx";

// Note: SelectCollege is completely removed since it's on the Login page now!

function AppContent() {
  const { user, setUser, college, setCollege } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // --- Login Handlers ---
  const handleLogin = (userData, collegeName) => {
    setUser(userData);
    setCollege({ name: collegeName });
    navigate("/feed");
  };

  const handleGuestLogin = (collegeName) => {
    setUser({ name: "Guest User", email: "guest@gmail.com", type: "guest" });
    setCollege({ name: collegeName });
    navigate("/feed");
  };

  const handleAdminLogin = (collegeName) => {
    setUser({ name: "Admin", email: "admin@uniconnect.com", type: "admin" });
    setCollege({ name: collegeName });
    navigate("/feed");
  };

  const isLoggedIn = !!user;
  const hideTopButtons = ["/"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      
      <Toaster position="top-center" reverseOrder={false} />

      {/* Floating Top Buttons */}
      {!hideTopButtons && isLoggedIn && (
        <div className="absolute top-4 right-4 flex space-x-3 z-50">
          <button
            onClick={() => navigate("/chat")}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition-all duration-300 hover:scale-110 text-white"
            title="Chat"
          >
            💬
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition-all duration-300 hover:scale-110 text-white"
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
          className="fixed bottom-20 right-6 bg-indigo-600 text-white text-3xl font-light rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-300 z-50"
          title="Create Post"
        >
          ＋
        </button>
      )}

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} onGuestLogin={handleGuestLogin} onAdminLogin={handleAdminLogin} />} />
          
          {/* Main App Routes */}
          <Route path="/feed" element={isLoggedIn && college ? <><Navbar /><Feed /></> : <Navigate to="/" />} />
          <Route path="/friends" element={isLoggedIn ? <><Navbar /><FindFriends /></> : <Navigate to="/" />} />
          <Route path="/chat" element={isLoggedIn ? <><Navbar /><Chat /></> : <Navigate to="/" />} />
          <Route path="/rent" element={isLoggedIn ? <><Navbar /><RentHub /></> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <><Navbar /><Profile /></> : <Navigate to="/" />} />
          <Route path="/settings" element={isLoggedIn ? <><Navbar /><Settings /></> : <Navigate to="/" />} />
          <Route path="/events" element={<ProtectedRoute><Navbar /><Events /></ProtectedRoute>} />
          <Route path="/create" element={isLoggedIn ? <><Navbar /><CreatePost /></> : <Navigate to="/" />} />
          <Route path="/reels" element={<ProtectedRoute><Navbar /><CampusReels /></ProtectedRoute>} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

// Global Provider Wrapper
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}