import express from "express";
import { CategorieController } from "../controllers/categorieController.js";
import { authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authorize("user", "admin"), CategorieController.getAll);
router.get("/:id", authorize("user", "admin"), CategorieController.getById);
router.post("/", authorize("admin"), CategorieController.create);
router.put("/:id", authorize("admin"), CategorieController.update);
router.delete("/:id", authorize("admin"), CategorieController.delete);

export default router;
