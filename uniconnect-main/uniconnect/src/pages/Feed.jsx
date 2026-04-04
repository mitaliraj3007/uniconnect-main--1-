import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Feed() {
  const { user, college } = useAuth();
  
  // Fallback name just in case
  const campusName = college?.name || "University";

  // Dummy data to demonstrate the 2-column layout!
  // (You will replace this with a fetch() call to your backend later)
  const [posts] = useState([
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      time: "2 hours ago",
      content: "Just finished my final project for Data Structures! If anyone needs help understanding Graph Algorithms before the finals, hit me up! 💻🚀",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      time: "5 hours ago",
      content: "Does anyone know if the main library is open past midnight this weekend? Trying to pull a study session.",
      likes: 12,
      comments: 8
    },
    {
      id: 3,
      author: "Tech Club",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechClub",
      time: "1 day ago",
      content: "📢 Reminder: The Spring Hackathon kicks off this Friday at the Student Union! Free pizza and RedBull for all participants. Register via the link in our bio!",
      likes: 89,
      comments: 14
    },
    {
      id: 4,
      author: "Michael Ross",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      time: "1 day ago",
      content: "Lost my blue hydroflask near the Engineering block. Please DM if found! 😭",
      likes: 5,
      comments: 1
    }
  ]);

  return (
    <div className="min-h-screen pb-32 bg-slate-50">
      
      {/* 🎓 HERO BANNER SECTION */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
            alt="University Campus" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 text-center px-6 mt-12">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 block">
            Official Campus Feed
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight shadow-sm">
            {campusName}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Your central hub to stay connected, share ideas, and discover everything happening around campus.
          </p>
        </div>
      </div>

      {/* 📰 TWO-COLUMN POSTS SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        
        {/* CSS Grid for 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {posts.map((post) => (
            /* Individual Post Card */
            <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              
              {/* Post Header (Avatar & Name) */}
              <div className="flex items-center gap-4 mb-4">
                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-indigo-50 bg-indigo-100" />
                <div>
                  <h3 className="font-bold text-slate-900">{post.author}</h3>
                  <p className="text-xs text-slate-500 font-medium">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-700 leading-relaxed mb-6">
                {post.content}
              </p>

              {/* Interaction Bar (Likes & Comments) */}
              <div className="flex items-center gap-6 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-500">
                <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                  <span className="text-lg">❤️</span> {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                  <span className="text-lg">💬</span> {post.comments}
                </button>
                <button className="ml-auto hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
      
    </div>
  );
}