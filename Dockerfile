FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i -g bun
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
FROM nginx:alpine
COPY --from=builder /app/dist/angular-frontend/browser /usr/share/nginx/html
EXPOSE 80
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]