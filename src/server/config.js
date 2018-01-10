import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

export var Config = {}


export const initConfig = (app)=> {
	// Path is dynamically resolved when this function is called
	// e.g. '.'  will point to build/server.bundle.js
	var p = path.resolve('.', './config.json')
	console.log(chalk.cyan(`Loading config from: ${p}`))
	try {
		Config = Object.assign(Config, JSON.parse( fs.readFileSync(p) ))
	} catch (e){
		throw e
	}

	// Expose config to middlewares
	app.set('app_config', Config)

	return Promise.resolve(app)
}
