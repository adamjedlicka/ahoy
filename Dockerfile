FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:15-alpine

WORKDIR /app

COPY --from=0 /app/build/package*.json ./

RUN npm ci --production

COPY --from=0 /app/build .

CMD node server.js
