FROM alpine:latest

RUN apk add --no-cache \
	openssh \
	curl \
	tar \
	gzip \
	zip \
	python \
	py-pip && \
	pip install --upgrade \
		awscli \
		s3cmd \
		python-magic && \
	apk -v --purge del py-pip

ENV WORKDIR /app

WORKDIR $WORKDIR

COPY images/backup/entrypoint /usr/local/bin/
COPY images/backup/keygen /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/keygen

ENTRYPOINT ["entrypoint"]

CMD ["crond", "-d", "2", "-f"]