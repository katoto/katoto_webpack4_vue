<template>
    <Pop class="pop_rule" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.rule_title')}}</div>
        <div class="pop_rule_main">
            <p v-html="_('m_payment.rule1')"></p>
            <p v-html="_('m_payment.rule2')"></p>
            <p v-html="_('m_payment.rule3')"></p>
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
    components: {
        Pop
    },
    mounted () {
    }
}
</script>
