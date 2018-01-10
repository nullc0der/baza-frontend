const Promise = require('bluebird')
const { run } = require('./_utils')
const PATHS   = require('../paths')
const fs = require('fs-extra')

const ASSETS = {
	'node_modules/bootstrap/dist/': `${PATHS.BUILD}/public/vendor/bootstrap/`,
	'node_modules/jquery/dist/': `${PATHS.BUILD}/public/vendor/jquery/`,
	'node_modules/popper.js/dist/': `${PATHS.BUILD}/public/vendor/popper.js/`,
	'node_modules/animate.css/': `${PATHS.BUILD}/public/vendor/animate.css/`,
	'node_modules/wowjs/dist/' : `${PATHS.BUILD}/public/vendor/wowjs/`
}

if (process.env.DIST_MODE === "1")
	ASSETS['./config.json'] = `${PATHS.BUILD}/config.json`

module.exports = function copyTask(cb){

	const commands = [
		`mkdir -p ${PATHS.BUILD}/public/vendor`,
		`cp -r src/public ${PATHS.BUILD}/`,
		`cp -r src/server/views ${PATHS.BUILD}/`,
	];

	// if (process.env.DIST_MODE === "1") {
	// 	commands.push( `cp ./LICENSE.txt ${PATHS.BUILD}/` )
	// }

	const manifestPath = `${PATHS.BUILD}/public/vendor-manifest.json`

	if ( !fs.existsSync(manifestPath) )
		commands.push(`echo "{}" > ${manifestPath}`)

	Object.keys(ASSETS).forEach(srcPath => {
		commands.push(`cp -r ${srcPath} ${ASSETS[srcPath]}`)
	})

	return Promise.mapSeries(
		commands.filter(x => !!x),
		run
	)

}
