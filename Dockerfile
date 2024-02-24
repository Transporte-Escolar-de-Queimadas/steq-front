FROM node:latest

WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
