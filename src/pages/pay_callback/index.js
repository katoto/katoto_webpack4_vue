
import {
    cbetLocal
} from "@/common/util"

function quit () {
    cbetLocal({
        func: "closeWebview",
        params:{
        }
    })
}

window.addEventListener("load", () => {
    quit()
})

window.addEventListener("click", () => {
    quit()
})

