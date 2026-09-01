import utilisateur from "../models/utilisateur.js";
import { Op } from "sequelize";

export class UtilisateurService {
    static async getAll(queryParams) {
        const where = {};
        if (queryParams.nom) where.nom = { [Op.iLike]: `%${queryParams.nom}%` };

        const page = parseInt(queryParams.page) || 0;
        const limit = parseInt(queryParams.limit) || 10;
        const offset = page * limit;
        const { count, rows } = await utilisateur.findAndCountAll({ where, limit, offset, order: [['id', 'ASC']] });
        const totalPages = Math.ceil(count / limit);

        return { data: rows, meta: { page, limit, total: count, totalPages, hasPrevious: page > 0, hasNext: page < totalPages - 1 } };
    }

    static async getById(id) {
        return await utilisateur.findByPk(id);
    }

    static async getByEmail(email) {
        return await utilisateur.findOne({ where: { email } });
    }

    static async create(data) {
        return await utilisateur.create({ nom: data.nom, email: data.email, mot_de_passe: data.mot_de_passe, role: data.role });
    }

    static async update(id, data) {
        const utilisateurToUpdate = await utilisateur.findByPk(id);
        if (!utilisateurToUpdate) return null;

        const updateData = { nom: data.nom, email: data.email, mot_de_passe: data.mot_de_passe };
        if (data.role !== undefined) updateData.role = data.role;

        await utilisateurToUpdate.update(updateData);
        return utilisateurToUpdate;
    }

    static async delete(id) {
        const utilisateurToDelete = await utilisateur.findByPk(id);
        if (!utilisateurToDelete) return false;
        await utilisateurToDelete.destroy();
        return true;
    }
}
