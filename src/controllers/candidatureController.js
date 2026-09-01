import { CandidatureService } from "../services/candidatureService.js";

export class CandidatureController {
    static async getAll(req, res) {
        const offreId = req.params.id || null;
        const result = await CandidatureService.getAll(req.query, req.user.id, req.user.role, offreId);
        res.status(200).json(result);
    }

    static async getById(req, res) {
        const candidature = await CandidatureService.getById(req.params.id);
        if (!candidature) return res.status(404).json({ error: "Candidature not found" });
        if (req.user.role !== "admin" && candidature.id_utilisateur !== req.user.id) return res.status(403).json({ error: "Forbidden" });
        res.status(200).json(candidature);
    }

    static async create(req, res) {
        try {
            const candidature = await CandidatureService.create(req.body, req.user.id, req.params.id);
            res.status(201).json(candidature);
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") return res.status(409).json({ error: "Utilisateur a déjà postulé à cette offre." });
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        if (req.body.status && !["en_attente", "acceptee", "refusee"].includes(req.body.status)) {
            return res.status(400).json({ error: "Status invalide" });
        }

        const candidature = await CandidatureService.update(req.params.id, req.body);
        if (!candidature) return res.status(404).json({ error: "Candidature not found" });
        res.status(200).json(candidature);
    }

    static async delete(req, res) {
        const result = await CandidatureService.delete(req.params.id, req.user.id, req.user.role);
        if (result.error === "not_found") return res.status(404).json({ error: "Candidature not found" });
        if (result.error === "forbidden") return res.status(403).json({ error: "Forbidden" });
        res.status(204).send();
    }
}
