FROM node:15-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:15-alpine

WORKDIR /app

COPY --from=0 /app/build .

RUN npm ci --production

CMD node server.js
