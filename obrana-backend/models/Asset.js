import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: String,
  tokenAddress: String,
  tokenId: String,
  isERC721: Boolean,
  primaryHeir: String,
  fallbackHeir: String,
  unlockTime: Number,
  minHeirAge: Number,
  heirBirthdate: Number,
  category: String,
  transferred: {
    type: Boolean,
    default: false
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Asset", assetSchema);
