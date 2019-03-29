/**
 *  相关的工具函数
 */
import {
    Message,
    Notification
} from 'element-ui'
import coinslotConfig from '~static/config'
// import { isDev } from '~common/ajax'
export const config = coinslotConfig
export const tipsTime = 2000
export const ethUrl = 'https://etherscan.io/'
export const channel = 2000 // 暂时就sign 注册用到
//  社区地址 online
export const coinAffAddr = '0x180A14aF38384dc15Ce96cbcabCfC8F47794AC3E'

/**
 *  相关的工具函数
 */
export function mapActions (acts, ns) {
    const aTypes = {}
    const actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {
        actions,
        aTypes
    }
}
export const isIOS = (function () {
    let ua = navigator.userAgent
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return isiOS
})()

export let platform = (function () {
    let isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())
    return isMobile ? 'mobile' : 'pc'
})()

export let src = (function () {
    let isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())
    return isMobile ? 'mobile' : 'pc'
})()

export function screenWidthFn () {
    let currWidth = document.body.offsetWidth
    if (currWidth) {
        return currWidth >= 1200 ? 'lg' : 'xs'
    }
}
//  <action> eventName是在 Google Analytics（分析）事件报告中显示为事件操作的字符串。 <category> eventCategory 是显示为事件类别的字符串。 <label> eventLabel 是显示为事件标签的字符串。
export function viewEvent (eventName, eventCategory, eventLabel) {
    let eventPage = function () {
        try {
            window.gtag('event', eventName, {
                'event_category': eventCategory,
                'event_label': eventLabel,
                'value': 1
            })
        } catch (e) {
            setTimeout(() => {
                eventPage()
            }, 5000)
        }
    }
    eventPage()
}

export function isForbitPage () {
    // 无需要刷接口 (禁止请求页面接口、websocket)
    let forbitName = ['/supercoin']
    let isForbit = false
    for (let i = 0, len = forbitName.length; i < len; i++) {
        if (window.location.href.indexOf(forbitName[i]) > -1) {
            isForbit = true
            break
        }
    }
    return isForbit
}

export function mapMutations (muts, ns) {
    const mTypes = {}
    const mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {
        mutations,
        mTypes
    }
}

export function wait (time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time)
    })
}

export const isWeiX = (function () {
    let ua = navigator.userAgent.toLowerCase()
    return ~ua.indexOf('micromessenger')
})()

const CK = 'block_ck'
export const isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())

export function getCK () {
    return localStorage.getItem(CK)
}

export function setCK (ck) {
    return localStorage.setItem(CK, ck)
}

export function removeCK () {
    return localStorage.setItem(CK, '')
}

export function isLog () {
    return !((getCK() === '0' || !getCK() || getCK() === 'null' || getCK() === ''))
}

export function formateJackPot (money, poolAmount, poolRatio, betLimit, cointype) {
    money = parseFloat(money)
    if (!poolAmount) {
        console.error('poolAmount error at formateJackPot')
        return 0
    }
    if (!poolRatio) {
        console.error('poolRatio error at formateJackPot')
        return 0
    }
    if (!betLimit) {
        console.error('betLimit error at formateJackPot')
        return 0
    }
    if (!cointype) {
        console.error('cointype error at formateJackPot')
        return 0
    }
    if (cointype === '2000') {
        return parseFloat((parseFloat(poolAmount[cointype]) * 0.1).toFixed(5))
    }
    let currSplitVal = 0
    if (betLimit && betLimit[cointype] && poolRatio) {
        currSplitVal = parseFloat(betLimit[cointype].max_limit) * (parseFloat(poolRatio.percent))
    }
    if (currSplitVal && poolRatio && poolRatio.ratio) {
        if (money < currSplitVal) {
            return parseFloat((parseFloat(poolAmount[cointype]) * parseFloat(poolRatio.ratio[0])).toFixed(5))
        } else if (money >= currSplitVal && money < parseFloat(betLimit[cointype].max_limit)) {
            return parseFloat((parseFloat(poolAmount[cointype]) * parseFloat(poolRatio.ratio[1])).toFixed(5))
        } else {
            return parseFloat((parseFloat(poolAmount[cointype]) * parseFloat(poolRatio.ratio[2])).toFixed(5))
        }
    }
    return 0
}

