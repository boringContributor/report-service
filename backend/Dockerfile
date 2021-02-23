FROM node:14-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY .npmrc ./.npmrc
COPY package*.json ./

RUN npm install --production

COPY dist ./dist

CMD [ "npm", "run", "start:prod" ]
