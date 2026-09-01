import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const offre = sequelize.define("offre", {
    id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    titre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    entreprise: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    lieu: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    date_publication: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorie',
            key: 'id'
        }
    }
}, {
    sequelize,
    tableName: 'offre',
    schema: 'public',
    timestamps: false,
    indexes: [{ name: "offre_pkey", unique: true, fields: [{ name: "id" }] }]
});

export default offre;