/*
 *   format_match  玩法选择
 * */
export function formatMatchAccount (match) {
    if (isNaN(match)) {
        return ''
    }
    match = match.toString()
    switch (match) {
    case '1101':
        return _('Lucky 11/P1')
    case '1102':
        return _('Lucky 11/P2')
    case '1103':
        return _('Lucky 11/P3')
    case '1104':
        return _('Lucky 11/P4')
    case '1105':
        return _('Lucky 11/P5')
    case '11051':
        return _('Super 5')
    }
}

export function formateOdd (val) {
    // 赔率格式化
    val = parseFloat(val)
    if (isNaN(val)) {
        console.error(val)
        return 0
    }
    if (val < 1.1) {
        val = parseFloat(val.toFixed(4))
    } else if (val >= 1.1) {
        val = val.toFixed(2)
    } else if (val >= 10) {
        val = val.toFixed(1)
    } else if (val >= 100) val = val.toFixed(0)
    return val
}
/*
 *   formateMatchTime  比赛列表日期  星期是不变的
 * */
export function formateMatchTime (time, language = 'en', format = 'enWeek　　enMon. dd') {
    let weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let monArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] // 1-12
    if (isNaN(time)) return false
    let t = new Date(+time * 1000)
    let tf = function (i) {
        return (i < 10 ? '0' : '') + i
    }
    if (language !== 'en') {
        return formatTime(time, 'MM月dd日 week')
    }
    let getenWeek = function (day) {
        return weekArr[day]
    }
    let getenMon = function (day) {
        return monArr[day]
    }
    return format.replace(/MM|dd|mm|enWeek|enMon/g, function (a) {
        switch (a) {
        case 'MM':
            return tf(t.getMonth() + 1)
        case 'mm':
            return tf(t.getMinutes())
        case 'dd':
            return tf(t.getDate())
        case 'enWeek':
            return getenWeek(t.getDay())
        case 'enMon':
            return getenMon(t.getMonth())
        }
    })
}

export function formatUSTime (time) {
    let getUSTIme = date => {
        var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec']
        return `${monthArr[date.getMonth()]}, ${date.getDate()} ${date.getFullYear()}`
    }
    let startDate = new Date()
    startDate.setTime(Number(time) * 1000)
    return getUSTIme(startDate)
}

export function formatTime (time, format = 'MM-dd HH:mm:ss') {
    time = Number(time)
    if (isNaN(time)) return false
    let t = new Date(+time * 1000)
    let tf = function (i) {
        return (i < 10 ? '0' : '') + i
    }
    let tfAMPM = function (i) {
        if (~format.indexOf('AMPM')) {
            i = i % 12
            i = i || 12
        }
        return (i < 10 ? '0' : '') + i
    }
    let amName = function (hour) {
        return hour >= 12 ? 'PM' : 'AM'
    }
    let getWeek = function (day) {
        let baseArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        return baseArr[day]
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss|AMPM|gmt|week/g, function (a) {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear())
        case 'MM':
            return tf(t.getMonth() + 1)
        case 'mm':
            return tf(t.getMinutes())
        case 'dd':
            return tf(t.getDate())
        case 'HH':
            return tfAMPM(t.getHours())
        case 'ss':
            return tf(t.getSeconds())
        case 'AMPM':
            return amName(t.getHours())
        case 'week':
            return getWeek(t.getDay())
        case 'gmt':
            let val = -(t.getTimezoneOffset() / 60)
            return val > 0 ? 'GMT+' + val : 'GMT' + val
        }
    })
}

