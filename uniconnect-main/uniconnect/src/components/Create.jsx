import { useState, useEffect } from "react";
import axios from "axios"; 

export default function CreatePost({ onPostCreated }) {
  // Existing Post States
  const [content, setContent] = useState("");
  
  // NEW: State variables for Event linking
  const [isEventRelated, setIsEventRelated] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [events, setEvents] = useState([]); // To store fetched events

  // NEW: Fetch active events when component mounts so the user has options in the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Adjust this endpoint to match your events fetching route
        const response = await axios.get("http://localhost:5000/api/events"); 
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      // Send the request including the new event relation fields
      const response = await axios.post("http://localhost:5000/api/posts", {
        content,
        isEventRelated: isEventRelated,
        // Only send the relatedEventId if the user checked the box
        relatedEventId: isEventRelated ? selectedEventId : null, 
      });

      // Clear the form fields upon success
      setContent("");
      setIsEventRelated(false);
      setSelectedEventId("");

      // If you pass a callback prop to refresh the feed, trigger it here
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a Post</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea 
          placeholder="What's on your mind?" 
          className="border border-gray-300 p-3 rounded-lg h-24 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />

        {/* NEW: Checkbox to trigger Event linking */}
        <div className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox" 
            id="eventLink"
            className="w-4 h-4 cursor-pointer"
            checked={isEventRelated} 
            onChange={(e) => {
              setIsEventRelated(e.target.checked);
              // Reset the selected ID if they uncheck it
              if (!e.target.checked) setSelectedEventId("");
            }} 
          />
          <label htmlFor="eventLink" className="text-sm font-medium text-gray-700 cursor-pointer">
            Is this post related to a specific event?
          </label>
        </div>

        {/* NEW: Conditional Dropdown for selecting an Event */}
        {isEventRelated && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
             <label className="block text-sm text-gray-600 mb-1">Select the Event:</label>
             <select 
               className="border border-gray-300 p-2 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={selectedEventId} 
               onChange={(e) => setSelectedEventId(e.target.value)}
               required={isEventRelated}
             >
               <option value="" disabled>-- Choose an Event --</option>
               {events.map((event) => (
                 <option key={event._id} value={event._id}>
                   {event.title}
                 </option>
               ))}
             </select>
          </div>
        )}

        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-3 hover:bg-blue-700 transition"
        >
          Post to Feed
        </button>
      </form>
    </div>
  );
}