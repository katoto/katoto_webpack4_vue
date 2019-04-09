<template>
  <Pop class="pop_common" :show.sync="show">
    <div class="pop_common_title"></div>
    <p class="is-center">
      因为获得充值送优惠，
      <br>您还需要使用
      <i class="color_white bold">5000猜球币</i> ，才可进行兑换哦~
    </p>
    <a href="javascript:;" class="btn_default">知道了</a>
  </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showCommon
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setCommon", true)
                } else {
                    this.app.setPopStore("setCommon", false)
                }
            }
        }
    },
    components:{
        Pop
    },
    mounted () {
    },
    methods:{

    }
}
</script>
