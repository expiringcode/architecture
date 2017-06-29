FROM phusion/baseimage:0.9.19

ARG PHP_MODS

RUN apt-get update \
	&& apt-get install -y --no-install-recommends software-properties-common --allow-unauthenticated \
	&& export LC_ALL=en_US.UTF-8 \
	&& export LANG=en_US.UTF-8 \
	&& add-apt-repository ppa:ondrej/php \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends --allow-unauthenticated \
		ca-certificates \
		curl \
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
		php5.6-redis \
		php5.6-zip \
		zip \
		unzip \
		git \
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

RUN set -xe && curl -sS https://getcomposer.org/installer | php 
RUN set -xe && mv composer.phar /usr/local/bin/composer 
RUN set -xe && chmod +x /usr/local/bin/composer 
RUN set -xe && curl -LO https://deployer.org/deployer.phar 
RUN set -xe && mv deployer.phar /usr/local/bin/dep 
RUN set -xe && chmod +x /usr/local/bin/dep

RUN rm -Rf /etc/php/5.6/fpm/php.ini && mkdir -p /etc/php/5.6/fpm/
COPY ./conf/* /etc/php/5.6/fpm/

COPY entrypoint /usr/local/bin/

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD { service php5.6-fpm status | grep "not running" && exit 1; } || exit 0;

CMD chmod +x /usr/local/bin/entrypoint && entrypoint && php -a