/*
 *   format_match  玩法选择
 * */
export function formatMatch (match) {
    if (isNaN(match)) return ''
    match = match.toString()
    switch (match) {
    case '1101':
        return _('P1')
    case '1102':
        return _('P2')
    case '1103':
        return _('P3')
    case '1104':
        return _('P4')
    case '1105':
        return _('P5')
    default:
        return _('Super 5')
    }
}

export function formateBalance (val = 0, bit = 6) {
    let num = Number(val)
    if (num >= 100000) {
        return num
    }
    num = num.toFixed(9).substr(0, num > 0 ? bit + 1 : bit + 2)
    if (num.charAt(num.length - 1) === '.') {
        return num.substr(0, num.length - 1)
    }
    return num
}
window._formateBalance = formateBalance

export function formateSlotBalance (val = 0) {
    return this.formateBalance(val)
}

/*
 *   金币类型
 * */
export function formateCoinType (type = '2001') {
    if (!type) {
        console.error('formateCoinType type error')
        return false
    }
    type = type.toString()
    switch (type) {
    case '2001':
        return 'ETH'
    case '1001':
        return 'BTC'
    case '2000':
        return 'CC'
    default:
        return 'ETH'
    }
}

export function formateCoinAddr (addr) {
    addr = addr.toString()
    return addr.slice(0, 4) + '***' + addr.slice(-4)
}

