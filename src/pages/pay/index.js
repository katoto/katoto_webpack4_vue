/* eslint-disable import/no-duplicates */
import {
    getURLParams,
    cookie,
    cbetLocal
} from "@/common/util"
import simpleAjax from "@plugins/simpleAjax"
import { URL } from "@plugins/simpleAjax"
function sendOrderToApp (orderid) {
    cbetLocal({
        func: "jumpToLocal",
        params: {
            content: orderid
        }
    })
}

console.log(URL)

function http () {}
http.prototype.$toast = function (data) {
    alert(data.content)
}

let params = getURLParams()

let isProduction = (params.env === "live")
let isProps = (!!params.propsid)
let sandboxForm = document.getElementById("sandbox_form")
let liveForm = document.getElementById("live_form")
let data = {
    appck: "",
    ...params,
    ...cookie.getAll()
}
data.ck = data.appck

simpleAjax.install(http, {
    commonParams: {
        platform: "android",
        version: "1.0.0",
        channel: "test",
        ...data
    }
})
function setValue (name, value) {
    Array.prototype.slice.call(document.querySelectorAll(`.${name}`), 0).map(item => {
        item.setAttribute("value", value)
    })
}

function submitForm (data) {
    setValue("custom", data.custom)
    setValue("amount", data.amount)
    setValue("invoice", data.invoice)
    setValue("item_name", data.item_name)
    setValue("cancel_return", `${URL}?_type=error`)
    setValue("return", `${URL}?_type=success`)
}

function buyProps () {
    return http.prototype.$post("/shops/props/buy", data)
}

function buyPrivileges () {
    return http.prototype.$post("/shops/privileges/buy", data)
}

function deal () {
    return (isProps ? buyProps() : buyPrivileges())
}

window.addEventListener("load", () => {
    document.getElementById("submit").addEventListener("click", () => {
        isProduction ? liveForm.submit() : sandboxForm.submit()
    })
    deal()
        .then(res => {
            let _data = res.data
            submitForm({
                custom: _data.orderid,
                amount: _data.rechargemoney,
                invoice: _data.orderid,
                item_name: `${data.rechargemoney}INR (${_data.rechargemoney} USD)`
            })
            // sendOrderToApp(_data.orderid)
            isProduction ? liveForm.submit() : sandboxForm.submit()
        })
        .catch(err => {
            alert(JSON.stringify(err))
        })
})
