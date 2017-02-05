FROM busybox:latest

COPY ./logs/nginx /var/log/nginx
COPY ./logs/mysql /var/log/mysql
COPY ./logs/php/php7.0-fpm.log /var/log/php7.0-fpm.log

VOLUME /var/log/nginx
VOLUME /var/log/mysql
VOLUME /var/log/php7.0-fpm.log