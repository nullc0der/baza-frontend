const { exec } = require('child_process')
const PATHS = require('./paths')

function cleanTask() {
    var cmd = `rm -rf ${PATHS.BUILD}/*`
    console.log(`Running command ${cmd}`)
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        }

        stdout.length && console.log(stdout)
        stderr.length && console.log(stderr)
    })
    console.log('Done cleanup')
}

cleanTask()
