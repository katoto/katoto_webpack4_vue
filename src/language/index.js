import { getURLParams, cookie } from '../common/util'
import common from './common'
const params = getURLParams()
const isSupportLocalStorage = !!window.localStorage && false
const storage = window.localStorage
const _lang = (
    params.lang ||
    (isSupportLocalStorage ? storage.getItem('lang') : cookie.get('lang')) ||
    'en'
)
let lang = {...common}

window.cookie = cookie
isSupportLocalStorage ? storage.setItem('lang', _lang) : cookie.set('lang', _lang, 9999)

window._ = function (string) {
    return (
        _lang === 'en' ?
            _format.apply(lang.en[string], arguments) : 
            _format.apply(lang.india[string], arguments)
    )
}
function _format () {
    if (arguments.length > 1) {
        let thisString = this
        for (let index = 1; index < arguments.length; index++) {
            thisString = thisString.replace(new RegExp(`\\{${index - 1}\\}`, 'g'), arguments[index])
        }
        return thisString
    }
    return this
}

export function use (Vue, language) {
    Vue.prototype._ = window._
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
}