import express from "express";
import { UtilisateurController } from "../controllers/utilisateurController.js";
import { authorize, authorizeSelfOrAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authorize("admin"), UtilisateurController.getAll);
router.get("/:id", authorizeSelfOrAdmin, UtilisateurController.getById);
router.post("/", authorize("admin"), UtilisateurController.create);
router.put("/:id", authorizeSelfOrAdmin, UtilisateurController.update);
router.delete("/:id", authorizeSelfOrAdmin, UtilisateurController.delete);

export default router;
