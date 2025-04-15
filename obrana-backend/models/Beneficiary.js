import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  assets: [
    {
      type: String, // asset name (e.g., "Real Estate Token")
    },
  ],
  status: {
    type: String,
    enum: ["Approved", "Pending"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

export default Beneficiary;
