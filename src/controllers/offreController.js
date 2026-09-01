import { OffreService } from "../services/offreService.js";

export class OffreController {
    static async getAll(req, res) {
        const result = await OffreService.getAll(req.query);
        res.status(200).json(result);
    }

    static async getById(req, res) {
        const offre = await OffreService.getById(req.params.id);
        if (!offre) return res.status(404).json({ error: "Offre not found" });
        res.status(200).json(offre);
    }

    static async create(req, res) {
        const offre = await OffreService.create(req.body);
        res.status(201).json(offre);
    }

    static async update(req, res) {
        const offre = await OffreService.update(req.params.id, req.body);
        if (!offre) return res.status(404).json({ error: "Offre not found" });
        res.status(200).json(offre);
    }

    static async delete(req, res) {
        const deleted = await OffreService.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Offre not found" });
        res.status(204).send();
    }
}
