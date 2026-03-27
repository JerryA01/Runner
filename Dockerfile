FROM node:18-slim

RUN apt-get update && apt-get install -y openjdk-17-jdk && apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY runner/*.jar /opt/render/project/src/runner/

EXPOSE 3000

CMD ["node", "app.js"]