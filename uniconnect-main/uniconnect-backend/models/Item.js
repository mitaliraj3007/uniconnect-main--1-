import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, default: "Misc" },
  listingType: { type: String, enum: ["Sell", "Rent"], required: true, default: "Sell" },
  
  // ✅ NEW FIELD FOR CONTACT INFO
  contactInfo: { type: String, required: true }, 

  sellerName: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  college: { type: String, required: true },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Sold'],
    default: 'Available'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);