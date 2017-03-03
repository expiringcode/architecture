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

- ~~./conf/nginx:~~/etc/nginx:ro
- ~~./conf/redis/redis.conf:~~/usr/local/etc/redis/redis.conf
- ~~./conf/mongo:~~/data/configdb
- ~~./conf/mysql:~~/etc/mysql:ro
- ~~./conf/php-7.0/php.ini:~~/etc/php/7.0/fpm/php.ini
- ~~./conf/php-5.6/php.ini:~~/etc/php/5.6/fpm/php.ini
- ~~./conf/hhvm/php.ini:~~/etc/hhvm/php.ini
- ~~./conf/hhvm/server.ini:~~/etc/hhvm/server.ini

### logs:

- ~~./logs/nginx:~~/var/log/nginx
- ~~./logs/mysql:~~/var/log/mysql
- ~~./logs/php/php7.0-fpm.log:~~/var/log/php7.0-fpm.log
- ~~./logs/php/php5.6-fpm.log:~~/var/log/php5.6-fpm.log

### data:

- ~~./data/www:~~/www
- ~~./data/node:~~/app
- ~~./data/redis:~~/data
- ~~./data/mongo:~~/data/db
- ~~./data/mysql:~~/var/lib/mysql

