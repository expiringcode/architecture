FROM phusion/baseimage:0.9.19
# ubuntu:xenial

ENV PHP_MODS \
	imagemagick \
	php-imagick

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
	wget \
	&& wget -O - http://dl.hhvm.com/conf/hhvm.gpg.key | apt-key add - \
	&& echo deb http://dl.hhvm.com/ubuntu saucy main | tee /etc/apt/sources.list.d/hhvm.list \
	&& apt-get install -y --no-install-recommends hhvm \
	ca-certificates \
	curl \
	# libedit2 \
	libsqlite3-0 \
	libxml2 \
	xz-utils \
	zip \
	git \
	&& rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

WORKDIR $WORKDIR

RUN rm -Rf /etc/hhvm/php.ini && rm -Rf /etc/hhvm/server.ini
COPY ./conf/* /etc/hhvm/

COPY entrypoint /usr/local/bin/

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a