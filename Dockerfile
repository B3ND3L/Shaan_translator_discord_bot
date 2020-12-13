FROM node:12

COPY package*.json ./

RUN npm install
COPY . .

CMD [ "node", "server.js" ]