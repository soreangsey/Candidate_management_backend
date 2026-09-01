import candidature from "../models/candidature.js";
import utilisateur from "../models/utilisateur.js";
import offre from "../models/offre.js";

export class CandidatureService {
    static async getAll(queryParams, userId, role, offreId = null) {
        const where = {};

        if (role !== "admin") where.id_utilisateur = userId;
        if (offreId) where.id_offre = offreId;
        if (queryParams.id) where.id = queryParams.id;

        const page = parseInt(queryParams.page) || 0;
        const limit = parseInt(queryParams.limit) || 10;
        const offset = page * limit;

        const { count, rows } = await candidature.findAndCountAll({
            where,
            include: [
                { model: utilisateur, as: 'utilisateur' },
                { model: offre, as: 'offre' }
            ],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);
        return { data: rows, meta: { page, limit, total: count, totalPages, hasPrevious: page > 0, hasNext: page < totalPages - 1 } };
    }

    static async getById(id) {
        return await candidature.findByPk(id, {
            include: [
                { model: utilisateur, as: 'utilisateur' },
                { model: offre, as: 'offre' }
            ]
        });
    }

    static async create(data, userId, offreId) {
        return await candidature.create({
            status: "en_attente",
            date_candidature: data.date_candidature,
            message: data.message,
            id_utilisateur: userId,
            id_offre: offreId
        });
    }

    static async update(id, data) {
        const candidatureToUpdate = await candidature.findByPk(id);
        if (!candidatureToUpdate) return null;

        const updateData = {};
        if (data.status !== undefined) updateData.status = data.status;
        if (data.date_candidature !== undefined) updateData.date_candidature = data.date_candidature;
        if (data.message !== undefined) updateData.message = data.message;
        if (data.id_utilisateur !== undefined) updateData.id_utilisateur = data.id_utilisateur;
        if (data.id_offre !== undefined) updateData.id_offre = data.id_offre;

        await candidatureToUpdate.update(updateData);
        return candidatureToUpdate;
    }

    static async delete(id, userId, role) {
        const candidatureToDelete = await candidature.findByPk(id);
        if (!candidatureToDelete) return { error: "not_found" };
        if (role !== "admin" && candidatureToDelete.id_utilisateur !== userId) return { error: "forbidden" };

        await candidatureToDelete.destroy();
        return { success: true };
    }
}
