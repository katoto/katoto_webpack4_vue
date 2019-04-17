require("./check-versions")()

var config = require("../config")

var opn = require("opn")
var path = require("path")
var express = require("express")
var webpack = require("webpack")
var webpackConfig = require("./webpack.dev.conf")

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// var proxyMiddleware = require('http-proxy-middleware')
// var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

// 进度
var readline = require("readline")
compiler.apply(new webpack.ProgressPlugin((percentage, msg) => {
    // 移动光标
    readline.clearLine(process.stdout)
    console.log("  " + (percentage * 100).toFixed(2) + "%", msg)
    readline.moveCursor(process.stdout, 0, -1)
}))

var devMiddleware = require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    serverSideRender: false,
    watchOptions: {
        ignored: "node_modules/**/*.js", // 忽略不用监听变更的目录
        aggregateTimeout: 1000, // 防止重复保存频繁重新编译,500毫秒内重复保存不打包
        poll: 1000 // 每秒询问的文件变更的次数
    },
    writeToDisk: false
})

var hotMiddleware = require("webpack-hot-middleware")(compiler, {
    log: () => {
    }
})

// handle fallback for HTML5 history API
app.use(require("connect-history-api-fallback")())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static("./static"))

var uri = "http://localhost:" + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log("> Starting dev server...")
devMiddleware.waitUntilValid(() => {
    console.log("> Listening at " + uri + "\n")
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== "testing") {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}

