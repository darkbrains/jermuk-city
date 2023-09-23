FROM node:latest

WORKDIR /app

COPY /bin/app .

RUN yarn install

CMD ["yarn", "main"]

EXPOSE 8888
