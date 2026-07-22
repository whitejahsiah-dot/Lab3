# Lab 3 — Full-Stack Portfolio App

A full-stack portfolio application with a **React + Vite** frontend and a **Node.js + Express + SQLite** backend, supporting full CRUD for Users, Projects, Services, and References.

## Project Structure

```
Lab3-webapp/
├── backend/          # Express REST API
│   ├── routes/       # users, projects, services, references
│   ├── database.js   # SQLite setup via better-sqlite3
│   └── server.js
└── frontend/         # React (Vite)
    └── src/
        ├── api/          # Fetch wrappers
        ├── components/   # Navbar, AdminDashboard
        └── pages/        # users, projects, services, references
```

---

## Local Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Start the backend

```bash
npm run dev      # uses nodemon (auto-restart)
# or
npm start
```

Backend runs at **http://localhost:5000**. A `portfolio.db` SQLite file is created automatically.

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start the frontend

```bash
npm run dev
```

Frontend runs at **http://localhost:5173**.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | List all users |
| POST | /api/users | Create user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |
| GET | /api/projects | List all projects |
| POST | /api/projects | Create project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/services | List all services |
| POST | /api/services | Create service |
| PUT | /api/services/:id | Update service |
| DELETE | /api/services/:id | Delete service |
| GET | /api/references | List all references |
| POST | /api/references | Create reference |
| PUT | /api/references/:id | Update reference |
| DELETE | /api/references/:id | Delete reference |

---

## Deployment (Steps You Must Do Manually)

### Deploy Backend to Render

1. Push your code to GitHub (create a repo and push both `backend/` and `frontend/` folders).
2. Go to [https://render.com](https://render.com) and sign in.
3. Click **New → Web Service** and connect your GitHub repo.
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add `NODE_ENV=production`
5. Click **Create Web Service** and copy the deployed URL (e.g. `https://your-api.onrender.com`).

### Deploy Frontend to Vercel (or Netlify)

#### Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New Project** → import your repo.
3. Set **Root Directory** to `frontend`.
4. Add **Environment Variable:** `VITE_API_URL=https://your-api.onrender.com/api`
5. Click **Deploy**.

#### Netlify (alternative)
1. Go to [https://netlify.com](https://netlify.com) → **Add new site → Import from Git**.
2. Set **Base directory** to `frontend`, **Build command** to `npm run build`, **Publish directory** to `frontend/dist`.
3. Add **Environment Variable:** `VITE_API_URL=https://your-api.onrender.com/api`
4. Click **Deploy site**.

### Version Control Commits
Make a commit after each major change:
```bash
git add .
git commit -m "feat: add admin dashboard with CRUD for users/projects/services/references"
```
