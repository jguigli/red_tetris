FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY .babelrc .

COPY .editorconfig .
COPY .eslintrc .
COPY .eslintignore .

RUN npm install

COPY src src

EXPOSE 8080

CMD ["npm", "run", "client-dev"] 