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

RUN apt-get update && apt-get install -y --no-install-recommends \
		$PHPIZE_DEPS \
		ca-certificates \
		curl \
		libedit2 \
		libsqlite3-0 \
		libxml2 \
		xz-utils \
		php \
		php-apigen \
		php-apigen-theme-bootstrap \
		php-auth \
		php-auth-http \
		php-dompdf \
		php-fpdf \
		php-google-auth \
		php-soap \
		phpmd \
		phploc \
		$PHP_MODS \
	&& rm -r /var/lib/apt/lists/*

ENV PHP_INI_DIR /etc/php/7.0/fpm
ENV PHP_VERSION 7.0
ENV WORKDIR /www

WORKDIR $WORKDIR

EXPOSE 9000

COPY entrypoint /usr/local/bin/

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a