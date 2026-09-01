import express from "express";
import authRoutes from "./authRoutes.js";
import categorieRoutes from "./categorieRoutes.js";
import offreRoutes from "./offreRoutes.js";
import candidatureRoutes from "./candidatureRoutes.js";
import utilisateurRoutes from "./utilisateurRoutes.js";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/categorie", categorieRoutes);
router.use("/api/offre", offreRoutes);
router.use("/api/candidature", candidatureRoutes);
router.use("/api/utilisateur", utilisateurRoutes);

export default router;
