<template>
    <Pop class="pop_rule" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange_title')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>
        <p class="product_nedd">
          <i class="icon_gold"></i>10
        </p>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showRuleHelp
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setRuleHelp", true)
                } else {
                    this.app.setPopStore("setRuleHelp", false)
                }
            }
        }
    },
    components:{
        Pop
    },
    mounted () {
    }
}
</script>
