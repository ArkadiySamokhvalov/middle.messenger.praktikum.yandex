FROM ubuntu:latest
FROM node:18.7.0
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD [ "node", "server.js" ]
