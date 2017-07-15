FROM mariadb:10.3

RUN rm -Rf /etc/mysql
COPY ./conf /etc/mysql

COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK CMD ["docker-healthcheck"]