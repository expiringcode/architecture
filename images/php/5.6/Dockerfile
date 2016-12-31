FROM ubuntu:xenial

# persistent / runtime deps
ENV PHPIZE_DEPS \
		autoconf \
		file \
		g++ \
		gcc \
		libc-dev \
		make \
		pkg-config \
		re2c

ENV PHP_MODS \
	imagemagick \
	php-imagick

RUN apt-get update \
	&& apt-get install -y --no-install-recommends software-properties-common --allow-unauthenticated \
	&& add-apt-repository ppa:ondrej/php \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends --allow-unauthenticated \
		$PHPIZE_DEPS \
		ca-certificates \
		curl \
		libedit2 \
		libsqlite3-0 \
		libxml2 \
		xz-utils \
		php5.6-fpm \
		php-fpdf \
		php5.6-soap \
		$PHP_MODS \
	&& rm -r /var/lib/apt/lists/*

ENV PHP_INI_DIR /etc/php/5.6/fpm
ENV PHP_VERSION 5.6
ENV WORKDIR /www

WORKDIR $WORKDIR

EXPOSE 9001

COPY entrypoint /usr/local/bin/

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a