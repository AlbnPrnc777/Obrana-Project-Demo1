import Guardian from "../models/Guardian.js";

export const createGuardian = async (req, res) => {
  try {
    const { walletAddress, fullName, relationship } = req.body;

    if (!walletAddress || !fullName || !relationship) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Guardian.findOne({ walletAddress });
    if (existing) {
      return res.status(409).json({ message: "Guardian already exists" });
    }

    const guardian = await Guardian.create({ walletAddress, fullName, relationship });
    res.status(201).json(guardian);
  } catch (err) {
    res.status(500).json({ message: "Failed to register guardian", error: err.message });
  }
};

export const getGuardians = async (req, res) => {
  try {
    const guardians = await Guardian.find().sort({ createdAt: -1 });
    res.status(200).json(guardians);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch guardians", error: err.message });
  }
};
