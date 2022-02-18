const webpack = require('webpack')
const path = require('path')
const utils = require('./build/utils')
const config = require('./build/config')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const {
    entries,
    rewrites
} = utils.getMultiEntries('./src/pages')

utils.createApiConfigFile()

const prodConfig = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false,
                        drop_debugger: true
                    }
                }
            })
        ]
    },
    plugins: [
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css|html)$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.ProvidePlugin({
            introJs: ['intro.js'],
            comConfig: [path.resolve(path.join(__dirname, 'src/custom/assets/ts/config.ts')), 'default']
        })
    ],
    externals: {
        apiConfig: 'window.apiConfig'
    }
}

const devConfig = {
    plugins: [
        new webpack.ProvidePlugin({
            introJs: ['intro.js'],
            dict: [path.resolve(path.join(__dirname, 'src/custom/assets/ts/dict.ts')), 'default'],
            comConfig: [path.resolve(path.join(__dirname, 'src/custom/assets/ts/config.ts')), 'default']
        })
    ],
    externals: {
        apiConfig: 'window.apiConfig'
    }
}

let publicPath
let outputDir

if (process.env.NODE_ENV === 'production') {
    if (config.publicPath) {
        if (config.cosHost) {
            publicPath = `${config.cosHost}/${config.publicPath}/`
        } else {
            publicPath = `/${config.publicPath}/`
        }
        outputDir = `dist/${config.publicPath}`
    } else {
        publicPath = config.cosHost
        outputDir = 'dist'
    }
} else {
    if (config.publicPath) {
        publicPath = `/${config.publicPath}/`
        outputDir = `dist/${config.publicPath}`
    } else {
        publicPath = '/'
        outputDir = 'dist'
    }
}

module.exports = {
    assetsDir: 'static',
    publicPath,
    outputDir,
    pages: entries,
    configureWebpack: process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    transpileDependencies: true,
    chainWebpack: config => {
        // if active analyze
        if (process.env.ANALYZE) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer')
                    .BundleAnalyzerPlugin)
                .end()
        }
        // copy public file
        config
            .plugin('copy')
            .tap(options => {
                options[0].patterns[0].globOptions.ignore.push('basic.html')
                return options
            }).end()
        // alias
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.runtime.esm-bundler.js')
            .set('@', path.resolve('src'))
            .set('@csts', path.resolve('src/custom/assets/ts'))
            .set('@cocp', path.resolve('src/core/component'))
            .set('@costore', path.resolve('src/core/store'))
            .set('@csstore', path.resolve('src/custom/store'))
            .set('@coscss', path.resolve('src/core/assets/scss'))
            .set('@csscss', path.resolve('src/custom/assets/scss'))
            .set('@locale', path.resolve('src/custom/assets/ts/locale'))
            .set('@colocale', path.resolve('src/core/assets/ts/locale'))
            .end()
    },
    pwa: {
        iconPaths: {
            favicon32: 'static/pwa/icons/favicon-32x32.png',
            favicon16: 'static/pwa/icons/favicon-16x16.png',
            appleTouchIcon: 'static/pwa/icons/apple-touch-icon-152x152.png',
            maskIcon: 'static/pwa/icons/safari-pinned-tab.svg',
            msTileImage: 'static/pwa/icons/msapplication-icon-144x144.png'
        }
    },
    devServer: {
        proxy: {
        },
        historyApiFallback: {
            rewrites
        }
    }
}
