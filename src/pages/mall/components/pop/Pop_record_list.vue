<template>
  <Pop class="pop_list_redemption_record" :show.sync="show">
    <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
    <div class="redemption_record">
      <template v-if="recordList&&recordList.length>0">
        <ul>
          <!-- <li>
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
          </li>-->
          <li v-for="item in recordList" :key="item.id">
            <div class="record_img">
              <img :src="item.imgurl" :alt="item.goodsdesc">
              <p class="record_name">{{item.name}}</p>
            </div>
            <div class="record_msg">
              <div class="record_view">
                  <!-- goodstype  1虚拟卡 -->
                <template v-if="item.goodstype=='1'">
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
                <div class="goods_unusual" v-else-if="item.goodstype=='2'&&item.orderstatus=='7'" @click="ShowPopReal2Card(item)">
                    <p>因邮寄问题，已更换为礼品卡奖励,点击该条兑换信息查看卡号</p>
                </div>
                <!-- 实物正常派送中  -->
                <template v-else>
                  <p>
                    <span>订单状态：</span>
                    <i>{{item.orderstatus}}</i>
                  </p>
                  <p>
                    <span>快递单号：</span>
                    <i>{{item.sid}}</i>
                  </p>
                </template>

              </div>
              <span class="record_time">{{item.crtime}}</span>
            </div>
          </li>
        </ul>
      </template>
      <div class="nomsg" v-else>No data yet</div>
    </div>
  </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    data () {
        return {
            recordList: null,
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
        },
        test () {
            return this.app.acitveClass
        },
    },
    components:{
        Pop
    },
    watch: {
        show (val) {
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
        ShowPopReal2Card(e){
            console.log(e);
            this.app.covert_message = e
            this.app.setPopStore("setReal2card", true)
        }
    }
}
</script>
