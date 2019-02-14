const fs = require('fs-extra')
const { exec } = require('child_process')
const PATHS = require('./paths')

const ASSETS = {
    'node_modules/bootstrap/dist/': `${PATHS.BUILD}/public/vendor/bootstrap/`,
    'node_modules/jquery/dist/': `${PATHS.BUILD}/public/vendor/jquery/`,
    'node_modules/popper.js/dist/': `${PATHS.BUILD}/public/vendor/popper.js/`,
    'node_modules/animate.css/': `${PATHS.BUILD}/public/vendor/animate.css/`,
    'node_modules/wowjs/dist/': `${PATHS.BUILD}/public/vendor/wowjs/`
}

if (process.env.DIST_MODE === '1')
    ASSETS['./config.json'] = `${PATHS.BUILD}/config.json`

function copyTask() {
    const commands = [
        `mkdir -p ${PATHS.BUILD}/public/vendor`,
        `cp -r src/public ${PATHS.BUILD}/`,
        `cp -r src/server/views ${PATHS.BUILD}/`
    ]

    const manifestPath = `${PATHS.BUILD}/public/vendor-manifest.json`

    if (!fs.existsSync(manifestPath))
        commands.push(`echo "{}" > ${manifestPath}`)

    Object.keys(ASSETS).forEach(srcPath => {
        commands.push(`cp -r ${srcPath} ${ASSETS[srcPath]}`)
    })
    commands.forEach(cmd => {
        console.log(`Running command ${cmd}`)
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error(err)
            }

            stdout.length && console.log(stdout)
            stderr.length && console.log(stderr)
        })
    })
    console.log('Done copying')
}

copyTask()
