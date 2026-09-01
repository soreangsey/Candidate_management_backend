import jwt from "jsonwebtoken";

export function authorize(...allowedRoles) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Token absent" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // id and role come from the verified JWT

            if (!allowedRoles.includes(decoded.role)) return res.status(403).json({ error: "Forbidden" });
            next();
        } catch {
            return res.status(401).json({ message: "Token invalide" });
        }
    };
}

export function authorizeSelfOrAdmin(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token absent" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // id and role come from the verified JWT
        const userId = parseInt(req.params.id);

        if (decoded.role === "admin" || decoded.id === userId) return next();
        return res.status(403).json({ error: "Forbidden" });
    } catch {
        return res.status(401).json({ message: "Token invalide" });
    }
}
