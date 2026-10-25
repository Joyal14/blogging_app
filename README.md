# Blogging App

A server-rendered blogging application built with Node.js, Express, EJS, and MongoDB.

## Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/blogging_app
   JWT_SECRET=replace-with-a-long-random-secret
   ```

   Generate a strong secret with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Start MongoDB.

4. Start the application:

   ```bash
   npm start
   ```

   The application is available at `http://localhost:8000`.

## Development

Run the application with automatic restarts:

```bash
npm run dev
```

## GitHub Actions CI/CD

The workflow in `.github/workflows/ci-cd.yml` runs on pushes and pull requests. It
installs dependencies with `npm ci`, runs the tests, and builds the Docker image.
After those checks pass, a push to `main` triggers a Render deployment.

To enable deployment:

1. Create a Render Web Service from this repository, using the Docker runtime and
   the `main` branch. Disable Render's automatic deploys so it deploys only after
   the GitHub Actions checks pass.
2. Configure `MONGODB_URI` with a reachable MongoDB connection string and set
   `JWT_SECRET` in the Render service's environment variables. Do not commit
   either value to the repository.
3. In Render, create a deploy hook for the service. In GitHub, add a repository
   Actions secret named `RENDER_DEPLOY_HOOK` containing that hook URL.
4. Keep the tracked `package-lock.json` in the repository. It lets `npm ci`
   install the exact dependency versions in CI.

Pull requests and pushes to other branches run CI but do not deploy. Merge or
push to `main` to deploy after the checks pass.

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port used by the Express server | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/blogging_app` |
| `JWT_SECRET` | Required secret used to sign authentication tokens | None |

Authentication tokens and sign-in cookies expire after 24 hours. Cookies use `httpOnly` and `sameSite=lax`; the `secure` flag is enabled in production.

Keep `.env` private. It is excluded from version control by `.gitignore`.

## Main Routes

- `/` - Home page
- `/user/signup` - User registration
- `/user/signin` - User sign-in
- `/blog/add-blog` - Add a blog post
- `/api/user` - User API routes
- `/api/blog` - Blog API routes
- `/api/comment` - Comment API routes
