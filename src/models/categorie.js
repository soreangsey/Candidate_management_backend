import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const categorie = sequelize.define("categorie", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "categorie",
    timestamps: false
});

export default categorie;
