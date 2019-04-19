<template>
  <Pop class="pop_exchange_real" :show.sync="show">
    <div class="h3 pop_name">{{app.isChangeReal ? _('m_payment.exchanged') : _('m_payment.exchange')}}</div>
    <img class="product_img" :src="app.activeItem.imgurl" alt>
    <p class="product_name">{{app.activeItem.name}}</p>
    <p class="product_use">{{app.activeItem.goodsdesc}}</p>

    <div class="address_input" v-if="!app.isCheckReal">
      <input type="text" :placeholder="_('m_payment.name')" v-model="address.f_consignee">
      <input type="text" :placeholder="_('m_payment.phone')" v-model="address.f_mobile">
      <input type="text" v-model="address.f_address">
      <input type="text" :placeholder="_('m_payment.code')" v-model="address.f_postcode">
      <p class="address_detail" v-html="_('m_payment.address')" v-if="!address.f_address">
        <!-- Shipping address
        <i class="sm_add">(accurate to street and number)</i>-->
      </p>
      <a href="javascript:" class="btn_default" @click="checkRealInfo && app.addAddress(address)" :class="{disable: !checkRealInfo}">{{_('m_payment.exchange_confirm')}}</a>
    </div>
    <div class="address_check" v-else>
      <p class="user_msg">
        <span class="user_t">{{_('m_payment.name1')}}:</span>
        <span class="user_c">{{address.f_consignee}}</span>
      </p>
      <p class="user_msg">
        <span class="user_t">{{_('m_payment.address1')}}:</span>
        <span class="user_c user_address">{{address.f_address}}</span>
      </p>
      <p class="user_msg">
        <span class="user_t">{{_('m_payment.phone1')}}:</span>
        <span class="user_c">{{address.f_mobile}}</span>
      </p>
      <p class="user_msg">
        <span class="user_t">{{_('m_payment.code1')}}:</span>
        <span class="user_c">{{address.f_postcode}}</span>
      </p>
      <div class="btn_choose">
        <a href="javascript:;" class="btn_back" @click="app.isCheckReal = false" v-if="!app.isChangeReal">{{_('m_payment.back_modify')}}</a>
        <a href="javascript:;" class="btn_default" @click="app.isChangeReal ? close() : app.exchangeReal()">{{_('m_payment.exchange_now')}}</a>
      </div>
    </div>
    <div class="icon_success" v-if="app.isChangeReal"></div>
  </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    data () {
        return {
            address: {}
        }
    },
    computed: {
        show: {
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
        },
        checkRealInfo () {
            if (this.address.f_consignee && this.address.f_address && this.address.f_mobile && this.address.f_postcode) {
                return true
            }
            return false
        }
    },
    watch: {
        show (val) {
            if (val) {
                this.address = {
                    ...this.app.address
                }
            }
        }
    },
    components: {
        Pop
    },
    methods: {
        close () {
            this.show = false
        }
    }
}
</script>
