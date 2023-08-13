# Use a multi-stage build for better efficiency
# First stage: Build the application
FROM node:16.20.1-alpine3.18 AS builder

WORKDIR /app

COPY ./templates templates/
COPY ./static static/
COPY node.js .

RUN npm install express path chalk ejs

# Second stage: Create the final image
FROM node:16.20.1-alpine3.18

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app /app

EXPOSE 8888

CMD [ "node", "node.js" ]
