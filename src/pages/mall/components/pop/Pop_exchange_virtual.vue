<template>
        <Pop class="pop_exchange_virtual" :show.sync="show">
            <div class="h3 pop_name">{{isChange ? _('m_payment.exchanged') : _('m_payment.exchange_title')}}</div>
            <img class="product_img" :src="app.activeItem.imgurl" alt>
            <p class="product_name">{{app.activeItem.name}}</p>
            <p class="product_use">{{app.activeItem.goodsdesc}}</p>

            <div class="card_msg card_msg_before" :class="{hide: isChange}">
                <p>
                    <span>{{_('m_payment.card_no')}}:</span>
                    <i class="card_layer"></i>
                </p>
                <p>
                    <span>{{_('m_payment.password')}}:</span>
                    <i class="card_layer"></i>
                </p>
            </div>

            <div class="card_msg card_msg_after" :class="{hide: !isChange}">
                <p>
                    <span>{{_('m_payment.card_no')}}:</span>
                    <i class="card_psw">{{app.virtualCard}}</i>
                    <a href="javascript:;" class="btn_copy" @click="copy(app.virtualCard)">{{_('m_payment.copy')}}</a>
                </p>
                <p :class="{message: !app.isShowPassword}">
                    <span>{{_('m_payment.password')}}:</span>
                    <i class="card_psw" :class="{overflow: app.isShowPassword, message: !app.isShowPassword}">{{app.virtualPass}}</i>
                    <a href="javascript:;" class="btn_copy" @click="copy(app.virtualPass)" v-if="app.isShowPassword">{{_('m_payment.copy')}}</a>
                </p>
            </div>
            <div class="icon_success" v-if="isChange"></div>
            <a href="javascript:" class="btn_default" @click="app.confirmVirtual" v-hidden="isChange">{{_('m_payment.exchange_confirm')}}</a>
        </Pop>
</template>
<script>
import Pop from "./Pop.vue"
import {
    copy
} from "@/common/util"
export default {
    inject: ["app"],
    computed: {
        show: {
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
        },
        isChange () {
            return this.app.virtualCard !== "" && this.app.virtualPass !== ""
        }
    },
    components: {
        Pop
    },
    methods: {
        copy
    }
}
</script>
