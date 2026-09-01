import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "candidate_management",
  "postgres",
  "postgres",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
  }
);

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connecté à la base de données PostgreSQL');
    } catch (error) {
        console.error('❌ Erreur de connexion à la BD:', error.message);
        process.exit(1);
    }
}
