# Docker Commands Guide

This guide provides step-by-step instructions for building images, running containers, stopping them, viewing logs, and managing Docker resources.

---

## 🚀 1. Build Docker Images

Navigate to the folder containing your `Dockerfile` and `docker-compose.yml`.

### Using Docker Compose (Recommended)

```bash
docker-compose build
```

This builds two images:

* `smart-energy-frontend`
* `smart-energy-backend`

---

## 🚀 2. Start Containers

```bash
docker-compose up
```

Run in background:

```bash
docker-compose up -d
```

Access:

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000](http://localhost:5000)

---

## 🚀 3. Stop Containers

```bash
docker-compose down
```

This stops and removes containers (not images).

---

## 🚀 4. View Running Containers

```bash
docker ps
```

View all containers (running + stopped):

```bash
docker ps -a
```

---

## 🚀 5. View Images

```bash
docker images
```

---

## 🚀 6. Run a Single Service

Run only frontend:

```bash
docker-compose up frontend
```

Run only backend:

```bash
docker-compose up backend
```

---

## 🚀 7. Build Image Manually (Without Compose)

```bash
docker build -t smart-energy-image .
```

---

## 🚀 8. Run Image Manually

Expose port and run:

```bash
docker run -p 5173:5173 smart-energy-image
```

---

## 🚀 9. Stop a Running Container

Find container ID:

```bash
docker ps
```

Then stop:

```bash
docker stop <container_id>
```

---

## 🚀 10. Remove a Container

```bash
docker rm <container_id>
```

---

## 🚀 11. Remove an Image

```bash
docker rmi <image_id>
```

---

## 🚀 12. Restart Containers

```bash
docker-compose restart
```

---

## 🚀 13. View Logs

Frontend logs:

```bash
docker-compose logs frontend
```

Backend logs:

```bash
docker-compose logs backend
```

Follow logs live:

```bash
docker-compose logs -f
```

---

This `.md` file gives you everything needed to work with Docker images and containers efficiently.