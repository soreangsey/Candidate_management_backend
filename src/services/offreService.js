import offre from "../models/offre.js";
import candidature from "../models/candidature.js";
import categorie from "../models/categorie.js";
import { Op } from "sequelize";

export class OffreService {
    static async getAll(queryParams) {
        const where = {};
        if (queryParams.titre) where.titre = { [Op.iLike]: `%${queryParams.titre}%` };

        const page = parseInt(queryParams.page) || 0;
        const limit = parseInt(queryParams.limit) || 10;
        const offset = page * limit;
        const { count, rows } = await offre.findAndCountAll({
            where,
            include: [{
                model: categorie,
                as: "categorie",
                attributes: ["id", "nom"]
            }],
            limit,
            offset
        });
        const totalPages = Math.ceil(count / limit);

        return { data: rows, meta: { page, limit, total: count, totalPages, hasPrevious: page > 0, hasNext: page < totalPages - 1 } };
    }

    static async getById(id) {

        return await offre.findByPk(id, {
            include: [{
                model: categorie,
                as: "categorie",
                attributes: ["id", "nom"]
            }]
        });
    }

    static async create(data) {
        return await offre.create({
            titre: data.titre,
            entreprise: data.entreprise,
            description: data.description,
            lieu: data.lieu,
            date_publication: data.date_publication,
            id_categorie: data.id_categorie
        });
    }

    static async update(id, data) {
        const offreToUpdate = await offre.findByPk(id);
        if (!offreToUpdate) return null;
        await offreToUpdate.update({
            titre: data.titre,
            entreprise: data.entreprise,
            description: data.description,
            lieu: data.lieu,
            date_publication: data.date_publication,
            id_categorie: data.id_categorie
        });
        return offreToUpdate;
    }

    static async delete(id) {
        const offreToDelete = await offre.findByPk(id);
        if (!offreToDelete) return false;
        await candidature.destroy({ where: { id_offre: id } });
        await offreToDelete.destroy();
        return true;
    }
}
