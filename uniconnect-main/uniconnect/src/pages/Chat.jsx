import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Fake Friend Data ---
const friends = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Daisy", avatar: "https://i.pravatar.cc/100?img=4" },
];

export default function Chat() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({});

  const sendMessage = () => {
    if (!message.trim() || !selectedFriend) return;
    const newMessage = {
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "You",
    };
    setChats((prev) => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage],
    }));
    setMessage("");
  };

  return (
    <div className="h-[85vh] bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white rounded-2xl shadow-lg flex overflow-hidden">
      {/* Friend List */}
      <div className="w-1/3 border-r border-purple-800 overflow-y-auto">
        <h2 className="text-lg font-semibold text-center py-4 border-b border-purple-700">
          Messages
        </h2>
        {friends.map((f) => (
          <motion.div
            key={f.id}
            onClick={() => setSelectedFriend(f)}
            whileHover={{ scale: 1.03 }}
            className={`flex items-center gap-3 p-3 cursor-pointer ${
              selectedFriend?.id === f.id ? "bg-purple-700/40" : "hover:bg-purple-800/30"
            }`}
          >
            <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full border-2 border-purple-500" />
            <div>
              <h3 className="font-semibold">{f.name}</h3>
              <p className="text-xs text-gray-400">Click to chat</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedFriend ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-purple-700 p-3">
              <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-10 h-10 rounded-full border-2 border-purple-500" />
              <h2 className="text-lg font-semibold">{selectedFriend.name}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {(chats[selectedFriend.id] || []).map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.sender === "You" ? "bg-purple-600 text-white" : "bg-gray-800 text-purple-300"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-[10px] text-gray-400 text-right mt-1">{msg.time}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-purple-700 p-3 flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-900 border border-purple-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-all"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-400">
            <p>Select a friend to start chatting 💬</p>
          </div>
        )}
      </div>
    </div>
  );
}