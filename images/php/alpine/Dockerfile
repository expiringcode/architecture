FROM php:7.1-fpm-alpine

RUN apk update && apk add --no-cache --virtual .build-deps \
	curl \
	git

ENV PHP_INI_DIR /etc/php/7.1/fpm
ENV PHP_VERSION 7.1
ENV WORKDIR /www

COPY entrypoint /usr/local/bin/

RUN set -xe && curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/composer \
	&& chmod +x /usr/local/bin/composer \
	&& curl -LO https://deployer.org/deployer.phar \
	&& mv deployer.phar /usr/local/bin/dep \
	&& chmod +x /usr/local/bin/dep \
	&& rm -Rf /etc/php/7.1/fpm/php.ini && mkdir -p /etc/php/7.1/fpm/ \
	&& chmod +x /usr/local/bin/entrypoint

COPY ./conf/* /usr/local/etc/php/conf.d/

WORKDIR $WORKDIR

# HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
# 	CMD { service php7.0-fpm status | grep "not running" && exit 1; } || exit 0;

ENTRYPOINT entrypoint php -a