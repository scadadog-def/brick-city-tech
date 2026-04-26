FROM node:22-alpine
WORKDIR /app

# better-sqlite3 needs build tooling
RUN apk add --no-cache python3 make g++

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV PORT=8787
EXPOSE 8787
CMD ["node", "src/index.js"]
