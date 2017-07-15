FROM redis:3-alpine

RUN apk add --no-cache bash

RUN rm -Rf /usr/local/etc/redis/redis.conf && mkdir -p /usr/local/etc/redis

COPY ./conf /usr/local/etc/redis/
COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK CMD ["docker-healthcheck"]

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]