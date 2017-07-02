FROM nginx:1.13-alpine

RUN apk update && apk add --no-cache --virtual .build-deps \
	wget \
	inotify-tools

ENV WORKDIR /www
WORKDIR $WORKDIR

COPY entrypoint /usr/bin

RUN chmod +x /usr/bin/entrypoint \
	&& mkdir -p $WORKDIR/nginx \
	&& rm -Rf /etc/nginx

COPY ./conf /etc/nginx

# # forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 	&& ln -sf /dev/stderr /var/log/nginx/error.log

ENTRYPOINT entrypoint