const merge = require("webpack-merge");
const common = require('./webpack.base.conf')
var utils = require('./utils')
var config = require('../config')
console.log(111111)

module.exports = merge(common, {
    mode: 'development',
    //开启调试
    devtool: "source-map",
    devServer: {
        //设置基本目录结构
        contentBase: "./dist",
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: "192.168.50.47",
        open: true,
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 7890
	},
	module:{
		rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: false})
	}
})
