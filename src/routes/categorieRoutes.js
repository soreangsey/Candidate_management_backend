import express from "express";
import { CategorieController } from "../controllers/categorieController.js";
import { authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

//router.get("/", authorize("user", "admin"), CategorieController.getAll);
//router.get("/:id", authorize("user", "admin"), CategorieController.getById);
// router.post("/", authorize("admin"), CategorieController.create);
// router.put("/:id", authorize("admin"), CategorieController.update);
// router.delete("/:id", authorize("admin"), CategorieController.delete);

router.get("/",  CategorieController.getAll);
router.get("/:id", CategorieController.getById);
router.post("/",  CategorieController.create);
router.put("/:id", CategorieController.update);
router.delete("/:id",  CategorieController.delete);

export default router;
