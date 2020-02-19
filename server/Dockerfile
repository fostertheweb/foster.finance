FROM node:lts-alpine3.11

WORKDIR /usr/src/app

COPY package.json .

ENV NODE_ENV=production
RUN npm install

COPY . .

USER node

CMD ["node", "./src/server.js"]
