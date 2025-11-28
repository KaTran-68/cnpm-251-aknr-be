**Repository Summary**
- **Purpose:** Small Express + Mongoose API that exposes user-related endpoints under `/api/users`.
- **Entry points:** `index.js` (starts server) and `app.js` (Express app and route registration).

**Key Files & Flow**
- **`index.js`**: Loads environment (`.env`), calls `connectDB()` from `config/db.js`, then starts the server on `process.env.PORT` or `6868`.
- **`config/db.js`**: Connects to MongoDB using `process.env.MONGO_URI`. On connection failure it logs and calls `process.exit(1)`.
- **`app.js`**: Registers middleware (`express.json()`, `express.urlencoded(...)`) and mounts route modules (e.g. `app.use('/api/users', userRoutes)`).
- **`routes/*.js`**: Lightweight routers that import controller functions and map HTTP verbs to them (see `routes/userRoutes.js`).
- **`controllers/*.js`**: Business logic. Export named functions like `getData` and `createData` that respond with JSON and HTTP status codes. Error responses use `res.status(500).json({ message: error.message })`.
- **`models/*.js`**: Mongoose schemas / models. Example: `models/user.js` exports `mongoose.model('Example', exampleSchema)` and uses `timestamps: true`.

**Project Conventions (be explicit)**
- Routes import controllers via destructuring: `const { getData, createData } = require('../controllers/userController')` and then map `router.get('/', getData)`.
- Controllers always respond with JSON and standard status codes: `200` for successful reads, `201` for created, `500` for server errors with shape `{ message: error.message }`.
- DB connection is performed before listening. Do not start the server without calling `connectDB()`.
- Environment variables: must provide `MONGO_URI` (required) and optionally `PORT`.
- Model files live in `models/` and export a Mongoose model directly with `module.exports = mongoose.model(...)`.

**Patterns and Integration Points**
- Persistent storage: MongoDB (Mongoose). All DB calls use `.find()` or `.save()` patterns in controllers.
- Route mount points: user routes are available at `/api/users`. Add new resource routes under `routes/` and mount them in `app.js`.
- Error handling: controllers catch errors and return a 500 JSON error. There is no centralized error middleware—follow local try/catch conventions.

**Files worthy of attention / TODOs for contributors**
- `models/quiz.js` is an empty placeholder. Treat it as intentionally unfinished; ask before populating.
- `middleware/test.txt` appears unused and empty.

**How to run / debug locally (discoverable)**
- Ensure a `.env` with `MONGO_URI` (and optional `PORT`).
- Start the app directly: `node index.js` (or use `nodemon index.js` if available in your environment).
- Expect console logs: successful DB connection prints host; server prints `Server running at http://localhost:${PORT}`.

**What to change/where when adding features**
- New models: add to `models/` and export with `module.exports = mongoose.model('Name', schema)`.
- New controllers: add named exports that follow the `async (req,res)` pattern and export functions in an object.
- New routes: create `routes/<resource>Routes.js`, import controllers with destructuring, register verbs (`get/post/put/delete`) and mount in `app.js`.

**Agent-specific guidance (for AI coding agents)**
- Preserve existing error response shape and status codes when modifying controllers.
- Avoid changing `index.js` startup sequence — keep `connectDB()` before `app.listen()`.
- When adding code, follow CommonJS `require()` / `module.exports` style used across the repo.
- Do not assume any test framework or scripts exist; none are present in the repo.
- If you plan to modify `models/quiz.js`, first check with the maintainer or open an issue — it's currently blank.

Please review these notes — tell me if you want this file merged differently or want additional examples (e.g., sample route/controller patch).