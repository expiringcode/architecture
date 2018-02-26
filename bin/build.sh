#!/bin/sh

pushd ..

docker-compose -f ./yml/docker-compose.yml up -d --build

popd