import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { initAssociations } from "./models/association.js";
import routes from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true, // Autorise l'envoi et la réception des cookies
  }),
);

app.use(express.json());
app.use(routes);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API Express!' });
});

// Connexion DB
await connectDB();
initAssociations();

app.listen(PORT, () => {
    console.log(`app en cours sur le port ${PORT}`);
});
