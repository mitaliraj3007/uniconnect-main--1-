import { useState } from "react";
import axios from "axios";

export default function CreatePost({ onPostCreated }) {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    const res = await axios.post("http://localhost:50001/api/posts", {
      authorName,
      content,
    });

    setAuthorName("");
    setContent("");
    onPostCreated(res.data);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your name"
          className="border p-2 rounded"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <textarea
          placeholder="Share something with your campus..."
          className="border p-2 rounded"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}