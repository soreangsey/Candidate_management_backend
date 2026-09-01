import express from "express";
import { OffreController } from "../controllers/offreController.js";
import { CandidatureController } from "../controllers/candidatureController.js";
import { authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/", authorize("user", "admin"), OffreController.getAll);
// router.post("/", authorize("admin"), OffreController.create);
// router.post("/:id/apply", authorize("user"), CandidatureController.create);
// router.get("/:id/applications", authorize("admin"), CandidatureController.getAll);
// router.get("/:id", authorize("user", "admin"), OffreController.getById);
// router.put("/:id", authorize("admin"), OffreController.update);
// router.delete("/:id", authorize("admin"), OffreController.delete);

router.get("/", OffreController.getAll);
router.post("/", OffreController.create);
router.post("/:id/apply",  CandidatureController.create);
router.get("/:id/candidature", CandidatureController.getAll);
router.get("/:id", OffreController.getById);
router.put("/:id",  OffreController.update);
router.delete("/:id", OffreController.delete);

export default router;
