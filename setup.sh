GREEN='\033[0;32m'
NC='\033[0m'   # No Color


log(){
    echo "${GREEN}$1${NC}"
}

echo "◦ Copy Config..."
# Copy config
if [ -f "config.json" ]
then
    echo "  ◦ Config already present. Skipped copy"
else
    cp .sample.config.json config.json
fi
log "  ✓ Done"

echo "◦ Installing Dependencies..."
# Install dependencies
# yarn install --silent
log "  ✓ Done"

echo "\n◦ Patching modules..."
# Patch react-dev-tools
# node tools/patch-react-tools.js

log "\n✓ Finished"
log "✓ Run 'yarn dev' and 'yarn dev:server' in two terminals/tabs"
