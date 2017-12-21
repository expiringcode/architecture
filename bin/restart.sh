#!/bin/sh

CURR_DIR=${PWD##*/}

if [ -f .env ]; then . .env; fi
if [ -f ../.env ]; then . ../.env; fi

C_NAME=${PROJECT_NAME}_$1
ID=$(docker ps -q -f name=${C_NAME})

docker restart ${ID}