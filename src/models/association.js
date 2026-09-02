import categorie from "./categorie.js";
import offre from "./offre.js";
import candidature from "./candidature.js";
import utilisateur from "./utilisateur.js";

export function initAssociations() {

    categorie.hasMany(offre, {
        foreignKey: "id_categorie",
        as: "offres"
    });

    offre.belongsTo(categorie, {
        foreignKey: "id_categorie",
        as: "categorie"
    });

    utilisateur.hasMany(candidature, {
        foreignKey: "id_utilisateur",
        as: "candidatures"
    });

    candidature.belongsTo(utilisateur, {
        foreignKey: "id_utilisateur",
        as: "utilisateur"
    });

    offre.hasMany(candidature, {
        foreignKey: "id_offre",
        as: "candidatures"
    });

    candidature.belongsTo(offre, {
        foreignKey: "id_offre",
        as: "offre"
    });
}