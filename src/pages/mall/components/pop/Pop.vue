<!-- 公共弹窗 -->
<template>
    <transition name="pop_animate">
        <div class="pop" v-if="show">
            <div class="pop_main">
                <a href="javascript:" class="pop_close" v-if="hideClose" @click="onClose"></a>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script>

export default {
    props:{
        show: {
            type: Boolean,
            default:false
        },
        hideClose: {
            type: Boolean,
            default: true
        }
    },
    methods:{
        onClose () {
            this.$emit("update:show", false)
        }
    },
    mounted () {
    }

}
</script>

