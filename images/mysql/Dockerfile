FROM mariadb:latest

RUN rm -Rf /etc/mysql
COPY ./conf /etc/mysql

COPY docker-healthcheck /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-healthcheck

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD ["docker-healthcheck"]