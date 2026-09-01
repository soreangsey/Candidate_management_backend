import { UtilisateurService } from "../services/utilisateurService.js";

export class UtilisateurController {
    static async getAll(req, res) {
        const result = await UtilisateurService.getAll(req.query);
        res.status(200).json(result);
    }

    static async getById(req, res) {
        const utilisateur = await UtilisateurService.getById(req.params.id);
        if (!utilisateur) return res.status(404).json({ error: "Utilisateur not found" });
        res.status(200).json(utilisateur);
    }

    static async create(req, res) {
        const utilisateur = await UtilisateurService.create(req.body);
        res.status(201).json(utilisateur);
    }

    static async update(req, res) {
        const data = { ...req.body };
        if (req.user.role !== "admin") delete data.role;

        const utilisateur = await UtilisateurService.update(req.params.id, data);
        if (!utilisateur) return res.status(404).json({ error: "Utilisateur not found" });
        res.status(200).json(utilisateur);
    }

    static async delete(req, res) {
        const deleted = await UtilisateurService.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Utilisateur not found" });
        res.status(204).send();
    }
}