export function formateEmail (email, isFull) {
    var regEmail = /(\w+(?:[-+.]\w+)*)(@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
    var regArr = null
    email = email.toString()
    if (regEmail.test(email)) {
        regArr = regEmail.exec(email)
        if (regArr[1] && regArr[1].length > 10) {
            email = regArr[1].slice(0, 4) + '**' + regArr[1].slice(-4) + regArr[2]
        }
        if (!isFull) {
            if (regArr[1] && regArr[1].length > 10) {
                email = regArr[1].slice(0, 4) + '**' + regArr[1].slice(-4) + regArr[2]
            }
            if (email.indexOf('@') > -1) {
                email = email.split('@')[0]
            }
        } else {
            /* tiger 要求显示更短 */
            if (regArr[1]) {
                if (regArr[1].length >= 2) {
                    email = regArr[1].slice(0, 2) + '**' + regArr[2]
                } else {
                    email = regArr[1] + '**' + regArr[2]
                }
            }
        }
        return email
    } else {
        return email
    }
}

/*
 *   formate_moneyFlow  格式化 流水类型
 *   // 明细状态 1：recharge   2：bet    3：prize    4:withdraw
 * */
export function formateMoneyFlow (flowtype, lotid, gameType = 'newSlot') {
    if (isNaN(flowtype)) {
        console.error('formate_moneyFlow error' + flowtype)
        return false
    }
    flowtype = flowtype.toString()
    switch (flowtype) {
    case '1':
        if (lotid === '1') {
            return _('Lucky11 Bet')
        } else if (lotid === '2') {
            return _('LuckyCoin Bet')
        }
        return _('Bet') // 投注消费
    case '2':
        if (lotid === '1') {
            return _('Lucky11 Prize')
        } else if (lotid === '2') {
            return _('LuckyCoin Prize')
        }
        return _('Prize') // 投注中奖
    case '3':
        return _('Bet Refund') // 投注退款
    case '4':
        return _('Withdrawal') // 提款扣除
    case '5':
        return _('fee') // 提款手续费
    case '6':
        return _('Withdrawal Refund') // 提款失败退款
    case '7':
        return _('fee refund') // 提款失败手续退款
    case '8':
        return _('Top-up') // 充值
    case '9':
        return _('Top-up Refund') // 充值失败扣款
    case '10':
        return _('Registration') // 注册送
    case '11':
        return _('Inviting') // 邀请送
    case '12':
        return _('World cup') // 世界杯
    case '13':
        return _('World cup') // 世界杯中奖
    case '14':
        return _('LuckySlot Bet') // 老虎机投注
    case '15':
        return _('LuckySlot Prize') // 老虎机中奖
    case '16':
    case '17':
    case '18':
        return _('Bonus') // 每日送1CC
    case '19':
        return _('Top-Up Bonus') // 首充送
    case '20':
        return _('LuckyPoker Bet') // 幸运扑克投注
    case '21':
        return _('LuckyPoker Prize') // 幸运扑克中奖
    case '22':
        return _('Promo-Halloween') // 万圣节活动送
    case '23':
        return _('Conversion') // 转换
    case '24':
        return _('Top-up') // 充值
    case '25':
        return _('Alliance') // 联盟注册
    case '30':
        return _('Sport Bet') // tcm 体育投注
    case '31':
        return _('Sport Prize') // tcm 体育中奖
    case '32':
        return _('Sport refund') // tcm 体育退款
    case '101':
        return _('{0} Bet', gameType) // 游戏 + 投注
    case '102':
        return _('{0} Prize', gameType) // 游戏 + 中奖
    case '103':
        return _('bet rollback') // 投注回滚
    case '104':
        return _('prize rollback') // 中奖回滚
    case '26':
        return this.$lang.promotion.a47
    case '27':
        return this.$lang.promotion.a48
    case '28':
        return this.$lang.promotion.a49
    case '29':
        return this.$lang.promotion.a50
    case '33':
        return this.$lang.promotion.a55
    case '34':
        return this.$lang.promotion.a56
    default:
        return _('Bet')
    }
}

/*
 *  11个数中 随机 选出 len 个
 *  @params  len
 *  shuffle()  洗牌算法
 * */
export function randomNumber (len) {
    var shuffleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    len = Number(len)
    if (isNaN(len)) {
        return false
    }
    if (!len) len = 5
    return shuffle(shuffleArr).slice(0, len)

    function shuffle (arr) {
        var len = arr.length
        for (var i = 0; i < len - 1; i++) {
            var idx = Math.floor(Math.random() * (len - i))
            var temp = arr[idx]
            arr[idx] = arr[len - i - 1]
            arr[len - i - 1] = temp
        }
        return arr
    }
}

export function commonErrorHandler (data) {
    let status = data.status
    switch (status) {
    case '214':
        removeCK()
        break
    default:
        Message({
            message: data.message,
            type: 'error',
            duration: tipsTime
        })
        break
    }
}

export function copySucc () {
    Message({
        message: _('Copied to clipboard'),
        type: 'success',
        duration: tipsTime
    })
}

export function copyError () {
    Message({
        message: _('Failed to copy, please retry'),
        type: 'error',
        duration: tipsTime
    })
}

/* float 浮点精度问题  0.001 * 9 */
export function formatFloat (f, digit = 5) {
    f = parseFloat(f)
    let m = Math.pow(10, digit)
    return Math.round(f * m, 10) / m
}

export function getURLParams () {
    let string = window.location.search
    let obj = {}
    string.slice(1).split('&').map(item => {
        if (item !== '') {
            let arr = item.split('=')
            obj[arr[0]] = arr[1]
        }
    })
    return obj
}

export function numberComma (source, length = 3) {
    source = String(source).split('.')
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
    return source.join('.')
}

export function getLocalStorageLanguage () {
    return localStorage.getItem('language')
}

export function setLocalStorageLanguage (lang) {
    localStorage.setItem('language', lang)
}

export function getDefaultLanguage () {
    let localStorageLanguage = localStorage.getItem('language')
    if (localStorageLanguage) {
        return localStorageLanguage
    }
    return 'en'
}

// 浮点数除法
export function accDiv (arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
        t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
        t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 浮点数乘法
export function accMul (arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {}
    try {
        m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 浮点数减法
export function accSub (arg1, arg2) {
    let r1
    let r2
    let m
    let n
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
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
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''))
            arg2 = Number(arg2.toString().replace('.', '')) * cm
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm
            arg2 = Number(arg2.toString().replace('.', ''))
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', ''))
    }
    return (arg1 + arg2) / m
}

export function defaultLanguage () {
    return getURLParams().language || getDefaultLanguage() || 'en'
}

export function mobileCheck () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
};

