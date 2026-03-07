import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function RentHub() {
  const { user, college } = useAuth();
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

  // ✅ FETCH ITEMS WITH FILTERS
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      // Build the query string dynamically
      const params = new URLSearchParams({
        search: searchQuery,
        category: filterCategory,
        type: filterType,
        maxPrice: maxPrice
      });

      const response = await fetch(`${API_BASE_URL}/items/${college.name}?${params}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load items.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Trigger fetch whenever a filter changes
  useEffect(() => {
    // Add a slight delay (debounce) so it doesn't fetch on every single keystroke of the search bar
    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [college, searchQuery, filterCategory, filterType, maxPrice]);


  const onSubmit = async (data) => {
    const itemData = {
      ...data,
      sellerName: user.username || user.name,
      sellerEmail: user.email,
      college: college.name,
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
          items.map((item) => (
            <motion.div key={item._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col relative hover:bg-white/15 transition duration-300">
              <div className={`absolute top-4 left-4 text-xs font-extrabold px-3 py-1 rounded-full shadow-md ${item.listingType === 'Rent' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                FOR {item.listingType.toUpperCase()}
              </div>
              <div className="h-40 bg-black/40 flex items-center justify-center text-6xl">
                {item.category === "Furniture" ? "🛏️" : item.category === "Electronics" ? "💻" : item.category === "Books" ? "📚" : "📦"}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-lg font-bold truncate">{item.title}</h3>
                  <div className="text-right whitespace-nowrap">
                    <span className="text-green-400 font-bold">₹{item.price}</span>
                    {item.listingType === 'Rent' && <span className="text-gray-400 text-[10px] block">/ month</span>}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">{item.description}</p>
                <div className="bg-black/30 p-2 rounded-lg mb-4 flex items-center gap-2">
                  <span>📞</span><p className="text-xs text-purple-200 font-medium truncate">{item.contactInfo}</p>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <p className="text-xs text-gray-400 truncate pr-2">By <span className="text-purple-300 font-medium">{item.sellerName}</span></p>
                  <a href={`mailto:${item.sellerEmail}`} className="bg-purple-600 hover:bg-purple-500 py-1 px-3 rounded-lg text-xs font-semibold transition shadow-md">Email</a>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* POST ITEM MODAL (Remains unchanged from before) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-gray-900 border border-gray-700 p-8 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Post an Item</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4 p-1 bg-black/50 rounded-lg border border-gray-700">
                  <label className={`flex-1 text-center py-2 rounded-md cursor-pointer font-semibold transition ${watchListingType === 'Sell' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                    <input type="radio" value="Sell" className="hidden" {...register("listingType")} />Sell
                  </label>
                  <label className={`flex-1 text-center py-2 rounded-md cursor-pointer font-semibold transition ${watchListingType === 'Rent' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                    <input type="radio" value="Rent" className="hidden" {...register("listingType")} />Rent Out
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Item Title</label>
                  <input type="text" placeholder="e.g., Mini Fridge" className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" {...register("title", { required: true })} />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-300 mb-1">Price (₹)</label>
                    <div className="relative">
                      <input type="number" placeholder="500" className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" {...register("price", { required: true })} />
                      {watchListingType === 'Rent' && <span className="absolute right-3 top-3 text-gray-400 text-sm">/mo</span>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-300 mb-1">Category</label>
                    <select className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" {...register("category")}>
                      <option value="Books">Books & Notes</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Room/Furniture</option>
                      <option value="Misc">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Contact Info</label>
                  <input type="text" placeholder="Phone or Room No." className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" {...register("contactInfo", { required: true })} />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Description</label>
                  <textarea rows="2" placeholder="Condition, pickup details..." className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" {...register("description", { required: true })}></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition mt-2">
                  {watchListingType === 'Rent' ? 'List for Rent' : 'List for Sale'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}