FROM hhvm/hhvm:latest
# ubuntu:xenial

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
	zip \
	unzip \
	&& rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

WORKDIR $WORKDIR

RUN set -xe && curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/composer \
	&& chmod +x /usr/local/bin/composer \
	&& rm -Rf /etc/php/7.0/fpm/php.ini && mkdir -p /etc/php/7.0/fpm/

RUN rm -Rf /etc/hhvm/php.ini && rm -Rf /etc/hhvm/server.ini
COPY images/hhvm/conf/* /etc/hhvm/

COPY images/hhvm/entrypoint /usr/local/bin/
COPY ./data/app .

RUN chmod +x /usr/local/bin/entrypoint && \
	chown -R www-data:www-data $WORKDIR

USER www-data

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
	CMD { service hhvm status | grep "not running" && exit 1; } || exit 0;

ENTRYPOINT ["entrypoint"]

CMD ["sh"]