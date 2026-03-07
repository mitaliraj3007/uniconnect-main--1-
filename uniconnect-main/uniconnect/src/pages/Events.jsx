import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function Events() {
  const { user, college } = useAuth();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${college.name}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error("Failed to load events.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, [college]);

  const onSubmit = async (data) => {
    const eventData = { ...data, organizerName: user.username || user.name, organizerEmail: user.email, college: college.name };
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        toast.success("Event posted successfully!");
        setShowModal(false); reset(); fetchEvents();
      } else { toast.error("Failed to post event."); }
    } catch (error) { toast.error("Server connection failed."); }
  };

  return (
    <div className="p-8 pb-24 bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-5xl mx-auto mb-8 mt-4 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Campus Events & Hackathons</h1>
          <p className="text-gray-300 mt-2">Upcoming events at {college?.name}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 text-white font-bold py-3 px-6 rounded-full shadow-lg transition">
          ＋ Host an Event
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? <p>Loading events...</p> : events.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl"><p className="text-gray-400">No upcoming events. Host one!</p></div>
        ) : (
          events.map((evt) => (
            <motion.div key={evt._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500"></div>
              <div className="flex justify-between items-start mb-3 pl-3">
                <h3 className="text-xl font-bold text-cyan-300">{evt.title}</h3>
                <span className="bg-blue-500/30 text-blue-200 text-xs px-2 py-1 rounded border border-blue-500/50">{evt.eventType}</span>
              </div>
              <div className="pl-3 space-y-2 text-sm text-gray-300 mb-4">
                <p>📅 {new Date(evt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                <p>📍 {evt.location}</p>
                <p>👤 By {evt.organizerName}</p>
              </div>
              <p className="pl-3 text-sm text-gray-400 mb-4 line-clamp-3">{evt.description}</p>
              {evt.registrationLink && (
                <a href={evt.registrationLink.startsWith('http') ? evt.registrationLink : `https://${evt.registrationLink}`} target="_blank" rel="noreferrer" className="block text-center bg-cyan-600 hover:bg-cyan-500 py-2 rounded-lg text-sm font-bold transition ml-3">
                  Register Now
                </a>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* POST EVENT MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 text-xl">✕</button>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Host an Event</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="text" placeholder="Event Title" className="w-full bg-black/50 border border-gray-600 rounded px-4 py-2 text-white" {...register("title", { required: true })} />
                <div className="flex gap-2">
                  <input type="date" className="w-1/2 bg-black/50 border border-gray-600 rounded px-4 py-2 text-white" {...register("date", { required: true })} />
                  <select className="w-1/2 bg-black/50 border border-gray-600 rounded px-4 py-2 text-white" {...register("eventType")}>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <input type="text" placeholder="Location (e.g. Main Auditorium)" className="w-full bg-black/50 border border-gray-600 rounded px-4 py-2 text-white" {...register("location", { required: true })} />
                <textarea placeholder="Event Description..." rows="3" className="w-full bg-black/50 border border-gray-600 rounded px-4 py-2 text-white" {...register("description", { required: true })}></textarea>
                <input type="text" placeholder="Registration Link (Optional)" className="w-full bg-black/50 border border-gray-600 rounded px-4 py-2 text-white" {...register("registrationLink")} />
                <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded hover:bg-cyan-500 transition mt-2">Publish Event</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}