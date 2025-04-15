// models/Guardian.js
import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Registered", "Pending"],
    default: "Registered",
  },
}, { timestamps: true });

export default mongoose.model("Guardian", guardianSchema);
