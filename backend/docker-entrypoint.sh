#!/bin/sh
set -e
if [ ! -f node_modules/.install-stamp ] || [ package-lock.json -nt node_modules/.install-stamp ]; then
  npm ci
  touch node_modules/.install-stamp
fi
exec "$@"
