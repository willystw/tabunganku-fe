FROM node:20-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . .

RUN npm run build
RUN npm prune --production

FROM node:20-alpine

RUN mkdir -p /app
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
CMD ORIGIN=http://localhost:3000 node build