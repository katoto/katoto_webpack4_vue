//遍历pages文件生成入口
const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')

var pageList = null;

function readPages() {
    if (!pageList) {
        const pagesPath = path.resolve('./src/pages');
        pageList = []
        fs.readdirSync(pagesPath).forEach(pageFile => {
            var fullPath = pagesPath + '/' + pageFile
            var isDir = fs.statSync(fullPath).isDirectory()
            if (!isDir) {
                if (pageFile.slice(-3) == '.js') {
                    var baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
                    pageList.push({
                        entry: fullPath,
                        chunkName: baseName,
                        template: 'html.tpl.html',
                    })
                }
            }
            else { //文件夹
                try {
                    pageList.push({
                        entry: fullPath + '/entry.js',
                        chunkName: path.basename(pageFile),
                        template: fullPath + '/template.html',
                    })
                }
                catch (e) {
                    console.error(fullPath + '/index.js not found.\n', e)
                }
            }
        })
    }
    return pageList;
}

exports.getEntryPages = function () {
    return readPages().reduce((r, page) => {
        r[page.chunkName] = page.entry;
        return r;
    }, {});
}

exports.htmlPlugins = function (webackConfig) {
    var exChunks = config.isBuild ? ['manifest', 'vendor'] : [];
    var list = readPages().map(page => {
        var options = {
            filename: page.chunkName + '.html',
            title: 'vue + webpack4 + element-ui脚手架项目',
            description: 'vue + webpack4 + element-ui脚手架项目',
            template: page.template,
            chunks: [...exChunks, page.chunkName],
            inject: true,
            minify: {
                collapseWhitespace: true,
            }
        }
        return new HtmlWebpackPlugin(options);
    });
    return list
}


