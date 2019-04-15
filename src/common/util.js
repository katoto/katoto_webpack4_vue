/**
 *  客户端回调
 */
window.cbetLocalCallback = function (param) {
    if (param.func==="copyToPasteboard") {
        console.log("---------")
        if (param.result) {
            window.$toast({
                content: "copy success"
            })
        } else {
            window.$toast({
                content: "copy error"
            })
        }
    }
}

/**
 *  相关的工具函数
 */

export const appID = "781965488850377"

export const isIOS = (function () {
    let ua = navigator.userAgent
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return isiOS
})()
export const isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())

export function calSecond (second = 100) {
    second = Number(second)
    if (isNaN(second)) {return false}
    let daysRound = Math.floor(second / 60 / 60 /24)
    let hourRound = Math.floor( second/60/60 - (24*daysRound) )
    let minutesRound = Math.floor( second/60 - (24*60*daysRound) -(60 * hourRound) )
    return `${daysRound} d ${hourRound} h ${minutesRound} m`
}

// 原生交互
export function cbetLocal (param) {
    // 绑定APP事件则调用APP函数  响应IOS事件
    if (window && window.CbetLocal) {
        // 老版ios
        window.CbetLocal(param)
    } else if (typeof(window.webkit) != "undefined" && typeof(window.webkit.messageHandlers) != "undefined" && typeof(window.webkit.messageHandlers.CbetLocal) != "undefined") {
        // IOS-新版
        window.webkit.messageHandlers.CbetLocal.postMessage(param)
    }
    // 响应Android事件
    if (typeof(AndroidLogin) != "undefined" && AndroidLogin.CbetLocal) {
        AndroidLogin.CbetLocal(JSON.stringify(param))
    }
}

export let platform = (function () {
    let isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())
    return isMobile ? "mobile" : "pc"
})()
// 将手机号中间变成****
export function mdnHidden (mdn) {
    return mdn.replace(/(\d{3})\d{4}(\d+)/, "$1****$2")
}
// 检测是否为手机号码
export function isMdn (str) {
    return (str || "").match(/^1\d{10}$/)
}
export function checkCardNumber (rule, value, callback) {
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!value) {
        return callback()
    } else if (!(reg.test(value))) {
        return callback(new Error("请输入正确的公民身份证号"))
    } else {
        return callback()
    }
}
export function isValidEmail (value) {
    return /^[\w\.\-]*\w@[\w\.\-]+\.[\w\.\-]+$/.test(value)
}

export function wait (time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time)
    })
}

export function formatIndiaTime (time, language="en") {
    let getUSTIme = date => {
        var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"]
        var indiaArr = ["जनवरी", "फरवरी", " मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
        if (language === "en") {
            return `${monthArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        }
        return `${indiaArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    let startDate = new Date()
    startDate.setTime(Number(time) * 1000)
    return getUSTIme(startDate)
}

export function formatTime (time, format = "MM-dd HH:mm:ss") {
    time = Number(time)
    if (isNaN(time)) {return false}
    let t = new Date(+time * 1000)
    let tf = function (i) {
        return (i < 10 ? "0" : "") + i
    }
    let tfAMPM = function (i) {
        if (~format.indexOf("AMPM")) {
            i = i % 12
            i = i || 12
        }
        return (i < 10 ? "0" : "") + i
    }
    let amName = function (hour) {
        return hour >= 12 ? "PM" : "AM"
    }
    let getWeek = function (day) {
        let baseArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        return baseArr[day]
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss|AMPM|gmt|week/g, function (a) {
        switch (a) {
        case "yyyy":
            return tf(t.getFullYear())
        case "MM":
            return tf(t.getMonth() + 1)
        case "mm":
            return tf(t.getMinutes())
        case "dd":
            return tf(t.getDate())
        case "HH":
            return tfAMPM(t.getHours())
        case "ss":
            return tf(t.getSeconds())
        case "AMPM":
            return amName(t.getHours())
        case "week":
            return getWeek(t.getDay())
        case "gmt":
            let val = -(t.getTimezoneOffset() / 60)
            return val > 0 ? "GMT+" + val : "GMT" + val
        }
    })
}

export function formatMoney (s) {
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(0) + ""
    var l = s.split(".")[0].split("").reverse(),
        t = ""
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "")
    }
    return t.split("").reverse().join("")
}

export function formateBalance (val = 0) {
    val = Number(val)
    if (isNaN(val)) {return false}
    if (val >= 1000000) {
        return `${(val / 1000000).toFixed(2)}m`
    } else if (val > 1000) {
        return `${(val / 1000).toFixed(2)}k`
    }
    return val
}

export function formateEmail (email, isFull) {
    var regEmail = /(\w+(?:[-+.]\w+)*)(@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
    var regArr = null
    email = email.toString()
    if (regEmail.test(email)) {
        regArr = regEmail.exec(email)
        if (regArr[1] && regArr[1].length > 10) {
            email = regArr[1].slice(0, 4) + "**" + regArr[1].slice(-4) + regArr[2]
        }
        if (!isFull) {
            if (regArr[1] && regArr[1].length > 10) {
                email = regArr[1].slice(0, 4) + "**" + regArr[1].slice(-4) + regArr[2]
            }
            if (email.indexOf("@") > -1) {
                email = email.split("@")[0]
            }
        } else {
            /* tiger 要求显示更短 */
            if (regArr[1]) {
                if (regArr[1].length >= 2) {
                    email = regArr[1].slice(0, 2) + "**" + regArr[2]
                } else {
                    email = regArr[1] + "**" + regArr[2]
                }
            }
        }
        return email
    } else {
        return email
    }
}

export function getURLParams () {
    let string = window.location.search
    let obj = {
    }
    string.slice(1).split("&").map(item => {
        if (item !== "") {
            let arr = item.split("=")
            obj[arr[0]] = decodeURIComponent(arr[1])
        }
    })
    return obj
}

// 浮点数除法
export function accDiv (arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) { }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 浮点数乘法
export function accMul (arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
        m += s1.split(".")[1].length
    } catch (e) { }
    try {
        m += s2.split(".")[1].length
    } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

// 浮点数减法
export function accSub (arg1, arg2) {
    let r1
    let r2
    let m
    let n
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 浮点数加法
export function accAdd (arg1, arg2) {
    let r1
    let r2
    let m
    let c
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""))
            arg2 = Number(arg2.toString().replace(".", "")) * cm
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm
            arg2 = Number(arg2.toString().replace(".", ""))
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""))
        arg2 = Number(arg2.toString().replace(".", ""))
    }
    return (arg1 + arg2) / m
}

