FROM php:5-fpm

RUN docker-php-ext-install mysqli

ENV WORKDIR /www

WORKDIR $WORKDIR

RUN set -xe && curl -sS https://getcomposer.org/installer | php 
RUN set -xe && mv composer.phar /usr/local/bin/composer 
RUN set -xe && chmod +x /usr/local/bin/composer 

COPY entrypoint /usr/local/bin/

RUN rm -Rf /etc/php/5.6/fpm/php.ini && mkdir -p /etc/php/5.6/fpm/ && chmod +x /usr/local/bin/entrypoint
COPY ./conf/* /etc/php/5.6/fpm/

USER www-data

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD { service php5.6-fpm status | grep "not running" && exit 1; } || exit 0;

ENTRYPOINT ["entrypoint"]
CMD ['php-fpm']