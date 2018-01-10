/*eslint-disable*/
var webpack = require('webpack');

var PATHS = require('./paths');

module.exports = {
	devtool: false,
	entry: {
		vendor: [
			PATHS.SRC_CLIENT + '/vendors.js'
		]
	},

    output: {
		path: PATHS.BUILD_PUBLIC,
		publicPath: '/public/',
		filename: "dll.[name].js",
		library: "[name]"
	},

	plugins: [
		new webpack.DllPlugin({
			path: PATHS.BUILD_PUBLIC + "/[name]-manifest.json",
			name: "[name]",
			context: PATHS.SRC_CLIENT
		}),

	],
	resolve: {
		modules: ["node_modules"]
	}
}
