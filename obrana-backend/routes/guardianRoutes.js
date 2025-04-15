import express from "express";
import { createGuardian, getGuardians } from "../controllers/guardianController.js";

const router = express.Router();

router.post("/", createGuardian);
router.get("/", getGuardians);

export default router;
