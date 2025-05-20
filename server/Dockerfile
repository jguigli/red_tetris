FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY params.js .

RUN npm install

COPY src src

EXPOSE 3004

CMD ["npm", "run", "prod"] 