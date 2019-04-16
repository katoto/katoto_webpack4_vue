<template>
    <Pop class="pop_rule" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.rule_title')}}</div>
        <div class="pop_rule_main">
            <p v-html="_('m_payment.rule1')"></p>
            <p v-html="_('m_payment.rule2')"></p>
            <p v-html="_('m_payment.rule3')"></p>
        </div>
        <div class="rechange_tips">
            <a href="javascript:" class="btn_default" @click="app.confirmDeliverTip">{{_('m_payment.confirm')}}</a>
            <div class="tips_form">
                <i class="icon_checkbox" :class="{on: deliverConfirm}" @click="deliverConfirm = !deliverConfirm"></i>
                <label for="tips" @click="deliverConfirm = !deliverConfirm">{{_('m_payment.rule_tip')}}</label>
            </div>
        </div>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed: {
        show: {
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
    data () {
        return {
            deliverConfirm: false
        }
    },
    watch: {
        deliverConfirm (val) {
            if (val) {
                window.localStorage.setItem("no_deliver_tip", "true")
            } else {
                window.localStorage.removeItem("no_deliver_tip")
            }
        }
    },
    components: {
        Pop
    }
}
</script>
