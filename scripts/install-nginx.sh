#!/usr/bin/env bash
# Publica el backend en https://api-soundflow.devszens.com (requiere el registro DNS ya creado).
set -euo pipefail
cd "$(dirname "$0")/.."
sudo cp deploy/soundflow-proxy.conf /etc/nginx/snippets/soundflow-proxy.conf
sudo cp deploy/api-soundflow.conf /etc/nginx/sites-available/api-soundflow.conf
sudo ln -sf /etc/nginx/sites-available/api-soundflow.conf /etc/nginx/sites-enabled/api-soundflow.conf
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d api-soundflow.devszens.com --redirect --non-interactive --agree-tos --keep-until-expiring
sudo nginx -t && sudo systemctl reload nginx

# fail2ban: banea IPs abusivas (los logs ya existen tras el reload)
sudo cp deploy/fail2ban-soundflow.conf /etc/fail2ban/jail.d/soundflow.conf
sudo fail2ban-client reload
sudo fail2ban-client status nginx-limit-req-soundflow
echo "Listo: https://api-soundflow.devszens.com/api"
