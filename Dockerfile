FROM alpine:3.8
LABEL maintainer Prasanta Kakati <prasantakakati@ekata.social>
RUN apk update
RUN apk add nodejs nodejs-npm curl
RUN npm install -g pm2 yarn
RUN mkdir /baza-front
WORKDIR /baza-front
COPY package.json /baza-front
COPY yarn.lock /baza-front
RUN yarn install
COPY . /baza-front
RUN sh ./setup.sh
RUN node tools/clean.js
RUN node tools/copy.js
RUN yarn build
CMD yarn prod:server
