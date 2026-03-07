import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  eventType: { type: String, enum: ["Hackathon", "Cultural", "Technical", "Workshop", "Other"], default: "Other" },
  organizerName: { type: String, required: true },
  organizerEmail: { type: String, required: true },
  college: { type: String, required: true },
  registrationLink: { type: String }, // Optional link to Google Form / Devfolio
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);