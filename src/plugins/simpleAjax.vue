<script>
//  simple ajax   return $http  $post $get  使用
// eg 1、 let bb = await this.$get('http://api.coinslot.com/home/info?platform=pc&src=pc&lotid=1&timezone=8&ck=')
// eg 2、         
// this.$get({
//     url: 'http://api.coinslot.com/home/info?platform=pc&src=pc&lotid=1&timezone=8&ck='
// }).then((val)=>{
//     console.log(val)
// })
// this.$get('http://api.coinslot.com/home/info?platform=pc&src=pc&lotid=1&timezone=8&ck=').then((val)=>{
//     console.log(val)
// })
        
const MyPlugin = {}

MyPlugin.install = function(Vue){
    window.$http = function(options){
        // 对象转get字符串
        let obj2str = function(data){
            let dataStr = ''
            for(let key in data){
                dataStr += key + '=' + data[key] + '&';
            }
            return dataStr && dataStr.slice(0, -1)
        }
        let createXHR = function(){
            let xhr;
            window.XMLHttpRequest ? xhr=new XMLHttpRequest() : xhr=new ActiveXObject("Microsoft.XMLHTTP")
            return xhr
        }
        return new Promise((resolve, reject)=>{
            if(!options || typeof options !== 'object'){
                reject(new Error('参数有误，只能传入对象'))
                return false
            }
            if(!options.url){
                reject(new Error('url 不能留空'));
                return false 
            }
            
            let type = options.type;
            let url = options.url;
            let data = options.data;
            let dataType = options.dataType;
            if (type == null) type = "get";
            if (dataType == null) dataType = "json";
            let xhr = createXHR();
            xhr.open(type, url, true);
            if (type == "GET" || type == "get") {
                xhr.send(null);
            } else if (type == "POST" || type == "post") {
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr.send(data);
            }
            xhr.onreadystatechange = function () {
                let responseData = ''
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (dataType == "text" || dataType == "TEXT") {
                        responseData = xhr.responseXML
                    } else if (dataType == "xml" || dataType == "XML") {
                        responseData = xhr.responseText
                    } else if (dataType == "json" || dataType == "JSON") {
                        responseData = JSON.parse(xhr.responseText)
                    }
                    resolve(responseData)
                } else if (xhr.readyState == 4 && xhr.status != 200) {
                    console.warn('请求有误')
                    resolve(false)
                }
            };
        })
    }
    Vue.prototype.$http = function(){
        return window.$http.apply(this, arguments)
    }
    Vue.prototype.$post = function(options={}, data = ''){
        if(!options || typeof options !== 'object'){
            options = {
                url: options,
                data
            }
        }
        options.type = 'post'
        return this.$http(options)
    }
    Vue.prototype.$get = function(options={}){
        if(!options || typeof options !== 'object'){
            options = {
                url: options
            }
        }
        options.type = 'get'
        return this.$http(options)
    }
    
}

export default MyPlugin
</script>

