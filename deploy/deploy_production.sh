#!/usr/bin/env bash

# exit script when any command ran here returns with non-zero exit code
set -e

echo "$PRODU_KUBERNETES_KUBECONFIG" | base64 --decode > kubeconfig.yml
envsubst < deploy/deployment.yml.template | tee deploy/deployment.yml
kubectl --kubeconfig=kubeconfig.yml get nodes
kubectl --kubeconfig=kubeconfig.yml apply -f deploy/deployment.yml