FROM phusion/baseimage:0.9.19
# ubuntu:xenial

## Installing nginx and wget and eventually selinux
RUN apt-get update && apt-get install -y --no-install-recommends \
	nginx\
	wget\
	inotify-tools\
	# selinux-policy-ubuntu\ # can't be installed because it requires GRUB-common
	# selinux-policy-dev\
	# libselinux1-dev\
	&& echo "First step done"

## Installing selinx policy for nginx
# RUN wget 'http://downloads.sourceforge.net/project/selinuxnginx/se-ngix_1_0_10.tar.gz' \
# 	&& tar -zxvf se-ngix_1_0_10.tar.gz\
# 	&& cd se-ngix_1_0_10/nginx\
# 	&& make\
# 	&& /usr/sbin/semodule -i nginx.pp\
# 	&& echo "Made nginx.pp selinux policy but can't install becuase missing selinux-policy"

## Clean apt list
RUN apt-get autoremove -y
RUN rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

RUN mkdir -p $WORKDIR/nginx

COPY sysctl.conf /etc/sysctl.conf
COPY iptables.sh /usr/bin
# can't run iptables because the system doesn't have some programs such as ifconfig or iptables

COPY entrypoint /usr/bin
RUN chmod +x /usr/bin/entrypoint

COPY onchange.sh /usr/bin/onchange
RUN chmod a+rx /usr/bin/onchange

RUN rm -Rf /etc/nginx
COPY ./conf /etc/nginx

WORKDIR $WORKDIR

CMD entrypoint