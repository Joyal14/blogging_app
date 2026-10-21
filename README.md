# Blogging App

A Node.js blogging project with an Express server, EJS-rendered pages, MongoDB persistence, and API routes for users, blogs, and comments.

## Technology stack

- **Node.js and Express** — HTTP server and routing.
- **MongoDB and Mongoose** — database connection and models.
- **EJS** — server-rendered views.
- **JSON Web Token and cookie-parser** — authentication-related functionality.
- **Multer** — uploaded images.
- **dotenv** — environment configuration.
- **nodemon** — development restart workflow.

## Project structure

```text
controllers/     Request handlers for users, blogs, and comments
middlewares/    Authentication and upload middleware
models/         Database models
routes/         Web and API routes
services/       Shared services, including authentication
public/         Static assets
views/          EJS templates
index.js        Server entry point
```

## Getting started

### Prerequisites

- Node.js and npm compatible with the dependencies in `package.json`.
- A running local MongoDB instance or a MongoDB connection URI.

### Install

```bash
git clone https://github.com/Joyal14/blogging_app.git
cd blogging_app
npm install
```

### Configure

Create a local `.env` file in the project root:

```dotenv
PORT=8000
MONGODB_URI=mongodb://localhost:27017/blogging_app
```

The server defaults to port `8000` and the local MongoDB URI above when those environment variables are absent. Replace the URI if you use a different database. The repository ignores `.env`; do not commit database credentials or other secrets.

Before deploying publicly, review authentication configuration, secret management, input validation, upload handling, and access controls. This README does not certify the application as production-ready.

### Run

```bash
# Development (automatic restart)
npm run dev

# Standard start
npm start
```

With the default port, open [http://localhost:8000](http://localhost:8000). Confirm that the server reports a successful MongoDB connection before testing database-dependent features.

## Routes at a glance

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Render the home view. |
| POST | `/api/user/signup` | User signup handler. |
| POST | `/api/user/signin` | User signin handler. |
| GET | `/api/blog/blog-list` | Blog listing handler. |
| POST | `/api/blog/add-blog-post` | Blog creation handler; upload middleware accepts `image` and `coverImage` fields. |

Additional routers are mounted at `/user`, `/blog`, and `/api/comment`. Consult the relevant route and controller files for request bodies, authentication requirements, and response formats; the table is an overview rather than a complete API contract.

## Validation and current scope

The package provides `start` and `dev` scripts; no automated test script is currently defined in `package.json`. Startup, endpoint behavior, and deployment have not been independently validated for this documentation update.
