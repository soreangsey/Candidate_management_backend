import categorie from "../models/categorie.js";
import { Op } from "sequelize";

export class CategorieService {
    static async getAll(queryParams) {
        const where = {};
        if (queryParams.nom) where.nom = { [Op.iLike]: `%${queryParams.nom}%` };

        const page = parseInt(queryParams.page) || 0;
        const limit = parseInt(queryParams.limit) || 10;
        const offset = page * limit;
        const { count, rows } = await categorie.findAndCountAll({ where, limit, offset, order: [['id', 'ASC']] });
        const totalPages = Math.ceil(count / limit);

        return { data: rows, meta: { page, limit, total: count, totalPages, hasPrevious: page > 0, hasNext: page < totalPages - 1 } };
    }

    static async getById(id) {
        return await categorie.findByPk(id);
    }

    static async create(data) {
        return await categorie.create({ nom: data.nom });
    }

    static async update(id, data) {
        const categorieToUpdate = await categorie.findByPk(id);
        if (!categorieToUpdate) return null;
        await categorieToUpdate.update({ nom: data.nom });
        return categorieToUpdate;
    }

    static async delete(id) {
        const categorieToDelete = await categorie.findByPk(id);
        if (!categorieToDelete) return false;
        await categorieToDelete.destroy();
        return true;
    }
}
