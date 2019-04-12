import axios from "axios"
import {
    getURLParams,
    cookie
} from "@/common/util"

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
data.ck = decodeURIComponent(data.appck)
data.appck = data.ck
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
}

function buyProps () {
    return axios.post("http://149.129.138.180/api/shops/props/buy", data)
}

function buyPrivileges () {
    return axios.post("http://149.129.138.180/api/shops/privileges/buy", data)
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
            let _data = res.data.data
            submitForm({
                custom: _data.orderid,
                amount: _data.rechargemoney,
                invoice: _data.orderid,
                item_name: `${data.rechargemoney}INR (${_data.rechargemoney} USD)`
            })
            isProduction ? liveForm.submit() : sandboxForm.submit()
        })
        .catch(err => {
            alert(JSON.stringify(err.data))
        })
})
