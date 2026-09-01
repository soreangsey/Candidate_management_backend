import jwt from "jsonwebtoken";
import { UtilisateurService } from "./utilisateurService.js";

export class AuthService {
    static async register(data) {
        const existingUser = await UtilisateurService.getByEmail(data.email);
        if (existingUser) return { error: "email_exists" };

        return await UtilisateurService.create({
            nom: data.nom,
            email: data.email,
            mot_de_passe: data.mot_de_passe,
            role: "user"
        });
    }

    static async login(data) {
        const user = await UtilisateurService.getByEmail(data.email);
        if (!user) return { error: "email" };
        if (user.mot_de_passe !== data.mot_de_passe) return { error: "password" };

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1000h" });
        return { token, id: user.id, role: user.role };
    }
}
