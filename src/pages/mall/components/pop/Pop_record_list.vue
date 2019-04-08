<template>
    <Pop class="pop_list_redemption_record" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
        <div class="redemption_record">
        <ul>
            <li>
            <div class="record_img">
                <img src="@assets/img/10g.png" alt>
                <p class="record_name">100 Amazon</p>
            </div>
            <div class="record_msg">
                <div class="record_view">
                <p>
                    <span>{{_('m_payment.card_no')}}：</span>
                    <i>1325144654685asdas</i>
                </p>
                <p>
                    <span>{{_('m_payment.password')}}：</span>
                    <i>1325144654asdasdasd</i>
                </p>
                </div>
                <span class="record_time">2018.08.10 18:52:32</span>
            </div>
            </li>
            <li>
            <div class="record_img">
                <img src="@assets/img/10g.png" alt>
                <p class="record_name">Iphone SE (16GB)</p>
            </div>
            <div class="record_msg">
                <div class="record_view">
                <p>
                    <span>{{_('m_payment.goodstatus')}}:</span>
                    <i>1</i>
                </p>
                <p>
                    <span>{{_('m_payment.goodno')}}:</span>
                    <i>2</i>
                </p>
                </div>
                <span class="record_time">2018.08.10 18:52:32</span>
            </div>
            </li>
        </ul>
        <!--todo empty -->
        </div>
        <p>11111123{{ test }}12332</p>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showRecordList
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setRecordList", true)
                } else {
                    this.app.setPopStore("setRecordList", false)
                }
            }
        },
        test () {
            return this.app.acitveClass
        }
    },
    components:{
        Pop
    },
    mounted () {
    }
}
</script>
