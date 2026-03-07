import { motion } from "framer-motion";

export default function CreatePost() {
  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">Create Post</h1>
      <div className="card">
        <textarea className="input mb-4" placeholder="What's on your mind?" rows="4" />
        <input type="file" className="mb-4" />
        <button className="btn btn-primary w-full">Post</button>
      </div>
    </motion.div>
  );
}