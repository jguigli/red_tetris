FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY params.js .
COPY .babelrc .

RUN npm install

COPY src src

EXPOSE 3004

CMD ["npm", "run", "srv-dev"] 