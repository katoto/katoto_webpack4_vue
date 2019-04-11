import axios from "axios"
import {
    getURLParams
} from "@/common/util"

let params = getURLParams()
let isProduction = (params.env === "live")
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

window.addEventListener("load", () => {
    axios.post("/getTransaction", {
        goodid: params.goodid || "123"
    })
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
