# creating a node base
FROM node:16-slim as node-base
ENV CI=true


# builder-base is used to build dependencies
FROM node-base as builder-base
COPY ./package-lock.json ./package.json ./
RUN npm ci --production


# 'development' stage installs all dev deps and can be used to develop code.
FROM builder-base as dev
WORKDIR /app
COPY . . 
RUN npm ci
EXPOSE 3000
CMD ["npm", "start"]


# 'unit-tests' stage 
FROM dev AS test
RUN npm test -- --coverage
