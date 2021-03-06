import {
    cookie
} from "../common/util"
import common from "./common"
const _lang = cookie.get("language") || "en"
const _isEn = (_lang === "en")
let lang = {
    ...common
}

window.cookie = cookie

window._ = function (string) {
    return (
        _isEn ?
            _format.apply(lang.en[string], arguments) :
            _format.apply(lang.hi[string], arguments)
    )
}
function _format () {
    if (arguments.length > 1) {
        let thisString = this || ""
        for (let index = 1; index < arguments.length; index++) {
            thisString = thisString.replace(new RegExp(`\\{${index - 1}\\}`, "g"), arguments[index])
        }
        return thisString
    }
    return this
}

export function use (Vue, language) {
    if (language && language.length && language.length) {
        language.map(item => {
            lang = {
                en: {
                    ...lang.en,
                    ...item.en
                },
                hi: {
                    ...lang.india,
                    ...item.india
                }
            }
        })
    } else if (language) {
        lang = {
            en: {
                ...lang.en,
                ...language.en
            },
            hi: {
                ...lang.india,
                ...language.india
            }
        }
    }
    Vue.prototype._ = window._
    Vue.prototype.$isEn = _isEn
}
