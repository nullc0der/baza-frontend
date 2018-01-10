const path    = require('path')
const webpack = require('webpack')
const ModuleScopePlugin        = require('react-dev-utils/ModuleScopePlugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const PATHS   = require('./paths')
const LOADERS = require('./gulp/loaders')

const IS_PROD = process.env.NODE_ENV === "production"
const IS_TEST = process.env.NODE_ENV === "test"
const IS_DEV  = process.env.NODE_ENV === 'development'

const envOption = (prod, dev, test)=> {
	return IS_PROD
		? prod
		: IS_TEST
			? test
			: dev
}

// Initialize config
const config = {}

// Don't build in case of errors, on prod
config.bail = IS_PROD

// Devtool
config.devtool = envOption(false, 'cheap-module-source-map', false)

config.cache = IS_DEV

config.target = 'web'

// css-loader calculates hash based on path and name only
// path is derived from context
// To keep server renders in sync, either use the same context in both webpack configs,
// or read the client generated css in prod
// [TIP: since the hashes are provided by webpack, try to resolve this in hashing itself]
config.context = PATHS.SRC

// Entry
config.entry = {
	main: [
		PATHS.SRC_CLIENT + '/index.js'
	]
}

// Output
config.output = {
	chunkFilename: '[name].[chunkhash:8].chunk.js',
	filename: IS_PROD ? '[name].[chunkhash:8].bundle.js' : '[name].bundle.js',
	path: PATHS.BUILD_PUBLIC,
	pathinfo: true,
	publicPath: '/public/',
	devtoolModuleFilenameTemplate: info => {
		return path.resolve(info.absoluteResourcePath).replace(process.cwd(), '')
	}
}

// Resolve dependencies strategy
config.resolve = {
	modules: ['node_modules', PATHS.NODE_MODULES, PATHS.SRC_CLIENT ],
	extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.styl'],
	plugins: [
		// Prevents importing files outside src
		new ModuleScopePlugin(PATHS.SRC_CLIENT)
	]
}

config.module  = {
	strictExportPresence: true,
	rules: [
		LOADERS.ESLINT_LOADER(),
		LOADERS.FILE_LOADER(),
		LOADERS.URL_LOADER(),
		LOADERS.JS_LOADER(),
		// LOADERS.STYLUS_LOADER(),
		LOADERS.SASS_LOADER(),
		LOADERS.CSS_LOADER()
	]
}

/////////////
// Plugins //
/////////////

config.plugins = [
	new webpack.NamedModulesPlugin(),
	new webpack.DefinePlugin({
		__DEV__    : envOption(false, true, false),
		__TEST__   : envOption(false, false, true),
		__SERVER__ : false,
		'process.env': {
			NODE_ENV: JSON.stringify( envOption('production', 'development', 'test') )
		}
	}),
	new CaseSensitivePathsPlugin(),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new webpack.LoaderOptionsPlugin({
		options: {
			context: PATHS.SRC
		},
		minimize: IS_PROD,
		debug: !IS_PROD
	}),
	new ManifestPlugin({
		fileName: 'asset-manifest.json',
		publicPath: '/public/'
	})
]

// Dev mode specific plugins
if (IS_DEV) {
	config.plugins = [
		// This is necessary to emit hot updates (currently CSS only):
    	new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
    	new WatchMissingNodeModulesPlugin(PATHS.NODE_MODULES),

		new webpack.DllReferencePlugin({
			context: PATHS.SRC_CLIENT,
			manifest: PATHS.BUILD_PUBLIC + '/vendor-manifest.json'
		}),

    	...config.plugins
	]

	config.entry.main = [
		require.resolve('react-hot-loader/patch'),
		// require.resolve('webpack-hot-middleware/client'),
		require.resolve('react-dev-utils/webpackHotDevClient'),
		require.resolve('react-error-overlay'),
		...config.entry.main
	]
}

if (IS_PROD){
	config.entry.vendors = [
		PATHS.SRC_CLIENT + '/vendors.js'
	]
	config.plugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendors', 'manifest'],
			filename: '[name].[chunkhash:8].bundle.js',
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true,
			},
			compress: {
				warnings: false,
				comparisons: false,
				booleans: true,
				conditionals: true,
				dead_code: true,
				drop_console: true,
				drop_debugger: true,
				evaluate: true,
				join_vars: true,
				screw_ie8: true,
				sequences: true,
				unused: true,
				keep_infinity: true,
			},
			output: {
				comments: false,
				ascii_only: true
			},
			comments: false,
			sourceMap: true
		}),

		new ExtractTextPlugin({
	      filename: 'main.[contenthash:8].bundle.css',
		  allChunks: true
	    }),

		// Enables scope hoisting -> faster parsing time
		new webpack.optimize.ModuleConcatenationPlugin(),

		...config.plugins
	]
}


////////////
// OTHERS //
////////////
config.node = {
	dgram: 'empty',
	fs: 'empty',
	net: 'empty',
	tls: 'empty',
}
// Turn off performance hints during development because we don't do any
// splitting or minification in interest of speed. These warnings become
// cumbersome.
// config.performance = {
// 	hints: envOption("warning", false, false)
// }


module.exports = config
