FROM alpine:latest

RUN addgroup www-data && adduser -H -D -G www-data www-data

USER www-data

CMD echo connected && /bin/sh