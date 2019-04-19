<!-- 公共弹窗 -->
<template>
    <div class="pop" v-show="show2">
        <transition name="pop_animate">
            <div class="pop_main" v-show="show">
                <a href="javascript:" class="pop_close" @click="onClose"></a>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            show2: false
        }
    },
    watch: {
        show (isShow) {
            if (isShow) {
                this.show2 = isShow
            } else {
                setTimeout(() => {
                    this.show2 = isShow
                }, 250)
            }
        }
    },
    methods: {
        onClose () {
            this.$emit("update:show", false)
        }
    }
}
</script>

