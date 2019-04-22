<script>
//  simple ajax   return $http  $post $get  使用

const MyPlugin = {
}
let BASEURL = ""
if (process.env.NODE_ENV === "production") {
    BASEURL = window.location.protocol + "//www.madcrickets.com/api"
} else if (process.env.NODE_ENV === "preRelease") {
    BASEURL = window.location.protocol + "//prewww.madcrickets.com/api"
} else if (process.env.NODE_ENV === "development") {
    // BASEURL = "http://10.0.1.41:8001"
    // BASEURL = "http://10.0.0.171:8001"
    // BASEURL = "http://149.129.138.180/api"
    // BASEURL = "https://www.madcrickets.com/api"
    BASEURL = "https://prewww.madcrickets.com/api"
}

MyPlugin.install = function (Vue, config={
    commonParams: {
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
    let errorHandler = err => {
        Vue.prototype.$toast({
            content: window._ ? window._("networkError") : "Network Error"
        })
        return Promise.reject(err)
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
            let type = (options.type || "GET").toUpperCase()
            let url = options.url
            let data = options.data || {}
            let dataType = (options.dataType || "JSON").toUpperCase()
            let xhr = createXHR()

            if (type === "GET") {
                url = url.indexOf("?") > -1 ? `${url}&${obj2str(data)}` : `${url}?${obj2str(data)}`
            }

            xhr.onreadystatechange = function () {
                let responseData = ""
                if (xhr.readyState === 4 && xhr.status == 200) {
                    if (dataType === "TEXT") {
                        responseData = xhr.responseXML
                    } else if (dataType === "XML") {
                        responseData = xhr.responseText
                    } else if (dataType === "JSON") {
                        responseData = JSON.parse(xhr.responseText)
                    }
                    resolve(responseData)
                } else if (xhr.readyState === 4 && xhr.status != 200) {
                    console.warn("请求有误")
                    reject(xhr.status)
                }
            }
            xhr.open(type, url, true)
            xhr.setRequestHeader("language", data.language || "en")
            xhr.setRequestHeader("Content-Type", options.contentType || "application/x-www-form-urlencoded;charset=UTF-8")
            if (type === "GET") {
                xhr.send(null)
            } else {
                xhr.send(options.contentType ? data : obj2str(data))
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
        return this.$http({
            url: `${BASEURL}${url}`,
            type: "post",
            data: {
                ...commonParams,
                ...data
            }
        }).catch(errorHandler).then(commonHandler)
    }
    Vue.prototype.$get = function (url = "", data = {
    }) {
        if (!url) {
            return new Error("url 参数有误")
        }
        return this.$http({
            type: "get",
            url: `${BASEURL}${url}`,
            data: {
                ...commonParams,
                ...data
            }
        }).catch(errorHandler).then(commonHandler)
    }
}

export default MyPlugin
</script>

