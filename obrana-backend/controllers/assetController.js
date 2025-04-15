import Asset from "../models/Asset.js";
import Beneficiary from "../models/Beneficiary.js";

export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);

    const { name, primaryHeir, fallbackHeir } = req.body;

    // Add Primary Heir to beneficiaries if not already present
    if (primaryHeir) {
      await Beneficiary.updateOne(
        { walletAddress: primaryHeir },
        {
          $setOnInsert: {
            name: "Unknown",
            walletAddress: primaryHeir,
            assignedAsset: name,
            status: "Pending"
          }
        },
        { upsert: true }
      );
    }

    // Only add fallbackHeir if it's not empty
    if (fallbackHeir && fallbackHeir !== "0x0000000000000000000000000000000000000000") {
      await Beneficiary.updateOne(
        { walletAddress: fallbackHeir },
        {
          $setOnInsert: {
            name: "Unknown",
            walletAddress: fallbackHeir,
            assignedAsset: name,
            status: "Pending"
          }
        },
        { upsert: true }
      );
    }

    res.status(201).json(asset);
  } catch (err) {
    res.status(500).json({ message: "Failed to register asset", error: err.message });
  }
};

export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().sort({ registeredAt: -1 });
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assets", error: err.message });
  }
};
