FROM node:13-slim

WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g serve
RUN npm run build
COPY . .
CMD ["serve", "-s","build"]
EXPOSE 5000

    