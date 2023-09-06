FROM docker.io/library/nginx:latest

COPY ./templates /usr/share/nginx/html/templates
COPY ./static /usr/share/nginx/html/static
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./mime.types /etc/nginx/mime.types
RUN chmod -R 777 /usr/share/nginx
RUN chmod -R 777 /etc/nginx/mime.types

EXPOSE 8888

CMD ["nginx", "-g", "daemon off;"]
