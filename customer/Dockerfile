FROM node:12.16.2-alpine

WORKDIR /app/customer

COPY package.json .

COPY . .

RUN npm install

EXPOSE 8001

CMD [ "npm", "start" ]