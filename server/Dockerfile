FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY .babelrc .
COPY params.js .

COPY .editorconfig .
COPY .eslintrc .
COPY .eslintignore .

RUN npm install

COPY src src

EXPOSE 3004

CMD ["npm", "run", "srv-dev"] 