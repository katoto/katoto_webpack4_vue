<template>
    <Pop class="pop_rule" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.rule_title')}}</div>
        <div class="pop_rule_main">
            <p v-html="_('m_payment.rule1')"></p>
            <p v-html="_('m_payment.rule2')"></p>
            <p v-html="_('m_payment.rule3')"></p>
        </div>
        <!-- <div class="rechange_tips">
            <a href="javascript:" class="btn_default" @click="app.confirmDeliverTip">{{_('m_payment.confirm')}}</a>
            <div class="tips_form">
                <input type="checkbox" v-model="app.deliverConfirm">
                <i class="icon_checkbox" :class="{on: app.deliverConfirm}" @click="app.deliverConfirm = !app.deliverConfirm"></i>
                <label for="tips">{{_('m_payment.rule_tip')}}</label>
            </div>
        </div> -->
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showExchangeTips
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setExchangeTips", true)
                } else {
                    this.app.setPopStore("setExchangeTips", false)
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
