FROM node:latest
RUN npm install -g @angular/cli
WORKDIR /usr/src/app
COPY . .