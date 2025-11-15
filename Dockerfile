# Simple Node.js dev container
FROM node:22-alpine

WORKDIR /app

# Copy only package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy full project
COPY . .

# Expose BOTH ports (frontend + backend)
EXPOSE 5173
EXPOSE 3001

# Default CMD (overwritten in docker-compose)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]