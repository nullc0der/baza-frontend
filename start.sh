echo "Cleanup Build dirs"
node tools/gulp/clean.js

echo "Copy vendors"
node tools/gulp/copy.js

echo "Building bundles"
yarn build

echo "Starting frontend server"
yarn prod:server
