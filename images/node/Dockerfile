FROM node:7-alpine

RUN mkdir /app

WORKDIR /app

COPY entrypoint /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint

# ENTRYPOINT entrypoint

CMD [ "entrypoint" ]