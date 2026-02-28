FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN DOCKER_BUILD=true npm run build

FROM node:20-alpine AS server

WORKDIR /app

COPY server.package.json ./package.json
RUN npm install --production

COPY server.js ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "server.js"]
