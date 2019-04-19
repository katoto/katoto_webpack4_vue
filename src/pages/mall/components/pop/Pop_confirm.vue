<template>
    <div class="pop_congratulation"  v-if="!show && 0">
        <transition name="pop_animate">
            <div class="pop_con_main">
                <div class="c_title" data-msg="Congratulations"></div>
                <img src="@/assets/img/amazon.png" alt="">
                <!-- <p class="c_count"></p> -->
                <!-- <p class="c_msg">{{ _('m_share.sh_win_inviteNum', winInviteNum) }}</p> -->
                <a href="javascript:;" class="btn_default">OK</a>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    inject: ["app"],
    computed: {
        show: {
            get: function () {
                return this.app.pop.showCongratulation
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setCongratulation", true)
                } else {
                    this.app.setPopStore("setCongratulation", false)
                }
            }
        }
    },
    components: {
    },
    mounted () {
    }
}
</script>
