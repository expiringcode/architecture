FROM busybox:latest

COPY ./data/www /www
COPY ./data/node /app
COPY ./data/redis /data
COPY ./data/mongo /data/db
COPY ./data/mysql /var/lib/mysql

VOLUME /www
VOLUME /app
VOLUME /data
VOLUME /data/db
VOLUME /var/lib/mysql