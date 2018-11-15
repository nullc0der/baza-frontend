echo "Clean public directory"
node tools/clean.js

echo "Copy vendors"
node tools/copy.js

echo "Building bundles"
yarn build

echo "Starting frontend server"
yarn prod:server
