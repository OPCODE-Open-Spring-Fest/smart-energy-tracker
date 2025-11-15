# Docker Setup for Smart Energy Tracker (Development)

This project uses Docker to run **frontend** and **backend** separately,
each inside its own container, without using nginx or a production build.

---

## Files Included

### 1. Dockerfile
A single minimal Node.js image used for **both frontend and backend**.

- Installs dependencies
- Copies project files
- Exposes ports 5173 (frontend) and 5000 (backend)
- The command is overridden by docker-compose

### 2. docker-compose.yml
Handles running two separate services:

#### `frontend` service
- Runs `npm run dev`
- Exposes port **5173**
- Supports live reload using file volume mounts

#### `backend` service
- Runs `npm start`
- Exposes port **5000**
- Also uses volume mounts for hot reload

### Why Docker Compose?
Because we need:

- Two containers (frontend + backend)
- Each running different commands
- Shared code with hot reload
- Easy `up`, `down`, and log management

---

## How to Run

```bash
docker-compose up --build
```

---

## runing url 
- Frontend → http://localhost:5173
- Backend → http://localhost:5000

---

## How to stop
```bash
docker-compose down
```