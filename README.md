

## 升级node npm 的版本 
## 升级webpack 


# 2. 特性
## 基于webpack4构建
构建速度比之前版本明显加快。同时可优化了splitChunks参数，使目标文件总的下载体积减少。


## 多页面实现
两种方式，自动输出html页面文件（html-webpack-plugin实现）：   
* 在src/pages目录下添加任意js文件。js文件作为webpack入口；html页面模板是html.tpl.html，页面的文件名为js的文件名。
* 在src/pages目录下建立任意文件夹，包含entry.js、template.html两个文件。entry.js作为webpack入口；html页面模板是template.html，页面的文件名为建立的文件夹名。

## 源码映射
发布代码时生成源码映射文件到统一的文件夹，并在测试环境自动映射。生产环境为了代码安全，不进行自动映射，如需调试需手动映射源码。    
根据安全要求，这个文件夹名是只有开发者知道的文件夹名。或采用动态加密算法生成此文件夹名。或者将这些源码映射文件放到需要进行登录验证的网站目录下。    
这样既可在出现bug需要进行线上调试时，快速手动添加源码映射来方便调试，又可以很大程度避免了源码泄露。    

## 响应式布局
框架采用vw+rem方案，几行css实现响应式布局，简洁而高效。无需@media媒体查询，无需js动态调整样式。    
同时使用postcss-pxtorem插件自动将css中的单位由px转化为rem。pc和移动端通用（移动端最好将element-ui换为其他UI框架）。    
1rem = 100px，调试时换算方便。

# 3. 命令说明
## 本地开发
```
npm run dev
```
本地开发调试。使用config/serverMap.js中的dev配置的后端接口服务地址。

## 发布生产环境
```
npm run build
```
用于生产环境部署。使用config/serverMap.js中的prod配置的接口服务地址。


## 发布开发环境
```
npm run build-dev
```
用于发布部署到开发环境服务器，适用于需要发布到服务器才能调试的情形。使用config/serverMap.js中的dev配置的接口服务地址。
