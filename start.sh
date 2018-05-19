echo "Building bundles"
yarn build

echo "Starting frontend server"
yarn prod:server
