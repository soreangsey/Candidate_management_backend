# Migration notes: GitHub baseline -> refactored lab backend

Baseline used: `https://github.com/soreangsey/Candidate_management` (`main`).

The baseline has the original `config`, `controllers`, `models`, `routes`, and `app.js`. The refactoring was applied on top of that organization rather than replacing the domain model.

## File-level migration

- `controllers/*Controller.js`: Sequelize code moved to matching `services/*Service.js`; method names preserved.
- `controllers/authController.js`: HTTP handling only; login/register logic moved to `AuthService`.
- `routes/*.js`: anonymous route callbacks replaced with controller references plus authorization middleware.
- `routes/index.js`: added to centralize `/api/...` route prefixes.
- `middlewares/authMiddleware.js`: added with `authorize()` and `authorizeSelfOrAdmin()` that decode JWT id/role directly.
- `models/association.js`: kept the GitHub user/candidature and offer/candidature associations.
- `models/candidature.js`: corrected the misplaced PK reference and kept the composite user+offer unique index.
- `app.js`: simplified to load the central router while preserving DB connection and `initAssociations()`.

The package intentionally does not add bcrypt, refresh tokens, Swagger, DTOs, repositories, or other layers that were not requested for the lab.
