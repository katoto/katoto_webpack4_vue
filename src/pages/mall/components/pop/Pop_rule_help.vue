<template>
    <Pop class="pop_rule" :show.sync="show">
        <template v-if="loading && country==='印度'">
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
        </template>
        <!-- 国际包提供特定的文案并且只有英文 -->
        <template v-else-if="loading && country !== '印度'">
            <div class="h3 pop_name">Please be noted that:</div>
            <div class="pop_rule_main">
                <p>
                    1. The item picture is just for reference, you'll receive an equal-valued Amazon card after exchange
                </p>
                <p>
                    2. You can shop with the card from Amazon
                </p>
                <p>
                    3. The card No. and password will be displayed in My Exchange. Tap the exchanged item to see card info
                    Got It
                </p>
            </div>
            <div class="rechange_tips">
                <a href="javascript:" class="btn_default" @click="app.confirmDeliverTip">Confirm</a>
                <div class="tips_form">
                    <i class="icon_checkbox" :class="{on: deliverConfirm}" @click="deliverConfirm = !deliverConfirm"></i>
                    <label for="tips" @click="deliverConfirm = !deliverConfirm">Remind me next century</label>
                </div>
            </div>
        </template>
        <div class="common_loading" v-else></div>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
import { type } from "os"
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
            deliverConfirm: false,
            loading: false,
            country: ""
        }
    },
    methods: {
        hangdleIp () {
            this.$get("/user/ip/country")
                .then(res => {
                    this.country = res.data.country
                    this.loading = true
                })
        }
    },
    watch: {
        deliverConfirm (val) {
            if (val) {
                window.localStorage.setItem("no_deliver_tip", "true")
            } else {
                window.localStorage.removeItem("no_deliver_tip")
            }
        },
        show (val) {
            if (val) {
                this.hangdleIp()
            }
        }
    },
    components: {
        Pop
    },
    mounted () {

    }
}
</script>
