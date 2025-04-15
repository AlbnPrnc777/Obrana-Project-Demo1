import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract/ObranaConfig.js";

export const confirmDeath = async (req, res) => {
  try {
    const { guardianPrivateKey } = req.body;

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(guardianPrivateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.confirmDeath();
    await tx.wait();

    res.status(200).json({ message: "✅ Death confirmed successfully on-chain." });
  } catch (err) {
    console.error("Death confirmation error:", err);
    res.status(500).json({ error: "❌ Failed to confirm death", details: err.message });
  }
};
