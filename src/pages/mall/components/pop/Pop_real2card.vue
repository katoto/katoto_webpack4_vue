<template>
    <Pop class="pop_rechange_many" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange_success')}}</div>
        <img class="product_img" :src="message.imgurl" alt>
        <div class="product_msg">
            <p class="product_name">{{message.goodsname}}</p>
            <p class="product_count">({{_('m_payment.virtual_num', message.convert.cards.length)}})</p>
        </div>
        <p class="product_use">{{message.goodsdesc}}</p>
        <div class="pop_rechange_many_main">
            <ul v-if="message.convert">
                <li class="pop_rechange_many_list" v-for="item in message.convert.cards" :key="item.cardno">
                    <p>
                        <span class="card_num">{{_('m_payment.card_no')}}:</span>
                        <i class="card_psw">{{item.cardno}}</i>
                    </p>
                    <p>
                        <span class="card_num">{{_('m_payment.password')}}:</span>
                        <i class="card_psw">{{item.password}}</i>
                    </p>
                </li>
            </ul>
        </div>
        <a href="javascript:" class="btn_default" @click="copy(getCopyData())">{{_('m_payment.copy_all')}}</a>
    </Pop>
</template>
<script>
import Pop from "./Pop.vue"
import {
    copy
} from "@/common/util"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showReal2card
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setReal2card", true)
                } else {
                    this.app.setPopStore("setReal2card", false)
                }
            }
        },
        message:{
            get:function () {
                return this.app.covert_message
            }
        }
    },
    components:{
        Pop
    },
    methods: {
        copy,
        getCopyData () {
            let data = this.message.convert.cards.map(item => `${_("m_payment.card_no")}:${item.password}\n${_("m_payment.password")}:${item.cardno}`)
            return data.join("\n-------------------\n")
        }
    }
}
</script>
