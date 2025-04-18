#CMS API
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate

CMD ["npm", "run", "debug"]