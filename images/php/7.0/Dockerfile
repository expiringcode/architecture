FROM php:7-fpm

RUN docker-php-ext-install mysqli mbstring

RUN apt-get update && apt-get install -y --no-install-recommends \
	php-redis \
	php-mcrypt \
	php-zip \
	php-imagick \
	php-gd \
	php-curl \
	git \
	zip \
	unzip \
	&& rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

RUN set -xe && curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/composer \
	&& chmod +x /usr/local/bin/composer \
	&& rm -Rf /etc/php/7.0/fpm/php.ini && mkdir -p /etc/php/7.0/fpm/

COPY ./conf/* /etc/php/7.0/fpm/

WORKDIR $WORKDIR

COPY entrypoint /usr/local/bin/
COPY ./app .

RUN chmod +x /usr/local/bin/entrypoint && \
	chown -R www-data:www-data $WORKDIR

USER www-data

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD { service php7.0-fpm status | grep "not running" && exit 1; } || exit 0;

ENTRYPOINT ["entrypoint"]
CMD ["php-fpm"]