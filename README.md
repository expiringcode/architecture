# Dockerized sytem for web development

A preconfigured docker environment with NGINX, HHVM, PHP7, PHP5.6 (both with imagick enabled php-md and other modules) and MySQL - More services to be added

## Services installation and configuration

As the architecture below explains, this system is based on microservices. Each microservice is indipendent. 

This containerized infrastructure is designed to have multiple projects, each having its own services.
To expose these projects, a new higher level network was added that will act as a load balancer and distribute the requests to the projects accordingly.

The steps to prepare a machine for docker are simple. You can install it anywhere be it a virtual machine in the cloud or a dedicated machine or your home computer. 

You can use this official script and install it on most OSes

```bash
$ wget -qO- https://get.docker.com/ | sh
```

All you need to install in your VM is wget.

***

Now, in order to be able to launch a project the **Load Balancer** and its network must be set up. 

The *network* directory contains the **docker-compose** file needed to create these services. The ideal setup will have in this directory, all the services to automate project routing and https. Such as using *docker gen* and *let's encrypt*. But the important thing is the network called loadbalancer0.

> Check out the feature branch `traefik` for a solution with [traefik](http://traefik.io) as a load balancer

***

And finally now you can set up your project. Open `docker-compose.yml` and `docker-compose.dev.yml` in the **yml** directory and configure it according to the project you're going to develop by removing or adding services. The `templates.yml` file contains snippets for other services. 

Once done configuring the services, run the following command to create the environment.

```bash
$ docker-compose -f yml/docker-compose.yml -f yml/docker-compose.dev.yml up -d --build --remove-orphans
```

If you're familiar with docker you'll understand what the command above does. For those who are not, it loads the first docker-compose *yml* and then extends it with the second one, it brings *up* the services as a *deamon* so the command exits once the services are up and *builds* each service instead of using the pre-existing images. The *remove orphans* flag, removes any containers that have failed to launch previously.

> Be careful that **remove orphans** can remove other projects' containers if **--project-name** is not specified before **up**

***

The `yml` files are highly customisable through .env files. Each service defined in **yml/docker-compose.yml** has is built through the corresponding image in **images/**. In the image directory of a service there is also it's *.env* file that contains all the configuration of that service. These *environment variables* are gonna be present inside the container as well during it's lifetime.

There's a global *.env* in the root directory of the repo which has some settings that will fill in **docker-compose.yml** 

## File structure

- images: Contains directories representing each service needed, thus a **Dockerfile**
- yml: As described above, contains the docker-compose configuration
- network: Again a docker-compose configuraiton but not for the project, for the load balancer in case you're going to run multiple projects

## Proposed Architecture

![architecture](cloud.png)

## Files saved persistently

Upping the services with **docker-compose.dev.yml** will link volumes in your local machine. A **data** directory will be created and files that need to persist, such as your application or database, will be there. In production, these directories will be still persisten, but won't be linked in the host OS.

### configuration files:

Before upping the services, go to the directory of each service you're using and change the configuration files. For example, for Nginx, you go to `images/nginx`. There you can get into `conf` and set it up the way you like as you would with any Nginx setup. These configuration files are copied inside the container automatically when it's built.

***

> Check out this other repo for a simpler management of this structure. [docker-deploy](https://github.com/progress44/docker-deploy)
