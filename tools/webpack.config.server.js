const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanStatsPlugin = require('./CleanStatsPlugin')
const PATHS = require('./paths')

const LOADERS = require('./gulp/loaders')

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_TEST = process.env.NODE_ENV === 'test'
const IS_DEV = process.env.NODE_ENV === 'development'

const envOption = (prod, dev, test) => {
    return IS_PROD ? prod : IS_TEST ? test : dev
}

// Initialize config
const config = {}

// Compile for node.js only mode
config.target = 'node'

config.mode = IS_PROD ? 'production' : 'development'

// Devtool
config.devtool = envOption(false, 'inline-source-map', false)

config.cache = IS_DEV

config.context = PATHS.SRC

// Entry
config.entry = [PATHS.SRC_SERVER + '/app.js']

// Output
config.output = {
    path: PATHS.BUILD,
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2',
    pathinfo: true,
    devtoolModuleFilenameTemplate: info => {
        return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }
}

// Resolve dependencies strategy
config.resolve = {
    modules: [
        'node_modules',
        PATHS.NODE_MODULES,
        PATHS.SRC_CLIENT,
        PATHS.SRC_SERVER
    ],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    plugins: [
        // Prevents importing files outside src
        new ModuleScopePlugin(PATHS.SRC_CLIENT)
    ]
}

config.externals = [nodeExternals()]

config.module = {
    strictExportPresence: true,
    rules: [
        LOADERS.ESLINT_LOADER(),
        LOADERS.FILE_LOADER(),
        LOADERS.URL_LOADER(),
        LOADERS.JS_LOADER(),
        // LOADERS.STYLUS_LOADER(true),
        LOADERS.SASS_LOADER(true),
        LOADERS.CSS_LOADER(true)
    ]
}

/////////////
// Plugins //
/////////////

config.plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        __DEV__: envOption(false, true, false),
        __TEST__: envOption(false, false, true),
        __SERVER__: true,
        'process.env.NODE_ENV': JSON.stringify(
            envOption('production', 'development', 'test')
        )
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
        filename: 'server.bundle.css'
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    new CleanStatsPlugin()
]

// Dev mode specific plugins
if (IS_DEV) {
    config.plugins.concat([
        new WatchMissingNodeModulesPlugin(PATHS.NODE_MODULES)
    ])
}

// Production specific plugins
if (IS_PROD) {
    config.plugins.concat([
        // add prod plugins here
    ])
}

////////////
// OTHERS //
////////////
config.node = {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
}
// Turn off performance hints during development because we don't do any
// splitting or minification in interest of speed. These warnings become
// cumbersome.
config.performance = {
    hints: envOption('warning', false, false)
}

module.exports = config
