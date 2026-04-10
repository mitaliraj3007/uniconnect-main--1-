import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function RentHub() {
  const { user, college } = useAuth();
  
  // ✅ Removed the duplicate items state
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ FILTER STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { listingType: "Sell" }
  });
  const watchListingType = watch("listingType");

  // ✅ UNIFIED FETCH LOGIC
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        category: filterCategory,
        type: filterType,
        maxPrice: maxPrice
      });

      const response = await fetch(`${API_BASE_URL}/items/${college?.name}?${params}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load items.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Trigger fetch whenever a filter changes (Handles initial load too!)
  useEffect(() => {
    if (!college) return; // Wait until college is loaded
    
    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [college, searchQuery, filterCategory, filterType, maxPrice]);

  // --- UTILIZATION CALCULATIONS ---
  const totalAvailable = items.filter(item => !item.status || item.status === 'Available').length;
  const totalRented = items.filter(item => item.status === 'Rented').length;
  const totalSold = items.filter(item => item.status === 'Sold').length;

  const onSubmit = async (data) => {
    const itemData = {
      ...data,
      sellerName: user.username || user.name,
      sellerEmail: user.email,
      college: college.name,
      status: "Available" // Explicitly set new items as available
    };

    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        toast.success(`Item posted successfully!`);
        setShowModal(false);
        reset(); 
        fetchItems(); 
      } else {
        toast.error("Failed to post item.");
      }
    } catch (error) {
      toast.error("Server connection failed.");
    }
  };

  return (
    <div className="p-8 pb-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto mb-8 mt-4 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Rent & Sell Hub
          </h1>
          <p className="text-gray-300 mt-2">Find or list items within {college?.name}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 whitespace-nowrap">
          ＋ Post an Item
        </button>
      </div>

      {/* ✅ UTILIZATION DASHBOARD */}
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 mb-6 flex justify-around text-center">
        <div>
           <p className="text-gray-400 font-semibold uppercase text-xs tracking-widest">Available</p>
           <p className="text-3xl font-bold text-green-400">{totalAvailable}</p>
        </div>
        <div>
           <p className="text-gray-400 font-semibold uppercase text-xs tracking-widest">Rented</p>
           <p className="text-3xl font-bold text-blue-400">{totalRented}</p>
        </div>
        <div>
           <p className="text-gray-400 font-semibold uppercase text-xs tracking-widest">Sold</p>
           <p className="text-3xl font-bold text-red-500">{totalSold}</p>
        </div>
      </div>

      {/* ✅ ADVANCED FILTERS BAR */}
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/10 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="relative col-span-1 md:col-span-1">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input 
            type="text" placeholder="Search items..." 
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500" 
          />
        </div>

        {/* Category Filter */}
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-black/40 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500">
          <option value="All">All Categories</option>
          <option value="Books">Books & Notes</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Room/Furniture</option>
          <option value="Misc">Other</option>
        </select>

        {/* Type Filter */}
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-black/40 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500">
          <option value="All">Rent & Buy</option>
          <option value="Rent">For Rent Only</option>
          <option value="Sell">For Sale Only</option>
        </select>

        {/* Price Slider */}
        <div className="flex flex-col px-2">
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>Max Price</span>
            <span className="font-bold text-green-400">{maxPrice === "10000" ? 'Any Price' : `Under ₹${maxPrice}`}</span>
          </div>
          <input 
            type="range" min="0" max="10000" step="100" 
            value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-purple-500"
          />
        </div>
      </div>

      {/* ITEMS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-10"><p className="text-gray-400 animate-pulse text-lg">Searching marketplace...</p></div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-xl mb-2">No items found matching your filters. 😢</p>
            <button onClick={() => {setSearchQuery(""); setFilterCategory("All"); setFilterType("All"); setMaxPrice(10000);}} className="text-purple-400 hover:text-purple-300 underline mt-2">Clear Filters</button>
          </div>
        ) : (
          items.map((item) => {
            const isAvailable = !item.status || item.status === 'Available';
            
            return (
            <motion.div key={item._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col relative hover:bg-white/15 transition duration-300">
              
              {/* Type Tag (Top Left) */}
              <div className={`absolute top-4 left-4 text-xs font-extrabold px-3 py-1 rounded-