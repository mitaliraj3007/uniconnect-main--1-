import CampusReels from "./pages/CampusReels.jsx";
import Events from "./pages/Events.jsx";
import { Toaster } from "react-hot-toast";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// ✅ 1. Import your AuthProvider and useAuth
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import SelectCollege from "./pages/SelectCollege";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import RentHub from "./pages/RentHub";
import Settings from "./pages/Settings";
import FindFriends from "./pages/FindFriends";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";

function AppContent() {
  // ✅ 2. Use global state from your AuthContext instead of local useState
  const { user, setUser, college, setCollege } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    // Save it as an object so college.name works in your Profile page!
    setCollege({ name: collegeData }); 
    navigate("/feed");
  };

  const isLoggedIn = !!user;
  const hideTopButtons = ["/", "/select-college"].includes(location.pathname);

  return (
  
    <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white min-h-screen flex flex-col relative overflow-hidden">

      <Toaster position="top-center" reverseOrder={false} /> {/* ✅ ADDED THIS */}

      {/* Floating Top Buttons... */}
      {!hideTopButtons && isLoggedIn && (
        <div className="absolute top-4 right-4 flex space-x-3 z-50">
          <button
            onClick={() => navigate("/chat")}
            className="p-3 bg-purple-700 hover:bg-purple-800 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
            title="Chat"
          >
            💬
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="p-3 bg-purple-700 hover:bg-purple-800 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
            title="Profile"
          >
            👤
          </button>
        </div>
      )}

      {/* Floating Create Post Button (only after login) */}
      {isLoggedIn && !hideTopButtons && (
        <button
          onClick={() => navigate("/create")}
          className="fixed bottom-20 right-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-3xl font-bold rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300"
          title="Create Post"
        >
          ＋
        </button>
      )}

      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                onLogin={handleLogin}
                onGuestLogin={handleGuestLogin}
                onAdminLogin={handleAdminLogin}
              />
            }
          />

          <Route
            path="/select-college"
            element={isLoggedIn ? <SelectCollege onSelect={handleCollegeSelect} /> : <Navigate to="/" />}
          />

          <Route
            path="/feed"
            element={isLoggedIn && college ? <><Navbar /><Feed /></> : <Navigate to="/" />}
          />

          <Route
            path="/friends"
            element={isLoggedIn ? <><Navbar /><FindFriends /></> : <Navigate to="/" />}
          />

          <Route
            path="/chat"
            element={isLoggedIn ? <><Navbar /><Chat /></> : <Navigate to="/" />}
          />

          <Route
            path="/rent"
            element={isLoggedIn ? <><Navbar /><RentHub /></> : <Navigate to="/" />}
          />

          <Route
            path="/profile"
            element={isLoggedIn ? <><Navbar /><Profile /></> : <Navigate to="/" />}
          />

          <Route
            path="/settings"
            element={isLoggedIn ? <><Navbar /><Settings /></> : <Navigate to="/" />}
          />

          <Route path="/events" element={<ProtectedRoute><Navbar /><Events /></ProtectedRoute>} />

          <Route
            path="/create"
            element={isLoggedIn ? <><Navbar /><CreatePost /></> : <Navigate to="/" />}
          />

          <Route path="/reels" element={<ProtectedRoute><Navbar /><CampusReels /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

// ✅ 3. Wrap everything in your AuthProvider!
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}