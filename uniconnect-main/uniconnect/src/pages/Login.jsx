import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";

export default function Login({ onLogin, onGuestLogin, onAdminLogin }) {
  // Toggle between Login and Sign Up
  const [isLogin, setIsLogin] = useState(true); 

  const [selectedCollege, setSelectedCollege] = useState("");
  const [username, setUsername] = useState(""); // Only used for Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const universities = [
    "Chandigarh University",
    "Indian Institute of Technology (IIT)",
    "National Institute of Technology (NIT)",
    "Delhi University",
    "Vellore Institute of Technology",
    "BITS Pilani"
  ];

  // --- REGISTRATION LOGIC ---
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedCollege || !username || !email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // Send new user data
      });

      if (res.ok) {
        const newUser = await res.json();
        toast.success("Account created successfully!");
        onLogin(newUser, selectedCollege); // Log them in immediately!
      } else {
        const errData = await res.json();
        toast.error(errData || "Failed to create account.");
      }
    } catch (err) {
      toast.error("Server error. Is the backend running?");
    }
  };

  // --- LOGIN LOGIC ---
  const handleStandardLogin = async (e) => {
    e.preventDefault();
    if (!selectedCollege || !email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const realUserData = await res.json();
        onLogin(realUserData, selectedCollege);
        toast.success(`Welcome back, ${realUserData.username}!`);
      } else {
        toast.error("Invalid email or password!");
      }
    } catch (err) {
      toast.error("Server error. Is the backend running?");
    }
  };

  return (
    // 1. ADDED BACKGROUND IMAGE HERE
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')" }}
    >
      
      {/* 2. ADDED DARK BLURRED OVERLAY TO MAKE CARD STAND OUT */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>

      {/* 3. ADDED 'bg-white rounded-2xl relative z-10' SO IT SITS ON TOP OF THE OVERLAY */}
      <div className="card w-full max-w-md p-8 shadow-2xl bg-white rounded-2xl relative z-10">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">UniConnect</h1>
          <p className="text-slate-500 text-sm">
            {isLogin ? "Welcome back to your campus." : "Join your campus network."}
          </p>
        </div>

        <form onSubmit={isLogin ? handleStandardLogin : handleRegister} className="space-y-4">
          
          {/* University Dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Select Campus</label>
            <select 
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full mt-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
            >
              <option value="" disabled>-- Choose your University --</option>
              {universities.map((uni, index) => (
                <option key={index} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          <hr className="border-slate-100 my-4" />

          {/* Username Field (ONLY shows during Sign Up) */}
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                placeholder="campus_legend"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-md mt-4">
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="mt-6 text-center text-sm text-slate-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-indigo-600 font-bold hover:underline outline-none"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>

        {/* Testing Buttons (Only show on Login mode to keep UI clean) */}
        {isLogin && (
          <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-slate-100">
            <button onClick={() => { if(!selectedCollege) toast.error("Select a campus!"); else onGuestLogin(selectedCollege); }} className="w-full bg-slate-100 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors">
              Explore as Guest
            </button>
          </div>
        )}

      </div>
    </div>
  );
}