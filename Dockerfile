# Multi-stage Dockerfile for TalentScout
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/
COPY shared/package*.json shared/
COPY services/media/package*.json services/media/
RUN npm install

FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm --workspace backend run build
RUN npm --workspace services/media run build
RUN npm --workspace shared run build
RUN npm --workspace frontend run build

FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/package.json ./frontend/package.json
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/services/media/dist ./services/media/dist
COPY --from=builder /app/services/media/package.json ./services/media/package.json
COPY --from=builder /app/shared/dist ./shared/dist
COPY --from=builder /app/shared/package.json ./shared/package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
EXPOSE 3000
EXPOSE 4000
CMD ["npm", "start"]
