var path = require('path')
var utils = require('./utils')
var multiPage = require('./multi-page')
var config = require('../config')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: multiPage.getEntryPages(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.isBuild
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@common': path.resolve(__dirname, '../src/common'),
            '@static': path.resolve(__dirname, '../static'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@pages': path.resolve(__dirname, '../src/pages'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@language': path.resolve(__dirname, '../src/language'),
            '@pack': path.resolve(__dirname, '../src/language/pack'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test')],
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: [
                    //step-2
                    'babel-loader?cacheDirectory',
                    //step-1
                    'js-conditional-compile-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 60000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('font/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                ENV_CONFIG: JSON.stringify(process.env.ENV_CONFIG),
            }
        }),
    ],

    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
