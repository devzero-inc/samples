FROM node:20-alpine

WORKDIR /front/src/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]