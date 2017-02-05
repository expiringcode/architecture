FROM busybox:latest

COPY ./conf/nginx /etc/nginx
COPY ./conf/redis/redis.conf /usr/local/etc/redis/redis.conf
#COPY ./conf/mongo /data/configdb
COPY ./conf/mysql /etc/mysql
COPY ./conf/php-7.0/php.ini /etc/php/7.0/fpm/php.ini

VOLUME /etc/nginx
VOLUME /usr/local/etc/redis/redis.conf
#VOLUME /data/configdb
VOLUME /etc/mysql
VOLUME /etc/php/7.0/fpm/php.ini