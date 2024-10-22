FROM node:18-slim AS build

RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

# To install dev dependencies for frontend build
ENV NODE_ENV=""

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/

RUN npm ci && cd frontend && npm ci

COPY . .

RUN cd frontend && npm run build

# Final Production Build
FROM node:18-slim

RUN apt-get update && apt-get install -y python3 make g++

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/

RUN npm ci --omit=dev && cd frontend && npm ci --omit=dev

COPY --from=build /app /app

EXPOSE 80

CMD ["npm", "start"]
