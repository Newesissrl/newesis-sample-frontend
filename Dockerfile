FROM docker.io/node:20.5-alpine as base
WORKDIR /app

RUN apk update && \
    apk add bash && \
    rm -rf /var/cache/apk/* 

FROM base as build
WORKDIR /build

COPY tailwind.config.js ./package.json ./yarn.lock /build/

COPY ./src/ /build/src/
COPY ./public/ /build/public/

RUN yarn install --frozen-lockfile && \
    yarn build

FROM base as run
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /build/build/ /app/build/

COPY ./probes /app/probes/

COPY ./docker-entrypoint /docker-entrypoint/
COPY ./docker-entrypoint.sh /docker-entrypoint/
RUN chmod +x /docker-entrypoint/docker-entrypoint.sh

RUN yarn add serve
COPY ./package.json /app/

EXPOSE 3000/tcp

ENTRYPOINT ["/docker-entrypoint/docker-entrypoint.sh"]
CMD ["yarn", "serve", "-s", "build"]