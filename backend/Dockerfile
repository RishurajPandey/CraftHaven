# Production Dockerfile for CraftHaven backend
FROM node:20-alpine
WORKDIR /app

# Copy package files and install only production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

ENV NODE_ENV=production

# Render/Heroku provide PORT via env, expose default 5000
EXPOSE 5000

CMD ["node", "server.js"]