export function mobileCheck () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {check = true}
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
}

export function md5 (md5str) {
    var createMD5String = function (string) {
        var x = Array()
        var k, AA, BB, CC, DD, a, b, c, d
        var S11 = 7
        var S12 = 12
        var S13 = 17
        var S14 = 22
        var S21 = 5
        var S22 = 9
        var S23 = 14
        var S24 = 20
        var S31 = 4
        var S32 = 11
        var S33 = 16
        var S34 = 23
        var S41 = 6
        var S42 = 10
        var S43 = 15
        var S44 = 21
        string = uTF8Encode(string)
        x = convertToWordArray(string)
        a = 0x67452301
        b = 0xEFCDAB89
        c = 0x98BADCFE
        d = 0x10325476
        for (k = 0; k < x.length; k += 16) {
            AA = a
            BB = b
            CC = c
            DD = d
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
            a = addUnsigned(a, AA)
            b = addUnsigned(b, BB)
            c = addUnsigned(c, CC)
            d = addUnsigned(d, DD)
        }
        var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
        return tempValue.toLowerCase()
    }
    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }
    var addUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult
        lX8 = (lX & 0x80000000)
        lY8 = (lY & 0x80000000)
        lX4 = (lX & 0x40000000)
        lY4 = (lY & 0x40000000)
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
        if (lX4 & lY4) {return (lResult ^ 0x80000000 ^ lX8 ^ lY8)}
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)}
            else {return (lResult ^ 0x40000000 ^ lX8 ^ lY8)}
        } else {
            return (lResult ^ lX8 ^ lY8)
        }
    }
    var F = function (x, y, z) {
        return (x & y) | ((~x) & z)
    }
    var G = function (x, y, z) {
        return (x & z) | (y & (~z))
    }
    var H = function (x, y, z) {
        return (x ^ y ^ z)
    }
    var I = function (x, y, z) {
        return (y ^ (x | (~z)))
    }
    var FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var convertToWordArray = function (string) {
        var lWordCount
        var lMessageLength = string.length
        var lNumberOfWordsTempOne = lMessageLength + 8
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16
        var lWordArray = Array(lNumberOfWords - 1)
        var lBytePosition = 0
        var lByteCount = 0
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4
            lBytePosition = (lByteCount % 4) * 8
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
            lByteCount++
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
        return lWordArray
    }
    var wordToHex = function (lValue) {
        var WordToHexValue = ""
        var WordToHexValueTemp = ""
        var lByte; var lCount
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255
            WordToHexValueTemp = "0" + lByte.toString(16)
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
        }
        return WordToHexValue
    }
    var uTF8Encode = function (string) {
        string = string.toString().replace(/\x0d\x0a/g, "\x0a")
        var output = ""
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n)
            if (c < 128) {
                output += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192)
                output += String.fromCharCode((c & 63) | 128)
            } else {
                output += String.fromCharCode((c >> 12) | 224)
                output += String.fromCharCode(((c >> 6) & 63) | 128)
                output += String.fromCharCode((c & 63) | 128)
            }
        }
        return output
    }
    return createMD5String(md5str)
}

export const cookie = {
    // 不设置expires等于关闭浏览器失效
    set (name, value, expired) {
        if (!isNaN(Number(expired))) {
            let date = new Date()
            date.setDate(Number(expired))
            document.cookie = `${name}=${value}; expires=${date.toGMTString()}`
        } else if (typeof expired === "string") {
            document.cookie = `${name}=${value}; expires=${expired}`
        } else if (expired && expired.__proto__ === Date.prototype) {
            document.cookie = `${name}=${value}; expires=${expired.toGMTString()}`
        } else {
            document.cookie = `${name}=${value}`
        }

    },
    get (name) {
        return (this.getAll())[name] || null
    },
    getAll () {
        let cookiesArr = document.cookie.split(";")
        let cookies = {
        }
        cookiesArr.map(item => {
            if (item) {
                let tmp = item.split("=")
                cookies[tmp[0].trim()] = tmp[1]
            }
        })
        return cookies
    },
    remove (name) {
        this.set(name, "", "Thu, 01 Jan 1970 00:00:00 GMT")
    }
}

export function copy (string) {
    cbetLocal({
        func: "copyToPasteboard",
        params: {
            content: string
        }
    })
}

export function copySucc () {
    console.log("Copied to clipboard")
}

export function copyError () {
    console.log("Failed to copy, please retry")
}

// 预加载图片
export function preloadImage (names, cb, prefix) {
    window.gkaCache = window.gkaCache || []
    var n = 0, img, imgs = {
    }
    names.forEach(function (name) {
        img = new Image()
        window.gkaCache.push(img)
        img.onload = (function (name, img) {
            return function () {
                imgs[name] = img;
                (++n === names.length) && cb && cb(imgs)
            }
        })(name, img)
        img.src = (prefix || "") + name
    })
}
