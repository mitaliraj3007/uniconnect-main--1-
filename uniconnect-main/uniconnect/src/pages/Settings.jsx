import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Theme toggle:
 * - stores "theme" in localStorage as 'dark' or 'light'
 * - adds class 'light-theme' to document.documentElement when light; removes for dark
 * - you can expand CSS to style .light-theme if needed
 */

export default function Settings() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("uni_theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    // apply theme to document root
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
    localStorage.setItem("uni_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    // simple logout: clear local keys and reload
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uni_college");
    window.location.href = "/";
  };

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">Settings</h1>

      <div className="grid gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Theme</h3>
          <p className="text-sm opacity-80 mb-3">Current: <span className="font-bold">{theme}</span></p>
          <button onClick={toggleTheme} className="btn btn-primary">
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">About UniConnect</h3>
          <p className="text-sm opacity-80">
            UniConnect — campus-first social app. Demo payment flow and theme toggle are included.
          </p>
        </div>

        <div className="card">
          <button onClick={handleLogout} className="btn btn-secondary w-full">Logout</button>
        </div>
      </div>
    </motion.div>
  );
}