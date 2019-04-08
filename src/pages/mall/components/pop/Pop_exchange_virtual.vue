<template>
    <Pop class="pop_exchange_virtual" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
        <img class="product_img" src="@assets/img/10g.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>
        <!-- 没填地址 -->
        <div class="address_input">
          <input type="text" :placeholder="_('m_payment.name')">
          <input type="text" :placeholder="_('m_payment.phone')">
          <!-- todo placeholder样式缩小 -->
          <input type="text" :placeholder="_('m_payment.address')">
          <input type="text" :placeholder="_('m_payment.code')">
          <a href="javascript:" class="btn_default">{{_('m_payment.exchange_confirm')}}</a>
        </div>
        <!-- 填好地址 -->
        <div class="address_check hide">
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.name1')}}:</span>
            <span class="user_c">吴阳阳</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.address1')}}:</span>
            <span class="user_c">深圳市龙岗神仙岭500.com大大厦深圳市龙岗神仙岭500.com大大厦</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.phone1')}}:</span>
            <span class="user_c">12345678888</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.code1')}}:</span>
            <span class="user_c">1236546</span>
          </p>
          <div class="btn_choose">
            <a href="javascript:;" class="btn_back">{{_('m_payment.back_modify')}}</a>
            <a href="javascript:;" class="btn_default">{{_('m_payment.exchange_now')}}</a>
          </div>
        </div>
        <!-- 兑换成功 -->
        <div class="icon_success"></div>
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
