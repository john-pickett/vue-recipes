FROM node:9

WORKDIR /usr/app

COPY ./package.json .
RUN npm install --quiet
