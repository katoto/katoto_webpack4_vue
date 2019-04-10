<template>
    <Pop class="pop_exchange_real" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
        <img class="product_img" src="@assets/img/10g.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>

        <div class="address_input" v-if="!app.isCheckReal">
            <input type="text" :placeholder="_('m_payment.name')" v-model="app.realName">
            <input type="text" :placeholder="_('m_payment.phone')" v-model="app.realTel">

            <input type="text" :placeholder="_('m_payment.address')" v-model="app.realAddress">
            <input type="text" :placeholder="_('m_payment.code')" v-model="app.realPostcode">
            <a href="javascript:" class="btn_default" @click="app.addAddress" :class="{disable: !app.checkRealInfo}">{{_('m_payment.exchange_confirm')}}</a>
        </div>
        <div class="address_check" v-else>
            <p class="user_msg">
                <span class="user_t">{{_('m_payment.name1')}}:</span>
                <span class="user_c">{{app.realName}}</span>
            </p>
            <p class="user_msg">
                <span class="user_t">{{_('m_payment.address1')}}:</span>
                <span class="user_c">{{app.realAddress}}</span>
            </p>
            <p class="user_msg">
                <span class="user_t">{{_('m_payment.phone1')}}:</span>
                <span class="user_c">{{app.realTel}}</span>
            </p>
            <p class="user_msg">
                <span class="user_t">{{_('m_payment.code1')}}:</span>
                <span class="user_c">{{app.realPostcode}}</span>
            </p>
            <div class="btn_choose">
                <a href="javascript:;" class="btn_back" @click="app.isCheckReal = false">{{_('m_payment.back_modify')}}</a>
                <a href="javascript:;" class="btn_default" @click="app.exchangeReal">{{_('m_payment.exchange_now')}}</a>
            </div>
        </div>
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
                return this.app.pop.showExchangeReal
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setExchangeReal", true)
                } else {
                    this.app.setPopStore("setExchangeReal", false)
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
