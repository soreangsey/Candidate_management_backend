import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const candidature = sequelize.define("candidature", {
    id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    date_candidature: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'utilisateur',
            key: 'id'
        }
    },
    id_offre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'offre',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    tableName: 'candidature',
    schema: 'public',
    timestamps: false,
    indexes: [
        { name: "candidature_pkey", unique: true, fields: [{ name: "id" }] },
        { name: "utilisateur_offre_pkey", unique: true, fields: ['id_utilisateur', 'id_offre'] }
    ]
});

export default candidature;
