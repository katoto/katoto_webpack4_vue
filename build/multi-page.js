//遍历pages文件生成入口
const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')
var pageList = null;
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function readPages() {
    if (!pageList) {
        const pagesPath = path.resolve('./src/pages');
        pageList = []
        fs.readdirSync(pagesPath).forEach(pageFile => {
            var fullPath = pagesPath + '/' + pageFile
            var isDir = fs.statSync(fullPath).isDirectory()
            if (!isDir) {
                if (pageFile.slice(-3) === '.js') {
                    var baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
                    pageList.push({
                        entry: fullPath,
                        chunkName: baseName,
                        template: 'html.tpl.html',
                    })
                }
            }
            else { //文件夹
				let isTemplate = fs.existsSync(fullPath + '/template.html')
                let templateName = 'html.tpl.html'
				if (isTemplate) templateName = fullPath + '/template.html'
				try{
					let isSimple = fs.existsSync(fullPath + '/simple.config')
					if(isSimple){
						let simpleConfig = fs.readFileSync(fullPath + '/simple.config', 'utf-8')
						if(JSON.parse(simpleConfig).simple || JSON.parse(simpleConfig).simple === 'true'){
							pageList.push({
								entry: fullPath + '/main.html',
								chunkName: path.basename(pageFile),
                                template: templateName,
                                isSimple: true
							})
						}
					} else {
						pageList.push({
							entry: fullPath + '/index.js',
							chunkName: path.basename(pageFile),
                            template: templateName,
                            isSimple: false
						})
					}
				} catch (e) {
                    console.error(fullPath + ' not found at multi-page.\n', e)
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
        let chunks = []
        chunks = page.isSimple ? [page.chunkName] : [...exChunks, page.chunkName];
        var options = {
            chunks,
            filename: page.chunkName + '.html',
            title: 'vue + webpack4 + element-ui脚手架项目',
            description: 'vue + webpack4 + element-ui脚手架项目',
            template: page.template,
            favicon: resolve('icon.ico'),
            inject: true,
            minify: {
                collapseWhitespace: true,
            }
        }
        console.log(options)
        return new HtmlWebpackPlugin(options);
    });
    return list
}


