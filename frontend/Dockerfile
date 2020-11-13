FROM node:14.15.0-alpine3.12

ENV NODE_ENV=production

RUN mkdir /code

WORKDIR /code

COPY package.json /code/

RUN npm install

COPY . /code/
