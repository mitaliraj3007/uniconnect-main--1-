import React, { useState } from "react";

export default function CampusReels() {
  // Temporary dummy data so you can test the scrolling right away
  const [reels, setReels] = useState([
    {
      _id: "1",
      author: "Student Council",
      content: "Setup for the annual hackathon is almost done! 🚀💻",
      bgImage: "https://picsum.photos/seed/hackathon/800/1200",
      likes: 142,
    },
    {
      _id: "2",
      author: "Tech Club",
      content: "Late night coding sessions in the library be like... ☕",
      bgImage: "https://picsum.photos/seed/coding/800/1200",
      likes: 89,
    },
    {
      _id: "3",
      author: "Sports Comm",
      content: "Finals match tomorrow at the main ground! Be there! ⚽",
      bgImage: "https://picsum.photos/seed/sports/800/1200",
      likes: 210,
    }
  ]);

  return (
    // The Container: h-screen (full height), overflow-y-scroll (allows scrolling), snap-y snap-mandatory (forces the reel effect)
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory hide-scrollbar relative">
      
      {reels.map((reel) => (
        // The Reel Item: h-screen (takes full screen), snap-start (snaps exactly to the top of this div)
        <div 
          key={reel._id} 
          className="h-screen w-full snap-start snap-always relative flex justify-center items-center bg-gray-900"
        >
          {/* Background Image / Video Player */}
          <img 
            src={reel.bgImage} 
            alt="Reel content" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          {/* Dark gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"></div>

          {/* Bottom Left: User Info and Caption */}
          <div className="absolute bottom-20 left-4 right-20 text-white z-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-sm">
                {reel.author.charAt(0)}
              </div>
              {reel.author}
            </h3>
            <p className="mt-2 text-sm text-gray-200 line-clamp-3">{reel.content}</p>
          </div>

          {/* Bottom Right: Engagement Buttons (Like, Comment, Share) */}
          <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6 z-10">
            {/* Like Button */}
            <button className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition">
                <span className="text-2xl group-hover:scale-110 transition">❤️</span>
              </div>
              <span className="text-white text-xs mt-1 font-semibold">{reel.likes}</span>
            </button>

            {/* Comment Button */}
            <button className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition">
                <span className="text-2xl group-hover:scale-110 transition">💬</span>
              </div>
              <span className="text-white text-xs mt-1 font-semibold">12</span>
            </button>

            {/* Share Button */}
            <button className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition">
                <span className="text-2xl group-hover:scale-110 transition">↗️</span>
              </div>
              <span className="text-white text-xs mt-1 font-semibold">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}