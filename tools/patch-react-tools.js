const chalk = require('chalk')
const fs = require('fs')
const PATHS = require('./paths')

// Run patches here, define them below
PatchClearConsole()



// React app clears console on subsequent webpack builds
// Currently, you cannot scroll up if screen is cleared
// Until this is fixed. We're opting out of this by providing the access through an ENV variable.
function PatchClearConsole(){
	const FILE_PATH = PATHS.NODE_MODULES + '/react-dev-utils/clearConsole.js'
	const newData = `
	'use strict';

	function clearConsole() {
	  if (process.env.NO_CLEAR_CONSOLE){
	    return
	  }
	  process.stdout.write(
	    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
	  );
	}

	module.exports = clearConsole;
	`

	fs.writeFileSync(FILE_PATH, newData, 'utf-8')
	console.log(chalk.green(`  ✓ Patched node_modules${FILE_PATH.replace(PATHS.NODE_MODULES, '')}`))
}
