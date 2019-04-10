import notification from "./notification.js"

let messageInstance = null

function getMessageInstance () {
    messageInstance = messageInstance || notification.newInstance()
    return messageInstance
}

function notice ({
    duration = 2000, content = ""
}) {

    let instance = getMessageInstance()

    instance.add({
        content: content,
        duration: duration
    })
}

export default function (options) {
    return notice(options)
}
