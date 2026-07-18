# CraftHaven AI Agent Instructions

This repository is a full-stack React + Node.js e-commerce sample named CraftHaven.

## What this repo contains
- `frontend/`: React + Vite app using Tailwind CSS. It is the UI for product browsing, cart actions, and checkout.
- `backend/`: Express API with MongoDB via Mongoose, authentication, product CRUD routes, and a health endpoint.

## Key commands
- Frontend dev server: `cd frontend && npm run dev`
- Frontend build: `cd frontend && npm run build`
- Frontend lint: `cd frontend && npm run lint`
- Backend dev server: `cd backend && npm run dev`
- Backend production start: `cd backend && npm start`

## Important notes for AI agents
- This repo uses separate frontend and backend workspaces. Treat `frontend/` and `backend/` as distinct projects when modifying package scripts or install commands.
- The backend currently has no `lint` script defined in `backend/package.json`, yet `.github/workflows/backend-ci.yml` includes `npm run lint || true`. Do not rely on backend lint being available unless it is added.
- Environment variables are expected for local development and deployment:
  - `backend/`: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, optionally `PORT`
  - `frontend/`: `VITE_API_URL`
- `backend/server.js` loads `.env` automatically through `dotenv`.
- The backend exposes `/api/health`, `/api/users/*`, `/api/products/*`, and `/api/*` for seed routes.

## Useful documentation
- Root README: [README.md](README.md)
- Backend docs: [backend/README.md](backend/README.md)
- Frontend docs: [frontend/README.md](frontend/README.md)

## Best practices for contributions
- Keep backend API changes inside `backend/src/` and preserve the existing Express route structure.
- Keep UI changes inside `frontend/src/` and follow the React + Vite component conventions.
- Avoid changing root-level configurations unless they clearly benefit both frontend and backend.

## When to ask the user
- If a new feature requires authentication flow or database schema changes, confirm the desired user experience first.
- If modifying deployment or CI, confirm whether you should preserve current Vercel/Render recommendations.
