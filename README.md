# Muse
Starter kit for ambitious full stack project.



### Installation
```sh
# Download repo
git clone git@github.com:nanuclickity/muse
cd muse

# Run setup
sh setup.sh
```

### Development
```sh
# Open two windows/tabs of your terminal

# Run this for building project
yarn dev

# Run this for starting development server
yarn dev:server
```


### Production Deploy
```sh
yarn install
yarn build

# If started before
yarn prod:reload

# If starting for first time
yarn prod:server
```

### Documentation
```sh
yarn generate-docs
open docs/muse/1.0.0/index.html
```

### Other scripts
```sh
# Generate webpack stats profile
yarn profile

# Generate profile and start bundle analyzer
yarn analyze

```


### Prepare for distribution as static files
This will generate assets and optimize them to be used as static files
```
yarn dist
```

### Prepare for distribution on wrapbootstrap
This will generate static assets, will not combine/minify assets, and provide formatted html files
```
yarn dist:wb
```