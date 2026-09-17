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

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port used by the Express server | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/blogging_app` |
| `JWT_SECRET` | Secret used to sign authentication tokens | `your-secret-key` |

Keep `.env` private. It is excluded from version control by `.gitignore`.

## Main Routes

- `/` - Home page
- `/user/signup` - User registration
- `/user/signin` - User sign-in
- `/blog/add-blog` - Add a blog post
- `/api/user` - User API routes
- `/api/blog` - Blog API routes
- `/api/comment` - Comment API routes
