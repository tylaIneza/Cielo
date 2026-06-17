#!/bin/bash
set -e

# ─── Colors ────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
GOLD='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${GOLD}[→]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ─── Config ────────────────────────────────────────────────────────────────
APP_DIR="/var/www/cielo-fashion"
APP_NAME="cielo-fashion"
DOMAIN="${DOMAIN:-cielofashion.rw}"
PORT="${PORT:-3000}"

# ─── Check prerequisites ───────────────────────────────────────────────────
command -v node >/dev/null 2>&1 || err "Node.js not found. Install Node.js 20+."
command -v npm  >/dev/null 2>&1 || err "npm not found."
command -v pm2  >/dev/null 2>&1 || { info "Installing PM2..."; npm install -g pm2; }

# ─── Load environment ──────────────────────────────────────────────────────
if [ ! -f "$APP_DIR/.env" ]; then
  err ".env file not found at $APP_DIR/.env. Copy .env.example and fill in values."
fi
set -a; source "$APP_DIR/.env"; set +a

# ─── Install dependencies ──────────────────────────────────────────────────
info "Installing dependencies..."
cd "$APP_DIR"
npm ci --omit=dev
log "Dependencies installed"

# ─── Prisma ────────────────────────────────────────────────────────────────
info "Generating Prisma client..."
npm run db:generate
log "Prisma client generated"

info "Running database migrations..."
npx prisma migrate deploy
log "Migrations applied"

info "Running database seed (creates Super Admin if not exists)..."
npm run db:seed
log "Database seeded"

# ─── Build ─────────────────────────────────────────────────────────────────
info "Building Next.js application..."
npm run build
log "Build complete"

# ─── PM2 ───────────────────────────────────────────────────────────────────
info "Starting/restarting PM2 process..."
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start npm --name "$APP_NAME" -- start
fi
pm2 save
log "PM2 process running"

# ─── Nginx config ──────────────────────────────────────────────────────────
if command -v nginx >/dev/null 2>&1; then
  info "Writing Nginx config..."
  cat > "/etc/nginx/sites-available/$APP_NAME" <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

  ln -sf "/etc/nginx/sites-available/$APP_NAME" "/etc/nginx/sites-enabled/$APP_NAME"
  nginx -t && systemctl reload nginx
  log "Nginx configured"

  # SSL via Certbot
  if command -v certbot >/dev/null 2>&1; then
    info "Configuring SSL with Let's Encrypt..."
    certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos \
      -m "${SMTP_USER:-admin@$DOMAIN}" --redirect || true
    log "SSL configured"
  else
    info "Certbot not found — skipping SSL. Install certbot and run: certbot --nginx -d $DOMAIN"
  fi
fi

# ─── Done ──────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GOLD}  Cielo Fashion deployed successfully!  ${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
echo -e "  URL:  ${GREEN}https://$DOMAIN${NC}"
echo -e "  Admin: ${GREEN}https://$DOMAIN/admin${NC}"
echo -e "  PM2:  ${GREEN}pm2 status${NC}"
echo ""
