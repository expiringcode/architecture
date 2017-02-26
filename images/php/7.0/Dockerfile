FROM phusion/baseimage:0.9.19

# ENV PHPIZE_DEPS \
# 		autoconf \
# 		file \
# 		g++ \
# 		gcc \
# 		libc-dev \
# 		make \
# 		pkg-config \
# 		re2c

ENV PHP_MODS \
	imagemagick \
	php-imagick

RUN apt-get update && apt-get install -y --no-install-recommends \
		# $PHPIZE_DEPS \
		# ca-certificates \
		curl \
		# libedit2 \
		libsqlite3-0 \
		libxml2 \
		xz-utils \
		php \
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
		zip \
		git \
		$PHP_MODS \
	&& rm -r /var/lib/apt/lists/*

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
} | tee /etc/php/7.0/fpm/pool.d/docker.conf \
&& { \
	echo '[global]'; \
	echo 'daemonize = no'; \
	echo; \
	echo '[www]'; \
	echo 'listen = [::]:9000'; \
} | tee /etc/php/7.0/fpm/pool.d/zz-docker.conf

ENV PHP_INI_DIR /etc/php/7.0/fpm
ENV PHP_VERSION 7.0
ENV WORKDIR /www

RUN set -xe && curl -sS https://getcomposer.org/installer | php 
RUN set -xe && mv composer.phar /usr/local/bin/composer 
RUN set -xe && chmod +x /usr/local/bin/composer 
RUN set -xe && curl -LO https://deployer.org/deployer.phar 
RUN set -xe && mv deployer.phar /usr/local/bin/dep 
RUN set -xe && chmod +x /usr/local/bin/dep

RUN rm -Rf /etc/php/7.0/fpm/php.ini && mkdir -p /etc/php/7.0/fpm/
COPY ./conf/* /etc/php/7.0/fpm/

WORKDIR $WORKDIR

COPY entrypoint /usr/local/bin/

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a