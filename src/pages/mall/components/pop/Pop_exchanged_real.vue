<template>
        <Pop class="pop_exchange_real" :show.sync="show">
            <div class="h3 pop_name">{{_('m_payment.exchanged')}}</div>
            <img class="product_img" :src="activeItem.imgurl" alt>
            <p class="product_name">{{activeItem.goodsname}}</p>
            <p class="product_use">{{activeItem.goodsdesc}}</p>

            <div class="address_check">
                <p class="user_msg">
                    <span class="user_t">{{_('m_payment.name1')}}:</span>
                    <span class="user_c">{{activeItem.consignee}}</span>
                </p>
                <p class="user_msg">
                    <span class="user_t">{{_('m_payment.address1')}}:</span>
                    <span class="user_c user_address">{{activeItem.address}}</span>
                </p>
                <p class="user_msg">
                    <span class="user_t">{{_('m_payment.phone1')}}:</span>
                    <span class="user_c">{{activeItem.mobile}}</span>
                </p>
                <p class="user_msg">
                    <span class="user_t">{{_('m_payment.code1')}}:</span>
                    <span class="user_c">{{activeItem.postcode}}</span>
                </p>
                <div class="btn_choose"></div>
            </div>
            <div class="icon_success"></div>
        </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed: {
        show: {
            get: function () {
                return this.app.pop.showExchangedReal
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setExchangedReal", true)
                } else {
                    this.app.setPopStore("setExchangedReal", false)
                }
            }
        },
        activeItem () {
            return this.app.activeItem
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
