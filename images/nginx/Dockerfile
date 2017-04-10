FROM nginx:1.11.12
#FROM phusion/baseimage:0.9.19
# ubuntu:xenial

## Installing nginx and wget and eventually selinux
RUN apt-get update && apt-get install -y --no-install-recommends \
	wget\
	inotify-tools

## Clean apt list
RUN apt-get autoremove -y
RUN rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

RUN mkdir -p $WORKDIR/nginx

COPY entrypoint /usr/bin
RUN chmod +x /usr/bin/entrypoint

COPY onchange.sh /usr/bin/onchange
RUN chmod a+rx /usr/bin/onchange

RUN rm -Rf /etc/nginx
COPY ./conf /etc/nginx

WORKDIR $WORKDIR

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

ENTRYPOINT entrypoint

CMD ["nginx", "-g", "daemon off;"]