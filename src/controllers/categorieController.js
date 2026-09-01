import { CategorieService } from "../services/categorieService.js";

export class CategorieController {
    static async getAll(req, res) {
        const result = await CategorieService.getAll(req.query);
        res.status(200).json(result);
    }

    static async getById(req, res) {
        const categorie = await CategorieService.getById(req.params.id);
        if (!categorie) return res.status(404).json({ error: "Category not found" });
        res.status(200).json(categorie);
    }

    static async create(req, res) {
        const categorie = await CategorieService.create(req.body);
        res.status(201).json(categorie);
    }

    static async update(req, res) {
        const categorie = await CategorieService.update(req.params.id, req.body);
        if (!categorie) return res.status(404).json({ error: "Category not found" });
        res.status(200).json(categorie);
    }

    static async delete(req, res) {
        const deleted = await CategorieService.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Category not found" });
        res.status(204).send();
    }
}
