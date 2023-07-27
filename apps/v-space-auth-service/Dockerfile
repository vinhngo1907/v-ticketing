FROM node:14-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json .

RUN npm install --slient

COPY . .

RUN pnpm build

EXPOSE 1337

CMD ["pnpm","start"]