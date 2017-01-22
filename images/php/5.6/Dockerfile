FROM phusion/baseimage:0.9.19
# ubuntu:xenial

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
		php5.6-mysql \
		php5.6-curl \
		php5.6-mbstring \
		php5.6-gd \
		php5.6-mysqli \
		php5.6-xml \
		php5.6-mcrypt \
		php-fpdf \
		php5.6-soap \
		$PHP_MODS \
	&& rm -r /var/lib/apt/lists/*

ENV PHP_INI_DIR /etc/php/5.6/fpm
ENV PHP_VERSION 5.6
ENV WORKDIR /www

RUN set -e\
&& { \
	echo '[global]'; \
	echo 'error_log = /proc/self/fd/2'; \
	echo; \
	echo '[www]'; \
	echo '; if we send this to /proc/self/fd/1, it never appears'; \
	echo 'access.log = /proc/self/fd/2'; \
	echo; \
	echo 'clear_env = no'; \
	echo; \
	echo '; Ensure worker stdout and stderr are sent to the main error log.'; \
	echo 'catch_workers_output = yes'; \
} | tee /etc/php/5.6/fpm/pool.d/docker.conf \
&& { \
	echo '[global]'; \
	echo 'daemonize = no'; \
	echo; \
	echo '[www]'; \
	echo 'listen = [::]:9000'; \
} | tee /etc/php/5.6/fpm/pool.d/zz-docker.conf

WORKDIR $WORKDIR

COPY entrypoint /usr/local/bin/

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a