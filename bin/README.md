# Jermuk City Application Docker Image

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/Blackdocs-Cloud/jermuk-city)
[![GitHub](https://img.shields.io/badge/GitHub-Releases-green)](https://github.com/Blackdocs-Cloud/jermuk-city/releases)

## Description

This Docker image is designed to run a Node.js application and is based on the latest version of Node.js. It includes everything you need to quickly containerize your Node.js application for deployment.

## Use the latest version of Node.js as the base image

## Dockerfile

```dockerfile
FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "main"]

EXPOSE 8888
```
