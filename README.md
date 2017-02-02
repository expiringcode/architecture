# Docker-webdev-env
A preconfigured docker environment with NGINX, PHP7, PHP5.6 (both with imagick enabled) and MySQL - More services to be added


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
            - **Letsencrypt** certificates are renewed automatically by a cronjob
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
    + conf
        * mysql
        * nginx
        * php-7.0
        * php-5.6
        * redis
    + data
        * mysql
        * redis
        * www *PHP website goes here*
    + logs
        * mysql
        * nginx
        * php
    + images
        * nginx
        * php
            - 5.6
            - 7.0
        * node

## Next step, HHVM image

