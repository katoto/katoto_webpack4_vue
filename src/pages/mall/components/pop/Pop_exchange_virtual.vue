<template>
    <Pop class="pop_exchange_virtual" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange_title')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>

        <div class="card_msg card_msg_before" :class="{hide: app.virtualCard !== '' && app.virtualPass !== ''}">
          <p>
            <span>{{_('m_payment.card_no')}}:</span>
            <i class="card_layer"></i>
          </p>
          <p>
            <span>{{_('m_payment.password')}}:</span>
            <i class="card_layer"></i>
          </p>
        </div>

        <div class="card_msg card_msg_after" :class="{hide: app.virtualCard === '' || app.virtualPass === ''}">
          <p>
            <span>{{_('m_payment.card_no')}}:</span>
            <i class="card_psw">{{app.virtualCard}}</i>
            <a href="javascript:;" class="btn_copy" v-clipboard:copy="app.virtualCard" v-clipboard:success="app.copySucc" v-clipboard:error="app.copyError">{{_('m_payment.copy')}}</a>
          </p>
          <p>
            <span>{{_('m_payment.password')}}:</span>
            <i class="card_psw">{{app.virtualPass}}</i>
            <a href="javascript:;" class="btn_copy" v-clipboard:copy="app.virtualPass" v-clipboard:success="app.copySucc" v-clipboard:error="app.copyError">{{_('m_payment.copy')}}</a>
          </p>
        </div>
        <a href="javascript:" class="btn_default" @click="app.confirmVirtual">{{_('m_payment.exchange_confirm')}}</a>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showExchangeVirtual
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setExchangeVirtual", true)
                } else {
                    this.app.setPopStore("setExchangeVirtual", false)
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
