FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG MONGO_URI
ARG API_SECRET

ENV MONGO_URI=$MONGO_URI
ENV API_SECRET=$API_SECRET

RUN echo "MONGO_URI=${MONGO_URI}" > .env
RUN echo "API_SECRET=${API_SECRET}" > .env

EXPOSE 3000

CMD ["npm", "run", "start"]

