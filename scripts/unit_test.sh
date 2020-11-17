#!/usr/bin/env bash

set -ev

docker build \
 -t lmbringas/frontend:latest\
 -t lmbringas/frontend:${TAG} .


IMAGE=lautibringas/frontend:${TAG}

docker run \
    --rm \
    -v ${PWD}:/usr/src/app  \
    $IMAGE /usr/local/bin/npm test