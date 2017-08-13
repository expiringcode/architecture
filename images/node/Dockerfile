FROM node:8-alpine

RUN mkdir /app

WORKDIR /app

COPY entrypoint /usr/local/bin/
COPY docker-healthcheck /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint \
	&& chmod +x /usr/local/bin/docker-healthcheck

RUN npm i -g pm2 forever supervisor

# ENTRYPOINT entrypoint

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD ["docker-healthcheck"]

CMD [ "entrypoint" ]