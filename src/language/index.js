import { getURLParams } from '../common/util'
import english from './english'
import india from './india'
const params = getURLParams()

let lang = (
    params.lang ||
    (window.localStorage && window.localStorage.getItem('lang')) ||
    'en'
)

window.localStorage && window.localStorage.setItem('lang', lang)

window._ = function (string) {
    return (
        lang === 'en' ?
            _format.apply(english[string], arguments) : 
            _format.apply(india[string], arguments)
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