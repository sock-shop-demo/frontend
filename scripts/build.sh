#!/usr/bin/env bash

set -ev

docker build \
 -t lautibringas/frontend:latest\
 -t lautibringas/frontend:${TAG} .
