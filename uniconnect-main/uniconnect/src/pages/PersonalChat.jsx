import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PersonalChat() {
  const { name } = useParams();
  const [messages, setMessages] = useState([
    { sender: "friend", text: "Hey there! 😊" },
    { sender: "me", text: "Hi! How’s your day going?" },
    { sender: "friend", text: "Pretty good, just working on my project." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "me", text: input }]);
      setInput("");
    }
  };

  return (
    <motion.div className="flex flex-col h-screen p-4 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-xl font-bold mb-4">Chat with {name}</h1>
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl max-w-[70%] ${
              msg.sender === "me" ? "ml-auto bg-purple-500/70" : "bg-white/20"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="input flex-1"
        />
        <button onClick={sendMessage} className="btn btn-primary px-4">Send</button>
      </div>
    </motion.div>
  );
}