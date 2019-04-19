<!-- 公共弹窗 -->
<template>
  <div class="pop" v-show="show2">
    <transition name="pop_animate">
      <div class="pop_main" v-show="show">
        <a href="javascript:" class="pop_close" v-if="hideClose" @click="onClose"></a>
        <slot></slot>
      </div>
    </transition>
  </div>
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
    data(){
        return{
            show2: false
        }
    },
    watch:{
        show(e){
           if(e){
                this.show2 = e
           }else{
               setTimeout(() => {
                   this.show2 = e
               }, 250);
           }
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

