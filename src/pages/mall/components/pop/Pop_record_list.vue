<template>
  <Pop class="pop_list_redemption_record" :show.sync="show">
    <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
    <div class="redemption_record">
      <template v-if="1">
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
        </ul>
      </template>
      <p class="nomsg" v-else>no data</p>
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
        }
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
                pagesize: "12"
            }).then(res => {
                this.recordList = res.data
                // this.allnum = res.data.allnum
            })
        }
    }
}
</script>
