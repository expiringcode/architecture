FROM redis:latest

RUN rm -Rf /usr/local/etc/redis/redis.conf && mkdir -p /usr/local/etc/redis
COPY ./conf /usr/local/etc/redis/

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]