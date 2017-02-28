# Containers exist to run a single application.

## Simplifying Configuration
>It lets you put your environment and configuration into code and deploy it. Without manipulating the VMs/Host OS. The same Docker configuration can also be used in a variety of environments. This decouples infrastructure requirements from the application environment.

## Code Pipeline Management
>Docker provides a consistent environment for the application from dev through production, easing the code development and deployment pipeline.

## Developer Productivity
>It helps a front-end engineer who is not much into the back end nitty gritty to easily use the full application setup and work on his or her area of interest without the setup or installation blues getting in the way. And, it provides an optional opportunity for further exploration on how back-end systems work under the hood to get a better understanding for the full stack.

## App Isolation
>There may be many reasons for which you end up running multiple applications on the same machine. An example of this is the developer productivity flow. This is also useful for App dependency `dependency hell`

## Server Consolidation
>Docker provides **far denser server** consolidation than you can get with VMs. The new breed of highly customizable PAAS, such as **Heroku**, **Elastic Beanstalk** and **App Engine**, all use these powerful feature of containers that is now at your disposal with *Docker*. Moreover, open source projects like Deis, **Kubernetes**, Cadvisor, Panamax, and others make deploying and monitoring large numbers of containers representing a multi-tier application architecture manageable.

## Debugging Capabilities
>The ability to checkpoint containers and container versions, as well as to diff two containers. This can be immensely useful in fixing an application.

>Docker uses btrfs (a copy-on-write filesystem) to keep track of filesystem diff's which can be committed and collaborated on with other users (like git)

## Multi-tenancy
>

## Rapid Deployment
>This is the enabling technology that has brought Google and Facebook to using containers. The immutable nature of Docker images gives you the peace of mind that things will work exactly the way they have been working and are supposed to work.

## Easy installation of Services
>Through the docker hub, it is easy to install a Continuous Integration server (i.e. Jenkinks) and other services

## VM vs Container

### VMs

>Virtual machines exist as complete standalone environments (quite literally “virtual” hardware). A VM utilizes its own BIOS, software network adapters (in turn these use the host’s adapters), disk storage (a file on the host machine), a CPU, RAM, and a complete OS. During setup, you determine how many of the host’s cores and how much of the host’s memory you want the VM to access. When the VM boots, it goes through the entire boot process (just like any other hardware device). VMs often boot faster than comparable hardware.

### Containers

>Instead of abstracting the hardware, containers abstract the OS. Each container technology features an explicit purpose, limiting the scope of the technology. Docker’s runs Linux, whereas Citrix’s XenApp runs Windows Server. Every container shares the exact same OS, reducing the overhead to the host system. Recall each VM runs its own copy of the OS, adding overhead for each instance.

## When To Use Docker?
Docker is a basic tool, like git or java, that you should start incorporating into your daily development and ops practices.

- Use Docker as version control system for your entire app's operating system
- Use Docker when you want to distribute/collaborate on your app's operating system with a team
- Use Docker to run your code on your laptop in the same environment as you have on your server
- Use Docker whenever your app needs to go through multiple phases of development (dev/test/qa/prod, try Drone or Shippable, both do Docker CI/CD)

## Self-Assessment
- Do you need to run multiple copies of a single application (e.g, PostgreSQL, MySQL)? If yes, choose Docker.
- Do you need to run as many applications as you can on a limited hardware budget? If yes, choose Docker.


# Security
The virtualization community continues the discussion over security differences between VMs and Containers. VMs offer hardware isolation. Containers share resources and libraries. If a VM goes down, it goes down alone; if a container goes down, it could possibly take the entire stack with it.

Under the hood, Docker utilizes libcontainers, which in turn accesses five namespaces (Process, Network, Mount, Hostname, and Shared Memory). This means that every container on a given host shares these kernel subsystems. Theoretically, a user with superuser (root) privileges on a container could also escalate to superuser on the host.

The rapid adaptation of Docker (and similar container technologies) increases open source interest; therefore, many third-party container scripts already exist. While great for rapid deployment, it’s important to understand the potential ramifications of running “unofficial” releases locally. Much of this can be relieved by running Docker containers on their own VM.

Three easy fixes (we go into these in more detail later):

- **Drop privileges as quickly as possible.**
- **Run your services as a non-root user when possible.**
- **Treat root inside the container as if it runs outside the container.**

[More on docker](https://www.docker.com/what-docker)

