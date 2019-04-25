<template>
    <Pop class="pop_common" :show.sync="show">
        <div class="pop_common_title"></div>
        <!-- is-left is-right -->
        <!--  m_payment.sm_popcom_exchange  -->
        <p class="is-center">
            因为获得充值送优惠，
            <br>您还需要使用
            <i class="color_white bold">5000猜球币</i> ，才可进行兑换哦~
        </p>
        <a class="btn_default">{{ _('m_payment.sm_popget') }}</a>
    </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed: {
        show: {
            get: function () {
                return this.app.pop.showCommon
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setCommon", true)
                } else {
                    this.app.setPopStore("setCommon", false)
                }
            }
        }
    },
    components: {
        Pop
    },
    mounted () {
    },
    methods: {

    }
}
</script>
