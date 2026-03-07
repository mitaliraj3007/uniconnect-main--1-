import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // ✅ Spinner state
  const navigate = useNavigate();

  // ✅ React Hook Form setup for professional validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", resData.token);
        
        // ✅ Beautiful success toast instead of alert()
        toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
        
        onLogin(resData.user || { name: data.username || data.email.split("@")[0], email: data.email }); 
        navigate("/select-college");
      } else {
        // ✅ Beautiful error toast
        toast.error(resData.message || `${isLogin ? "Login" : "Sign up"} failed.`);
      }
    } catch (error) {
      toast.error("Server connection failed. Is your backend running?");
    } finally {
      setIsLoading(false); // Turn off spinner
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset(); // Clear errors when switching modes
  };

  const handleGuestLogin = () => {
    onLogin({ name: "Guest User", email: "guest@gmail.com" });
    navigate("/select-college");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1 className="text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        UniConnect
      </motion.h1>

      <motion.div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* ✅ Form uses handleSubmit from react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden mb-4"
              >
                <label className="w-full text-left mb-1 text-gray-300 font-medium block">Username</label>
                <input
                  type="text"
                  placeholder="JohnDoe123"
                  className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 ${errors.username ? "border-2 border-red-500" : "border border-purple-500 focus:ring-purple-400"}`}
                  {...register("username", { required: !isLogin && "Username is required" })}
                />
                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-4 w-full">
            <label className="w-full text-left mb-1 text-gray-300 font-medium block">Email Address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 ${errors.email ? "border-2 border-red-500" : "border border-purple-500 focus:ring-purple-400"}`}
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
              })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6 w-full">
            <label className="w-full text-left mb-1 text-gray-300 font-medium block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 ${errors.password ? "border-2 border-red-500" : "border border-purple-500 focus:ring-purple-400"}`}
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex justify-center items-center"
          >
            {/* ✅ Loading Spinner */}
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <button onClick={toggleMode} className="mt-4 text-sm text-purple-300 hover:text-white transition underline">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>

        <div className="my-4 text-gray-400 text-sm w-full text-center border-b border-gray-600 leading-[0.1em]">
          <span className="bg-[#1c1230] px-2 text-gray-400">OR</span>
        </div>

        <button onClick={handleGuestLogin} className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">
          Continue as Guest
        </button>
      </motion.div>
    </motion.div>
  );
}