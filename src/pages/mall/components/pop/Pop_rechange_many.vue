<template>
    <Pop class="pop_rechange_many" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange_success')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <div class="product_msg">
            <p class="product_name">100 Amazon</p>
            <p class="product_count">({{_('m_payment.virtual_num', 3)}})</p>
        </div>
        <p class="product_use">1000 gift card for Amazon Mail</p>
        <!-- 批量兑换前 -->
        <div class="pop_rechange_many_before">
            <p class="text_error"></p>
            <div class="input_box">
                <a href="javascript:;" class="btn btn_delete">-</a>
                <input type="number">
                <a href="javascript:;" class="btn btn_add">+</a>
            </div>
            <p class="text_tips">({{_('m_payment.exchange_tip', 50)}})</p>
        </div>
        <!-- 批量兑换成功后 -->
        <div class="pop_rechange_many_main hide">
            <ul>
                <li class="pop_rechange_many_list">
                    <p>
                        <span class="card_num">{{_('m_payment.card_no')}}:</span>
                        <i class="card_psw">1256484359765815</i>
                    </p>
                    <p>
                        <span class="card_num">{{_('m_payment.password')}}:</span>
                        <i class="card_psw">654235654235654235654</i>
                    </p>
                </li>
                <li class="pop_rechange_many_list">
                    <p>
                        <span class="card_num">{{_('m_payment.card_no')}}:</span>
                        <i class="card_psw">1256484359765815</i>
                    </p>
                    <p>
                        <span class="card_num">{{_('m_payment.password')}}:</span>
                        <i class="card_psw">654235654235654235654235654235654235</i>
                    </p>
                </li>
                <li class="pop_rechange_many_list">
                    <p>
                        <span class="card_num">{{_('m_payment.card_no')}}:</span>
                        <i class="card_psw">1256484359765815</i>
                    </p>
                    <p>
                        <span class="card_num">{{_('m_payment.password')}}:</span>
                        <i class="card_psw">654235654235654235654235654235654235</i>
                    </p>
                </li>
            </ul>
        </div>
        <a href="javascript:" class="btn_default">{{_('m_payment.copy_all')}}</a>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showRechangeMany
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setRechangeMany", true)
                } else {
                    this.app.setPopStore("setRechangeMany", false)
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
