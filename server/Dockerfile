FROM node:14.17.3-alpine3.14

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]