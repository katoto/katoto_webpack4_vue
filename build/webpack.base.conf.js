var path = require("path")
var utils = require("./utils")
var multiPage = require("./multi-page")
const CopyWebpackPlugin = require("copy-webpack-plugin")
var config = require("../config")
var webpack = require("webpack")
const { VueLoaderPlugin } = require("vue-loader")

function resolve (dir) {
    return path.join(__dirname, "..", dir)
}

module.exports = {
    entry: multiPage.getEntryPages(),
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath: config.isBuild
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "@common": path.resolve(__dirname, "../src/common"),
            "@static": path.resolve(__dirname, "../static"),
            "@assets": path.resolve(__dirname, "../src/assets"),
            "@pages": path.resolve(__dirname, "../src/pages"),
            "@components": path.resolve(__dirname, "../src/components"),
            "@language": path.resolve(__dirname, "../src/language"),
            "@plugins": path.resolve(__dirname, "../src/plugins"),
            "@pack": path.resolve(__dirname, "../src/language/pack")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {}
            },
            {
                test: /\.js$/,
                include: [resolve("src"), resolve("test")],
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: [
                    // step-2
                    "babel-loader?cacheDirectory",
                    // step-1
                    "js-conditional-compile-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: utils.assetsPath("img/[name].[ext]")
                    }
                },{
                    loader: "image-webpack-loader",
                    options: {
                        pngquant: {
                            quality: "70-80",
                            speed: 1
                        }
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: utils.assetsPath("font/[name].[ext]")
                    }
                }]

            },
            {
                test: /\.(mp3)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 100,
                        name: utils.assetsPath("mp3/[name].[ext]")
                    }
                }]

            },
            {
                test: /\.(base64)(\?.*)?$/,
                use: [{
                    loader: path.resolve(__dirname, "../loader/file-loader")
                }]

            },
            {
                test: /\.html$/,
                use: ["html-withimg-loader"]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                ENV_CONFIG: JSON.stringify(process.env.ENV_CONFIG)
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../static"),
                to: config.dev.assetsSubDirectory,
                ignore: [".*"]
            }
        ])
    ],

    node: {
        setImmediate: false,
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    }
}
