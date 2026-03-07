import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Pull in your auth context!

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, setCollege } = useAuth(); 

  const handleLogout = () => {
    // 1. Delete the security token and user data from the browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("college");
    
    // 2. Clear the React state so the app forgets who is logged in
    setUser(null);
    setCollege(null);

    // 3. Send the user back to the login screen
    navigate("/");
  };

  // Optional: Hide the navbar entirely if nobody is logged in
  if (!user) return null; 

  return (
    <nav className="flex justify-between items-center p-4 bg-purple-900 text-white shadow-lg">
      <div className="font-bold text-xl">
        <Link to="/select-college">UniConnect</Link>
      </div>
      
      <div className="flex gap-4 items-center">
        {/* Profile Link */}
        <Link 
          to="/profile" 
          className="hover:text-purple-300 transition font-medium"
        >
          My Profile ({user.username || user.name})
        </Link>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}