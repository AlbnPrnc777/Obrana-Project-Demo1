import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import assetRoutes from "./routes/assetRoutes.js"; // ✅ this matters
import guardianRoutes from "./routes/guardianRoutes.js";
import deathRoutes from "./routes/deathRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/assets", assetRoutes); // ✅ this must match the URL
app.use("/api/guardians", guardianRoutes);
app.use("/api/death", deathRoutes);

// Root test route
app.get("/", (req, res) => res.send("API Running..."));

// DB connect + start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
    console.log("✅ MongoDB connected");
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
