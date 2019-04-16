<script>
const MyPlugin = {

}

MyPlugin.install = function (Vue) {
    function hidden (el, binding) {
        if (el.style) {
            el.style.visibility = binding.value ? "hidden" : "visible"
        } else {
            el.style = {
                visibility: binding.value ? "hidden" : "visible"
            }
        }
    }

    // 添加全局指令
    Vue.directive("hidden", {
        bind: hidden,
        inserted: hidden,
        update: hidden,
        componentUpdated: hidden
    })
}

export default MyPlugin
</script>

