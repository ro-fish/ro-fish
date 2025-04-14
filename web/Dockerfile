FROM node:23-slim AS base

FROM base AS deps 
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]
