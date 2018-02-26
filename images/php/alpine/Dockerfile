FROM php:fpm-alpine

RUN docker-php-ext-install \
	mysqli \
	pdo_mysql

RUN apk update && apk add git imagemagick

RUN apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS imagemagick-dev libtool \
&& export CFLAGS="$PHP_CFLAGS" CPPFLAGS="$PHP_CPPFLAGS" LDFLAGS="$PHP_LDFLAGS" \
&& pecl install imagick-3.4.3 \
&& docker-php-ext-enable imagick \
&& apk add --no-cache --virtual .imagick-runtime-deps imagemagick \
&& apk del .phpize-deps

ENV WORKDIR /www

COPY entrypoint /usr/local/bin/

RUN set -xe && curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/composer \
	&& chmod +x /usr/local/bin/composer \
	&& rm -Rf /etc/php/7.1/fpm/php.ini && mkdir -p /etc/php/7.1/fpm/ \
	&& chmod +x /usr/local/bin/entrypoint

COPY ./conf/* /usr/local/etc/php/conf.d/

WORKDIR $WORKDIR

RUN chown -R www-data:www-data $WORKDIR

USER www-data

COPY ./app .

HEALTHCHECK --interval=10s --timeout=3s \
    CMD \
    SCRIPT_NAME=/ping \
    SCRIPT_FILENAME=/ping \
    REQUEST_METHOD=GET \
    cgi-fcgi -bind -connect 127.0.0.1:9000 || exit 1

ENTRYPOINT ["entrypoint"]
CMD ["php-fpm"]