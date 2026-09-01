import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const utilisateur = sequelize.define("utilisateur", {
    id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "utilisateur_email_key"
    },
    mot_de_passe: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'utilisateur',
    schema: 'public',
    timestamps: false,
    indexes: [
        { name: "utilisateur_email_key", unique: true, fields: [{ name: "email" }] },
        { name: "utilisateur_pkey", unique: true, fields: [{ name: "id" }] }
    ]
});

export default utilisateur;
