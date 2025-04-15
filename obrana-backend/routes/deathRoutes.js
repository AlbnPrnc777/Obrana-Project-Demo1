import express from "express";
import { confirmDeath } from "../controllers/deathController.js";

const router = express.Router();

router.post("/confirm", confirmDeath);

export default router;
