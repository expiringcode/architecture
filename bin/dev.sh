#!/bin/sh

pushd ..

docker-compose -f ./yml/docker-compose.yml -f ./yml/docker-compose.dev.yml up -d --build

popd