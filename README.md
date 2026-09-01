# Candidate Management Backend — refactored from the GitHub version

This package is **not a new backend created from scratch**. It uses the current public GitHub project `soreangsey/Candidate_management` as the baseline and applies the changes made during the lab discussion.

## What was kept from the GitHub baseline

- Same project name and Node/Express/Sequelize/PostgreSQL stack.
- Same database configuration and database name (`candidate_management`).
- Same four Sequelize models and database fields: `categorie`, `offre`, `utilisateur`, `candidature`.
- Same CRUD method names: `getAll`, `getById`, `create`, `update`, `delete`.
- Same pagination/filtering logic moved from controllers into services.
- Same candidature associations with `utilisateur` and `offre`.
- Same composite unique rule for `(id_utilisateur, id_offre)`.
- Same plain-text password comparison used in the lab (no bcrypt added).

## Structural changes applied to that code

The GitHub controllers originally talked directly to Sequelize. The code is now organized as:

```text
Route -> Middleware -> Controller -> Service -> Model -> PostgreSQL
```

Added:

```text
src/services/
  authService.js
  categorieService.js
  offreService.js
  utilisateurService.js
  candidatureService.js

src/middlewares/
  authMiddleware.js

src/routes/index.js
```

Controllers are now thin HTTP controllers; the Sequelize/core logic was moved to the corresponding service.

## Authentication / authorization decisions from the discussion

- `POST /api/auth/register` creates a user with `role: "user"` by default.
- `POST /api/auth/login` returns `{ token, id, role }`.
- The JWT contains `{ id, role }`.
- `authorize(...allowedRoles)` extracts and verifies the JWT itself and uses the **role decoded from the token**.
- `authorizeSelfOrAdmin` also extracts/verifies the JWT itself and uses the **id/role decoded from the token**.
- Admin can list all users; a non-admin can access/update/delete only their own `/api/users/:id`.
- Admin can see all candidatures; a normal user sees only candidatures whose `id_utilisateur` equals the id decoded from their token.
- Normal users can apply to an offer. `id_utilisateur` comes from the token, `id_offre` comes from the URL, and new status is `en_attente`.
- Admin-only create/update/delete for categories and offers.
- Admin-only candidature status update.

## Main endpoints

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/categories
POST   /api/categories                 admin
PUT    /api/categories/:id             admin
DELETE /api/categories/:id             admin

GET    /api/offers
POST   /api/offers                     admin
GET    /api/offers/:id
PUT    /api/offers/:id                 admin
DELETE /api/offers/:id                 admin
POST   /api/offers/:id/apply           user
GET    /api/offers/:id/applications    admin

GET    /api/applications               user: own / admin: all
GET    /api/applications/:id           owner / admin
PUT    /api/applications/:id/status    admin
DELETE /api/applications/:id           owner / admin

GET    /api/users                      admin
GET    /api/users/:id                  self / admin
POST   /api/users                      admin
PUT    /api/users/:id                  self / admin
DELETE /api/users/:id                  self / admin
```

## Setup

1. Copy `.env.example` to `.env` and choose a JWT secret.
2. Ensure PostgreSQL has the existing `candidate_management` database/tables used by the GitHub project.
3. Run:

```bash
npm install
npm start
```

For protected Postman calls, use **Authorization -> Bearer Token** and paste the JWT returned by `/api/auth/login`.

## Important model correction

The GitHub baseline had a `references` block on `candidature.id`, which incorrectly made the candidature primary key reference `utilisateur.id`. The refactored package removes that incorrect reference; the actual foreign keys remain `id_utilisateur` and `id_offre`.
