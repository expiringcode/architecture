FROM phusion/baseimage:0.9.19
# ubuntu:xenial

## Installing nginx and wget and eventually selinux
RUN apt-get update && apt-get install -y --no-install-recommends \
	nginx\
	wget\
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

## Installing letsencrypt
RUN apt-get update && apt-get install -y --no-install-recommends \
	letsencrypt\
	&& mkdir -p /ssl\
	&& openssl dhparam -out /ssl/dhparam.pem 2048
RUN (crontab -l ; echo "30 03 01 */3 * letsencrypt renew")| crontab -

RUN mkdir -p /etc/letsencrypt/live/$DOMAIN
COPY privkey.pem /etc/letsencrypt/live/$DOMAIN
COPY fullchain.pem /etc/letsencrypt/live/$DOMAIN

## Clean apt list
RUN rm -r /var/lib/apt/lists/*

ENV WORKDIR /www

COPY sysctl.conf /etc/sysctl.conf
COPY iptables.sh /usr/bin
# can't run iptables because the system doesn't have some programs such as ifconfig or iptables

COPY entrypoint /usr/bin
RUN chmod +x /usr/bin/entrypoint

WORKDIR $WORKDIR

CMD entrypoint && service nginx start && /bin/sh