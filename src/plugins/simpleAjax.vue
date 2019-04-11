<script>
//  simple ajax   return $http  $post $get  使用

const MyPlugin = {
}
let BASEURL = ""
if (process.env.NODE_ENV === "production") {
    BASEURL = window.location.protocol + `//149.129.138.180/api`
} else if (process.env.NODE_ENV === "test") {
    BASEURL = ""
} else if (process.env.NODE_ENV === "development") {
    BASEURL = "http://10.0.1.41:8001"
    // BASEURL = "http://149.129.138.180/api"  // xiaob
}

MyPlugin.install = function (Vue, config={
    commonParams:{
    }
}) {
    // 对象转get字符串
    let obj2str = function (data) {
        let dataStr = ""
        for (let key in data) {
            dataStr += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&"
        }
        return dataStr && dataStr.slice(0, -1)
    }
    let commonHandler = res => {
        res.status !== "100" && Vue.prototype.$toast({
            content: res.message
        })
        return res.status !== "100" ? Promise.reject(res) : res
    }
    let commonParams = config.commonParams

    window.$http = function (options) {
        let createXHR = function () {
            let xhr
            window.XMLHttpRequest ? xhr=new XMLHttpRequest() : xhr=new ActiveXObject("Microsoft.XMLHTTP")
            return xhr
        }
        return new Promise((resolve, reject) => {
            if (!options || typeof options !== "object") {
                reject(new Error("参数有误，只能传入对象"))
                return false
            }
            if (!options.url) {
                reject(new Error("url 不能留空"))
                return false
            }
            let type = options.type
            let url = options.url
            let data = options.data
            let dataType = options.dataType
            if (type == null) {type = "get"}
            if (data && Object.prototype.toString.call(data) === "[object Object]" && type === "get") {
                url = url + "?" + obj2str(data)
            }
            if (dataType == null) {dataType = "json"}
            let xhr = createXHR()
            xhr.open(type, url, true)
            if (type == "GET" || type == "get") {
                xhr.send(null)
            } else if (type == "POST" || type == "post") {
                if (options.contentType) {
                    xhr.setRequestHeader("Content-Type", options.contentType)
                    xhr.send(data)
                } else {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
                    xhr.send(obj2str(data))
                }
            }
            xhr.onreadystatechange = function () {
                let responseData = ""
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
                    console.warn("请求有误")
                    reject(xhr.status)
                }
            }
        })
    }
    Vue.prototype.$http = function () {
        return window.$http.apply(this, arguments)
    }
    Vue.prototype.$post = function (url = "", data = {
    }) {
        if (!url) {
            return new Error("url 参数有误")
        }
        url = `${BASEURL}${url}`
        return this.$http({
            url,
            type: "post",
            data: {
                ...commonParams,
                ...data
            }
        }).then(commonHandler)
    }
    Vue.prototype.$get = function (url = "", data = {
    }) {
        if (!url) {
            return new Error("option 参数有误")
        }
        data = {
            ...commonParams,
            ...data
        }
        url = `${BASEURL}${url}`
        url = url.indexOf("?") > -1 ? `${url}&${obj2str(data)}` : `${url}?${obj2str(data)}`
        return this.$http({
            type: "get",
            url
        }).then(commonHandler)
    }
}

export default MyPlugin
</script>

