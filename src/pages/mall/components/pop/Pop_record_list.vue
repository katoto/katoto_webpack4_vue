<template>
    <Pop class="pop_list_redemption_record" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
        <div class="redemption_record">
            <template v-if="recordList&&recordList.length>0">
                <ul>
                    <li v-for="item in recordList" :key="item.id" @click="item.goodstype === '1' && app.showCardDetail(item.cardno, item.password, item.orderstatus === '1')">
                        <div class="record_img">
                            <img :src="item.imgurl" :alt="item.goodsdesc">
                            <p class="record_name">{{item.name}}</p>
                        </div>
                        <div class="record_msg">
                            <div class="record_view">
                                <!-- goodstype  1虚拟卡 -->
                                <template v-if="item.goodstype === '1'">
                                    <p>
                                        <span>{{_('m_payment.card_no')}}：</span>
                                        <i>{{item.cardno}}</i>
                                    </p>
                                    <p>
                                        <span>{{_('m_payment.password')}}：</span>
                                        <i>{{item.password}}</i>
                                    </p>
                                </template>
                                <!--  实物转换成虚拟卡  -->
                                <div class="goods_unusual" v-else-if="item.goodstype === '2'&& item.orderstatus === '7'" @click="ShowPopReal2Card(item)">
                                    <p>{{ _('m_payment.sm_deliveryList') }}</p>
                                </div>
                                <!-- 实物正常派送中  -->
                                <template v-else>
                                    <p>
                                        <span>{{ _('m_payment.sm_orderStatus') }}：</span>
                                        <i>{{formatStatus(item.orderstatus)}}</i>
                                    </p>
                                    <p>
                                        <span>{{ _('m_payment.goodno') }}：</span>
                                        <i>{{item.sid}}</i>
                                    </p>
                                </template>

                            </div>
                            <span class="record_time">{{item.crtime}}</span>
                        </div>
                    </li>
                </ul>
            </template>
            <div class="nomsg" v-else>{{ _('m_payment.sm_nodata') }}</div>
        </div>
    </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    data () {
        return {
            recordList: [],
            allnum: 0
        }
    },
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
        }
    },
    components:{
        Pop
    },
    watch: {
        show (val) {
            this.recordList = []
            val && this.getRecordList()
        }
    },
    methods: {
        getRecordList () {
            this.$post("/shops/goods/exchange/record/list",{
                pageno: "1",
                pagesize: "999"
            }).then(res => {
                this.recordList = res.data.list
                this.allnum = res.data.allnum
            })
        },
        ShowPopReal2Card (e) {
            this.app.covert_message = {
                ...e
            }
            this.app.setPopStore("setReal2card", true)
        },
        formatStatus (status) {
            switch (status) {
            case "2":
                return _("m_payment.delivered")
            case "3":
                return _("m_payment.received")
            case "4":
                return _("m_payment.undelivered")
            }
            return ""
        }
    }
}
</script>
