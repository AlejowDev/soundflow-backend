#!/usr/bin/env bash
# Crea el usuario y la base de datos de SoundFlow en el Postgres local usando DATABASE_URL del .env.
set -euo pipefail
cd "$(dirname "$0")/.."
URL=$(grep -E '^DATABASE_URL=' .env | cut -d= -f2- | tr -d '"')
DB_USER=$(echo "$URL" | sed -E 's#^postgresql://([^:]+):.*#\1#')
DB_PASS=$(echo "$URL" | sed -E 's#^postgresql://[^:]+:([^@]+)@.*#\1#')
DB_NAME=$(echo "$URL" | sed -E 's#^.*/([^/?]+)(\?.*)?$#\1#')

sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
DO \$\$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';
  END IF;
END \$\$;
SQL
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 \
  || sudo -u postgres createdb -O "$DB_USER" "$DB_NAME"
echo "Base de datos $DB_NAME lista para $DB_USER"
