#!/usr/bin/env bash
set -euo pipefail

DOMAIN="app.streetchef.co.za"
NGINX_AVAILABLE_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
TARGET_PATH="${NGINX_AVAILABLE_DIR}/streetchef"
CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

mkdir -p /var/www/certbot

if [ -f "$CERT_PATH" ]; then
  install -D -m 644 ./deploy/nginx/streetchef.conf "$TARGET_PATH"
else
  install -D -m 644 ./deploy/nginx/streetchef.bootstrap.conf "$TARGET_PATH"
fi

ln -sfn "$TARGET_PATH" "${NGINX_ENABLED_DIR}/streetchef"
rm -f "${NGINX_ENABLED_DIR}/default" || true
