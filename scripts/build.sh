#!/usr/bin/env bash

set -ev

docker build \
 -t lmbringas/frontend:latest\
 -t lmbringas/frontend:${TAG} .
