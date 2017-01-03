FROM yavin/alpine-php-fpm:7.0

RUN apk add php7-mysqli
RUN apk add php7-cgi
RUN apk add php7-sockets
RUN apk add php7-calendar
RUN apk add php7-exif
RUN apk add php7-ldap
RUN apk add php7-soap

ENTRYPOINT php -a