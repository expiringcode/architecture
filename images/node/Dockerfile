FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY images/node/entrypoint /usr/local/bin/
COPY images/node/docker-healthcheck /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint \
	&& chmod +x /usr/local/bin/docker-healthcheck

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD ["docker-healthcheck"]

CMD [ "entrypoint" ]