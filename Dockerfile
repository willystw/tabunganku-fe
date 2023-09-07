FROM node:20-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . .

RUN npm run build
RUN npm prune --production

FROM node:20-alpine
RUN adduser -D nodeuser
RUN mkdir -p /app
RUN chown nodeuser:nodeuser /app
WORKDIR /app
COPY --from=build --chown=nodeuser:nodeuser /app/build build/
COPY --from=build --chown=nodeuser:nodeuser /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
ENV ORIGIN=http://localhost:3000
CMD ["node", "build"]