export function formatNum (num, bit = 5) {
    return accDiv(Math.floor(accMul(Number(num), Math.pow(10, bit))), Math.pow(10, bit))
}

export function formatUSD (price, num) {
    price = Number(price)
    num = Number(num)
    var total = accMul(price, num)
    return numberComma(formatNum(total, 1))
}

export function getElementAbsolutePosition (element, parentElement = window.document) {
    var parent = element.offsetParent
    let left = element.offsetLeft
    let top = element.offsetTop
    while (parent !== null && parentElement !== parent) {
        left = accAdd(left, parent.offsetLeft)
        top = accAdd(top, parent.offsetTop)
        parent = parent.offsetParent
    }
    return {
        left,
        top
    }
}

export function getElementCenterPosition (element, offset) {
    let relativePosition = offset
    return {
        left: accAdd(relativePosition.left, accDiv(element.offsetWidth, 2)),
        top: accAdd(relativePosition.top, accDiv(element.offsetHeight, 2))
    }
}

export function structDom (msg = 'home') {
    let createSci = null
    let baseDes = null
    if (!document.getElementById('js_struct')) {
        createSci = document.createElement('script')
        baseDes = null
        createSci.setAttribute('type', 'application/ld+json')
        createSci.setAttribute('id', 'js_struct')
    } else {
        createSci = document.getElementById('js_struct')
    }
    if (msg === 'home') {
        createSci.innerHTML = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.coinslot.com/",   
          "name": "${_('Coinslot-the fair game platform for casino games,based on blockchain technology')}",
          "image": "http://www.coinslot.com/images/sprize/coinslotLogo.png",
          "description": "${_('Coinslot is a blockchain-based gaming platform with openness, transparency and checkable smart contracts. Players can get rewards from games. Bitcoin and Ethereum are supported by various games including high frequency Ether games, lotteries, poker games and bid games.')}",
          "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinslot.com/lucky11/",
                  "name": "${_('Lucky11')}", 
                  "image": "http://www.coinslot.com/images/sprize/logo-115.png" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinslot.com/luckyslot/",
                  "name": "${_('luckySlot')}",
                  "image": "http://www.coinslot.com/images/sprize/logo-slot.png"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinslot.com/luckycoin/",
                  "name": "${_('LuckyCoin')}",
                  "image": "http://www.coinslot.com/images/sprize/logo-luckyCoin.png"
                }
            }
          ]
        }`
    } else {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.coinslot.com/",   
          "name": "${_('{0} Draw Result|Information|Announcements|Records -- Coinslot', msg)}",
          "image": "http://www.coinslot.com/images/sprize/coinslotLogo.png",
          "description": "${_('{0}, released by Coinslot, is a high frequency Ether game based on blockchain. Draw result, draw details, announcements and draw history of {0} can be checked on this page.', msg)}",
          `
    }
    if (msg === 'lucky11') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinslot.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinslot.com/drawNumber",
                  "name": "${_('Draw Number')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinslot.com/lucky11",
                  "name": "${_('Recent Wins')}",
                  "image": ""
                }
            }
          ]
        }`
    }
    if (msg === 'luckycoin') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinslot.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinslot.com/luckycoin/drawHistory",
                  "name": "${_('Draw History')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinslot.com/luckycoin",
                  "name": "${_('Win Instant Reward')}",
                  "image": ""
                }
            }
          ]
        }`
    }
    if (msg === 'slot') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinslot.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinslot.com/luckyslot",
                  "name": "${_('Recent')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinslot.com/luckyslot",
                  "name": "${_('LuckySlot')}",
                  "image": ""
                }
            }
          ]
        }`
    }
    if (msg === 'football') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinslot.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinslot.com/football",
                  "name": "${_('Bet Slip')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinslot.com/football",
                  "name": "${_('History')}",
                  "image": ""
                }
            }
          ]
        }`
    }
    if (msg === 'luckypoker') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinslot.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinslot.com/luckypoker",
                  "name": "${_('Recent Bets')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinslot.com/luckypoker",
                  "name": "${_('Draw History')}",
                  "image": ""
                }
            }
          ]
        }`
    }
    if (!document.getElementById('js_struct')) {
        document.body.appendChild(createSci)
    }
}

/*
 *      字节长度
 *      @return 字节长度
 * */
export function getByteLen (str) {
    if (!str) return 0
    if (typeof str !== 'string') {
        str += ''
    }
    return str.replace(/[^\x00-\xff]/g, '01').length
}

/*
 *      切割字节长度字符
 *      @return 字节长度
 * */
export function cutStr (str, len) {
    let result = ''
    let strlen = str.length // 字符串长度
    let chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度
    if (chrlen <= len) {
        return str
    }
    for (var i = 0, j = 0; i < strlen; i++) {
        var chr = str.charAt(i)
        if (/[\x00-\xff]/.test(chr)) {
            j++ // ascii码为0-255，一个字符就是一个字节的长度
        } else {
            j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if (j <= len) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
            result += chr
        } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
            return result
        }
    }
}

export function getCCAcount (userInfo) {
    if (userInfo && userInfo.accounts && userInfo.accounts.length >= 1) {
        let accounts = this.userInfo.accounts
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index].cointype === '2000') {
                return Number(accounts[index].balance)
            }
        }
    }
    return 0
}

export function getCCDeductionMoney (total, rate) {
    let value = Number(total)
    if (value && !isNaN(value) && value > 0) {
        if (value < 0.0001) {
            return accMul(value, rate).toFixed(18).replace(/\.?0+$/, '')
        } else {
            return formatNum(accMul(value, rate), 18).toString().replace(/\.?0+$/, '')
        }
    }
    return '0'
}

/*
 *   正则 加入a
 * */
String.prototype.httpParse = function () {
    let htmlDecode = (html) => {
        var temp = document.createElement('div')
        if (typeof html !== 'String') {
            html.toString()
        }
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html)
        var output = temp.innerHTML
        temp = null
        output = output.replace(/\n|\r/g, '</br>')
        if (output.indexOf('@') > -1) {
            output = '<i class="replay">' + output.slice(0, output.indexOf('-----')) + '</i>' + output.slice(output.indexOf('-----'))
        }
        return output
    }
    var reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g
    return htmlDecode(this).replace(reg, (a) => {
        if (!a.indexOf('http')) {
            return `<a class="link" href="${a}" target="_blank">${a}</a>`
        }
        return `${a}`
        // else {
        //     return `<a class="link" href="http://${a}" target="_blank">${a}</a>`
        // }
    })
}

export function getTimeZone () {
    let val = -(new Date().getTimezoneOffset() / 60)
    // > 0 ? 'GMT+' + val : 'GMT' + val
    return val
}

export function selfNotify (val, typeVal = 'success') {
    Notification({
        dangerouslyUseHTMLString: true,
        type: typeVal,
        message: _(val),
        position: 'bottom-right',
        duration: 5000
    })
}

export function offset (element) {
    var offest = {
        top: 0,
        left: 0
    }
    var _position
    getOffset(element, true)
    return offest
    // 递归获取 offset, 可以考虑使用 getBoundingClientRect
    function getOffset (node, init) {
        // 非Element 终止递归
        if (node.nodeType !== 1) {
            return
        }
        _position = window.getComputedStyle(node)['position']
        // position=static: 继续递归父节点
        if (typeof (init) === 'undefined' && _position === 'static') {
            getOffset(node.parentNode)
            return
        }
        offest.top = node.offsetTop + offest.top - node.scrollTop
        offest.left = node.offsetLeft + offest.left - node.scrollLeft
        // position = fixed: 获取值后退出递归
        if (_position === 'fixed') {
            return
        }
        getOffset(node.parentNode)
    }
}

export function formateSel110 (sel) {
    switch (sel) {
    case '110511':
        return '-0.5'
    case '130511':
        return '+0.5'
    case '210511':
        return '-1.5'
    case '230511':
        return '+1.5'
    case '310511':
        return '-2.5'
    case '330511':
        return '+2.5'
    case '410511':
        return '-3.5'
    case '430511':
        return '+3.5'
    case '510511':
        return '-4.5'
    case '530511':
        return '+4.5'
    case '610511':
        return '-5.5'
    case '630511':
        return '+5.5'
    case '710511':
        return '-6.5'
    case '730511':
        return '+6.5'
        // 客队
    case '110513':
        return '+0.5'
    case '130513':
        return '-0.5'
    case '210513':
        return '+1.5'
    case '230513':
        return '-1.5'
    case '310513':
        return '+2.5'
    case '330513':
        return '-2.5'
    case '410513':
        return '+3.5'
    case '430513':
        return '-3.5'
    case '510513':
        return '+4.5'
    case '530513':
        return '-4.5'
    case '610513':
        return '+5.5'
    case '630513':
        return '-5.5'
    case '710513':
        return '+6.5'
    case '730513':
        return '-6.5'
    }
}

export function getTopupTitle (topupHint, cointype) {
    let promotion = this.$lang.promotion
    let title = {
        weekly_topup_bonus: {
            '1001': promotion.a40,
            '2001': promotion.a41,
            '2000': promotion.a42
        },
        first_topup_bonus: {
            '1001': promotion.a31,
            '2001': promotion.a32,
            '2000': promotion.a33
        },
        second_topup_bonus: {
            '1001': promotion.a34,
            '2001': promotion.a35,
            '2000': promotion.a36
        },
        third_topup_bonus: {
            '1001': promotion.a37,
            '2001': promotion.a38,
            '2000': promotion.a39
        }
    }
    if (title[topupHint.activity] && title[topupHint.activity][cointype]) {
        return _(title[topupHint.activity][cointype], parseInt(topupHint.ratio * 100))
    }
    return ''
}

export function getUTMSource () {
    let urlParams = getURLParams()
    if (urlParams && urlParams.affiliate) {
        return urlParams.affiliate
    }
    return (localStorage.getItem('affiliate') || '')
}

export function getChannel () {
    let urlParams = getURLParams()
    if (urlParams && urlParams.utm_source) {
        let channel = urlParams.utm_medium ? `${urlParams.utm_source}_${urlParams.utm_medium}` : urlParams.utm_source
        return channel
    }
    return localStorage.getItem('channel', channel) || ''
}

export function md5 (md5str) {
    var createMD5String = function (string) {
        var x = Array()
        var k, AA, BB, CC, DD, a, b, c, d
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21
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
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
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
        var WordToHexValue = '',
            WordToHexValueTemp = '',
            lByte, lCount
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255
            WordToHexValueTemp = '0' + lByte.toString(16)
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
        }
        return WordToHexValue
    }
    var uTF8Encode = function (string) {
        string = string.toString().replace(/\x0d\x0a/g, '\x0a')
        var output = ''
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

// 移动端 开发环境 引入vconsole
let comsoleImport = () =>
    import('~plugins/vconsole')
if (platform !== 'pc' && process && process.env && process.env.NODE_ENV === 'development') {
    comsoleImport()
        .then(() => {
            window.vConsole = new window.VConsole()
        })
}
