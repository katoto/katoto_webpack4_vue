import {
    getURLParams, cookie
} from "../common/util"
import common from "./common"
const params = getURLParams()
const isSupportLocalStorage = !!window.localStorage
const storage = window.localStorage
const _lang = (
    params.lang ||
    (isSupportLocalStorage ? storage.getItem("lang") : cookie.get("lang")) ||
    "en"
)
let lang = {
    ...common
}

window.cookie = cookie
isSupportLocalStorage ? storage.setItem("lang", _lang) : cookie.set("lang", _lang, 9999)

window._ = function (string) {
    return (
        _lang === "en" ?
            _format.apply(lang.en[string], arguments) :
            _format.apply(lang.india[string], arguments)
    )
}
function _format () {
    if (arguments.length > 1) {
        let thisString = this
        for (let index = 1; index < arguments.length; index++) {
            thisString = thisString.replace(new RegExp(`\\{${index - 1}\\}`, "g"), arguments[index])
        }
        return thisString
    }
    return this
}

function changeLanguage (thisLanguage)  {
    isSupportLocalStorage ? storage.setItem("lang", thisLanguage) : cookie.set("lang", thisLanguage, 9999)
    let newParams = {
        ...params,
        lang: thisLanguage
    }
    window.location.search = Object.keys(newParams).map((key, index) => {
        return (
            index === 0
                ? `?${key}=${newParams[key]}`
                : `&${key}=${newParams[key]}`
        )
    }).join("")
}

export function use (Vue, language) {
    if (language && language.__proto__ === Array.prototype) {
        language.map(item => {
            lang = {
                en: {
                    ...lang.en,
                    ...item.en
                },
                india: {
                    ...lang.india,
                    ...item.india
                }
            }
        })
    } else if (language && language.__proto__ === Object.prototype) {
        lang = {
            en: {
                ...lang.en,
                ...language.en
            },
            india: {
                ...lang.india,
                ...language.india
            }
        }
    }
    window._._lang = _lang
    window._.lang = lang
    window._.changeLanguage = changeLanguage
    Vue.prototype._ = window._
}
