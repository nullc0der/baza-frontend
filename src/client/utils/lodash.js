/*
	Use this library instead of importing lodash directly
	This takes care of the unnecessary bloat in lodash
 */

// Empty Placeholder
const _ = {}

// Attach functions here
_.upperCase = require('lodash/upperCase')
_.snakeCase = require('lodash/snakeCase')

_.isBoolean = require('lodash/isBoolean')
_.isNumber  = require('lodash/isNumber')
_.isArray   = require('lodash/isArray')


/**
 * [constantCase
 *  returns string as all caps snake case, you may use this as a
 * 	helper to create action names]
 * @param  {string} str [input string]
 * @return {string}     [result]
 * Example: _.constantCase('foo bar') -> 'FOO_BAR'
 */
_.constantCase = str => _.upperCase(_.snakeCase(str))



// Export the custom lodash build
module.exports = _
