FROM mariadb:latest

RUN rm -Rf /etc/mysql
COPY images/mysql/conf /etc/mysql

COPY images/mysql/docker-healthcheck /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-healthcheck

COPY images/mysql/sql-init/* /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD ["docker-healthcheck"]