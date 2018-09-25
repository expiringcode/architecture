FROM redis:alpine

RUN apk add --no-cache bash

RUN rm -Rf /usr/local/etc/redis/redis.conf && mkdir -p /usr/local/etc/redis

COPY images/redis/conf /usr/local/etc/redis/
COPY images/redis/docker-healthcheck /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-healthcheck

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD ["docker-healthcheck"]

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]