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
    isProduction ? liveForm.submit() : sandboxForm.submit()
}

function buyProps () {
    alert(JSON.stringify(cookie.getAll()))
    alert(JSON.stringify(params))
    return axios.post("/shops/props/buy", params)
}

function buyPrivileges () {
    return axios.post("/shops/privileges/buy", params)
}

function deal () {
    return (isProps ? buyProps() : buyPrivileges())
        .then(res => {
            console.log(res)
            return res
        })
}

window.addEventListener("load", () => {
    deal()
        .then(res => {
            console.log(res)
            submitForm({
                custom: "tx123456",
                amount: "15",
                invoice: "tx123445556",
                item_name: "15 美金卢比"
            })
        })
        .catch(err => {
            console.log(err)
            submitForm({
                custom: "tx123456",
                amount: "15",
                invoice: "tx123445556",
                item_name: "15 美金卢比"
            })
        })
})
