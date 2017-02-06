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
	libedit2 \
	libsqlite3-0 \
	libxml2 \
	xz-utils \
	php7.0-mysql \
	php7.0-curl \
	php7.0-mbstring \
	php7.0-gd \
	php7.0-mysqli \
	php7.0-xml \
	php7.0-mcrypt \
	php-apigen \
	php-apigen-theme-bootstrap \
	php-auth \
	php-auth-http \
	php-dompdf \
	php-fpdf \
	php-google-auth \
	php-soap \
	php-redis\
	phpmd \
	phploc \
	$PHP_MODS \
	&& rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

WORKDIR $WORKDIR

COPY entrypoint /usr/local/bin/

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a