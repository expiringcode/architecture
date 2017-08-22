FROM nginx:1.13-alpine

RUN apk update && apk add --no-cache --virtual .build-deps \
	wget \
	inotify-tools

ENV WORKDIR /www
WORKDIR $WORKDIR

COPY entrypoint /usr/bin
COPY docker-healthcheck /usr/local/bin

RUN mkdir -p nginx/default
COPY ./conf/sites-available/core nginx/default/auto.conf

RUN chmod +x /usr/bin/entrypoint \
	&& chmod +x /usr/local/bin/docker-healthcheck \
	&& mkdir -p $WORKDIR/nginx \
	&& rm -Rf /etc/nginx

COPY ./conf /etc/nginx

# # forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 	&& ln -sf /dev/stderr /var/log/nginx/error.log

HEALTHCHECK --interval=10s --timeout=3s \
    CMD ["docker-healthcheck"]

ENTRYPOINT entrypoint