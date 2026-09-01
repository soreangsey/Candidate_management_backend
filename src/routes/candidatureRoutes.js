import express from "express";
import { CandidatureController } from "../controllers/candidatureController.js";
import { authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authorize("user", "admin"), CandidatureController.getAll);
router.get("/:id", authorize("user", "admin"), CandidatureController.getById);
router.put("/:id", authorize("admin"), CandidatureController.update);
router.delete("/:id", authorize("user", "admin"), CandidatureController.delete);

export default router;
