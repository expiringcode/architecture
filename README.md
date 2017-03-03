# AeriaContainer

A preconfigured docker environment with NGINX, HHVM, PHP7, PHP5.6 (both with imagick enabled php-md and other modules) and MySQL - More services to be added


## Services installation and configuration

- **server-setup.sh** *Prepares a clean ubuntu installation for docker*
- Docker
    + `docker-compose up -d --build --remove-orphans` installs the microservices
        * **Proxy** *Nginx server acting as a reverse proxy for php services, exposes ports 80 and 443. Enabled with 443* **built image**
            - Configured for highest security
            - Enabled letsencrypt for SSL only communications
            - Enabled HTTP2 protocol
            - `WORKDIR` to be set to */www*
            - `SSLOPTS` to be set to `*-w /www/7.0 -d localhost -d 127.0.0.1*`
            - The above environment variable is needed for letsencrypt certificate generation
            - **Letsencrypt** certificates are renewed automatically by a cronjob **Not tested yet**
        * **PHP** *`php`7.0 service with imagemagick and redis enabled* **built image**
            - php-imagick
            - php-redis
            - php7.0-mysql
            - php7.0-curl
            - php7.0-mbstring
            - php7.0-gd
            - php7.0-mysqli
            - php7.0-xml
            - php7.0-mcrypt
        * **DB** *MySQL service; accessed by other services as `mysql`. Change the environment variables before deploying*
            - MYSQL_ROOT_PASSWORD: "root_password"
            - MYSQL_USER: "admin"
            - MYSQL_PASSWORD: "admin"
            - MYSQL_DATABASE: "test"
        * **Redis** *Redis service accessed as `redis`*
        * **Legacy** *php5.6 for legacy projects configured with the same modules available for php7.0* **built image**

## File structure

- Project
    + images
        * nginx
            - conf
        * hhvm
            - conf
        * php
            - 5.6
                + conf
            - 7.0
                + conf
        * node
        * mysql
            - conf
        * redis
            - conf
        * ssh
            - conf

## Files saved persistently

### configuration files:

- _./conf/nginx:_/etc/nginx:ro
- _./conf/redis/redis.conf:_/usr/local/etc/redis/redis.conf
- _./conf/mongo:_/data/configdb
- _./conf/mysql:_/etc/mysql:ro
- _./conf/php-7.0/php.ini:_/etc/php/7.0/fpm/php.ini
- _./conf/php-5.6/php.ini:_/etc/php/5.6/fpm/php.ini
- _./conf/hhvm/php.ini:_/etc/hhvm/php.ini
- _./conf/hhvm/server.ini:_/etc/hhvm/server.ini

### logs:

- _./logs/nginx:_/var/log/nginx
- _./logs/mysql:_/var/log/mysql
- _./logs/php/php7.0-fpm.log:_/var/log/php7.0-fpm.log
- _./logs/php/php5.6-fpm.log:_/var/log/php5.6-fpm.log

### data:

- _./data/www:_/www
- _./data/node:_/app
- _./data/redis:_/data
- _./data/mongo:_/data/db
- _./data/mysql:_/var/lib/mysql

