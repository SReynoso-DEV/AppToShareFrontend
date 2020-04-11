FROM node:13-slim

WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
CMD ["serve", "-s","build","-l","8080"]
EXPOSE 8080
    