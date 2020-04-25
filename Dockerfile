FROM node:13-slim

WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g http-server
COPY . .
RUN npm run build
CMD ["http-server", "./build","--port","8080","--proxy","https://upc-pool-ferluisxd.cloud.okteto.net"]
EXPOSE 8080
    