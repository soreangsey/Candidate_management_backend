import { AuthService } from "../services/authService.js";

export class AuthController {
    static async register(req, res) {
        const result = await AuthService.register(req.body);
        if (result.error === "email_exists") return res.status(409).json({ error: "Email already exists" });
        res.status(201).json(result);
    }

    static async login(req, res) {
        const result = await AuthService.login(req.body);
        if (result.error === "email") return res.status(401).json({ error: "Email incorrect" });
        if (result.error === "password") return res.status(401).json({ error: "Mot de passe incorrect" });
        res.status(200).json(result);
    }
}
