import utilisateur from './utilisateur.js';
import offre from './offre.js';
import candidature from './candidature.js';

export function initAssociations() {
    // Utilisateur 1 - N Candidature
    utilisateur.hasMany(candidature, { foreignKey: 'id_utilisateur', as: 'candidatures' });
    candidature.belongsTo(utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });

    // Offre 1 - N Candidature
    offre.hasMany(candidature, { foreignKey: 'id_offre', as: 'candidatures', onDelete: 'CASCADE' });
    candidature.belongsTo(offre, { foreignKey: 'id_offre', as: 'offre', onDelete: 'CASCADE' });
}
