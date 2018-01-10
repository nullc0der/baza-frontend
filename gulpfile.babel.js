
// Needed, otherwise react-dev-utils clears the console on certain actions
process.env.NO_CLEAR_CONSOLE = true

const Config = require('./config.json')
const gulp  = require('gulp')
const chalk = require('chalk')
const run_seq  = require('run-sequence')
// const errorOverlayMiddleware = require('react-error-overlay/middleware')

// const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')

const WebpackDevServer = require('webpack-dev-server')

const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const browserSync = require('browser-sync')

const webpackClientConfig = require('./tools/webpack.config.client')
const webpackServerConfig = require('./tools/webpack.config.server')
const webpackDLLConfig    = require('./tools/webpack.config.dll')

const ReportGzip = require('./tools/gulp/gzip-size')	//eslint-disable-line

if ( !['production', 'test'].includes(process.env.NODE_ENV) ){
	process.env.NODE_ENV === "development" //eslint-disable-line
}

var WATCH = false
var DIST_MODE = process.env.DIST_MODE === "1"

const IS_PROD = process.env.NODE_ENV === 'production'				// eslint-disable-line
const IS_TEST = process.env.NODE_ENV === 'test'						// eslint-disable-line
const IS_DEV  = process.env.NODE_ENV === 'development'				// eslint-disable-line

process.env.BABEL_ENV = process.env.NODE_ENV
process.env.ENV = process.env.NODE_ENV

console.log(chalk.green(`Starting in ${process.env.NODE_ENV} mode.`))
if (DIST_MODE)
	console.log(chalk.yellow(`Building for distribution...`))

// Define Tasks
gulp.task('clean', require('./tools/gulp/clean'))
gulp.task('copy' , require('./tools/gulp/copy'))
gulp.task('generate-pages', require('./tools/gulp/generate-pages'))
// gulp.task('gzip:size' , ReportGzip)

gulp.task('gzip:size', cb => { cb() })

const appName = require('./package.json').name

var clientCompiler;
var serverCompiler;
const onBundleFinished = (cb, mode, runCount) => (err, stats)=> {
	if (err)
		console.error(err)
	console.log('Compiled ' + mode)
	console.log(stats.toString({colors: true, chunks: false, modules: false}))
	if (++runCount === 1)
		cb();
}

gulp.task('build:client', cb => {
	var runCount = 0;
	clientCompiler = webpack(webpackClientConfig)

	// WATCH
	// 	? clientCompiler.watch(750, onBundleFinished(cb, 'client', runCount))
	// 	: clientCompiler.run(onBundleFinished(cb, 'client', runCount))
	clientCompiler.run(onBundleFinished(cb, 'client', runCount))

	// https://github.com/webpack/webpack/issues/2320
	// Bug in webpack, causes multiple compilations
	var time_shift = 11000;	//11s
	clientCompiler.plugin('watch-run', (watching, cb)=> {
		watching.startTime += time_shift
		cb();
	})
	clientCompiler.plugin('done', (stats)=> {
		stats.startTime -= time_shift
	})

})

gulp.task('build:server', cb => {
	var runCount = 0;
	serverCompiler = webpack(webpackServerConfig)
	WATCH
		? serverCompiler.watch(750, onBundleFinished(cb, 'server', runCount))
		: serverCompiler.run(onBundleFinished(cb, 'server', runCount))
})

gulp.task('build:dll', cb => {
	var runCount = 0;
	var dllCompiler = webpack(webpackDLLConfig)
	dllCompiler.run(onBundleFinished(cb, 'dll', runCount))
})

var devServer;
gulp.task('sync:server', cb=> {
	devServer = new WebpackDevServer(clientCompiler, {
		publicPath: webpackClientConfig.output.publicPath,
		noInfo: true,
		stats: {colors: true, chunks: false, modules: false},
		index: '',
		compress: true,
		contentBase: false,
		hot: true,
		overlay: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		port:  Config.PROXY_PORT,
		host: '0.0.0.0',
		disableHostCheck: true,
		proxy: {
			'**': 'http://0.0.0.0:' + Config.NODE_PORT,
		},
		before: function(app){
			// app.use(errorOverlayMiddleware());
		}
	})
	devServer.listen(Config.PROXY_PORT, '0.0.0.0', err => {
		if (err)
			return console.log(err)
		console.log(chalk.cyan('Starting dev server...'))
	})
})


// Combine Tasks
gulp.task('build', cb => {
	run_seq('clean', ['copy', 'build:client'], 'build:server',  'gzip:size', cb)
})

gulp.task('dist', cb => {
	run_seq('clean', 'copy', 'build:client', 'build:server', 'generate-pages', cb)
})

gulp.task('dist-wb', cb=> {
	run_seq('clean', 'copy', 'build:client', 'build:server', 'generate-pages', cb)
})

gulp.task('dev', cb => {
	WATCH = true
	run_seq('clean', 'copy', 'build:dll', 'build:client', 'build:server', 'sync:server', cb)
})

// Default Task
gulp.task('default', ['dev'])


const exit = ()=> {
	browserSync && browserSync.exit();
	devServer && devServer.close();
	console.log(chalk.green('Stopped'))
	process.exit(0)
}

process.on('SIGINT' , exit)
process.on('SIGTERM', exit)
