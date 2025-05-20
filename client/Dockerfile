FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY index.html .

RUN npm install

COPY src src

EXPOSE 8080

CMD ["npm", "run", "prod"]