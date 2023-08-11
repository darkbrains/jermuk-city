FROM node:18
WORKDIR /app
COPY ./templates templates/
COPY ./static static/
COPY node.js .
RUN npm install express path chalk ejs 
EXPOSE 8888
CMD [ "node", "node.js" ]