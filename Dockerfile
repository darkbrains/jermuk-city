FROM node:16.20.1-alpine3.18

WORKDIR /app

COPY ./templates templates/
COPY ./static static/
COPY node.js .
COPY package*.json .
COPY logger.js .
COPY httpLogger.js .

RUN npm install


EXPOSE 3000

CMD [ "node", "node.js" ]
