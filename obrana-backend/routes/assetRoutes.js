import express from "express";
import { createAsset, getAssets } from "../controllers/assetController.js";

const router = express.Router();

router.get("/", getAssets); // ✅ returns JSON from MongoDB
router.post("/", createAsset);

export default router;
