import Toast from "./Toast.vue"
import Vue from "vue"

let messageInstance = null
let newInstance = (properties = {}) => {
    const Instance = new Vue({
        data: properties,
        render (h) {
            return h(Toast, {
                props: properties
            })
        }
    })
    const component = Instance.$mount()
    document.body.appendChild(component.$el)
    const toast = Instance.$children[0]

    return toast

}
function getMessageInstance () {
    messageInstance = messageInstance || newInstance()
    return messageInstance
}

function notice ({ duration = 2000, content = "" }) {
    getMessageInstance().addNotice({
        content,
        duration
    })
}

export default function (options) {
    return notice(options)
}
