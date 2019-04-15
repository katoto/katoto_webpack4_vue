<template>
  <div class="fullscreen page_mall">
    <div class="bg">
      <div class="bg_header"></div>
    </div>
    <div class="header">
      <div class="fl">
        <a href="javascript:;" class="btn btn_back"></a>
      </div>
      <div class="fr">
        <a href="javascript:;" class="my_balance">
          <span>{{formateBalance(avaliable_total)}}</span>
        </a>
        <a href="javascript:;" class="btn btn_list_redemption_record" @click="recordListFn"></a>
        <a href="javascript:;" class="btn btn_question" @click="setPopStore('setExchangeTips', true)" v-if="false"></a>
      </div>
    </div>
    <!-- todo 提成公共组件轮询新闻 -->
    <div class="news">
      <!-- <ul>
            <li :style="{width:newsWidth}" ref="newsWidth">
                {{_('m_payment.mall_title')}}
            </li>
      </ul>-->
      <div class="news_main">
        <p :style="{width:newsWidth}" ref="newsWidth">{{_('m_payment.mall_title')}}</p>
      </div>
    </div>
    <div class="mall">
      <div class="mall_tab">
        <ul>
          <li @click="acitveClass = 'all'" :class="{on: acitveClass === 'all'}">
            <a href="javascript:;">{{_('m_payment.all')}}</a>
          </li>
          <li @click="acitveClass = 'card'" :class="{on: acitveClass === 'card'}">
            <a href="javascript:;">{{_('m_payment.card')}}</a>
          </li>
          <li @click="acitveClass = 'electronics'" :class="{on: acitveClass === 'electronics'}" class="hot">
            <a href="javascript:;">{{_('m_payment.electronics')}}</a>
          </li>
          <li @click="acitveClass = 'other'" :class="{on: acitveClass === 'other'}">
            <a href="javascript:;">{{_('m_payment.other')}}</a>
          </li>
        </ul>
      </div>
      <div class="mall_main">
        <template v-if="getList().length>0">
          <ul v-for="item in getList()" :key="`${item[0].id}-${item[1] ? item[1].id : '-'}`">
            <li :class="{unlock: item[0].islock === '1'}">
              <div class="reward_box" @click="showProductDetail(item[0])">
                <img :src="item[0].imgurl" alt>
                <p class="reward_name">{{item[0].name}}</p>
              </div>
              <a href="javascript:" class="btn_reward" @click="showDetail(item[0])">{{item[0].needgolds}}</a>
            </li>
            <li :class="{unlock: item[1] && item[1].islock === '1'}">
              <template v-if="item[1]">
                <div class="reward_box" @click="showProductDetail(item[1])">
                  <img :src="item[1].imgurl" alt>
                  <p class="reward_name">{{item[1].name}}</p>
                </div>
                <a href="javascript:" class="btn_reward" @click="showDetail(item[1])">{{item[1].needgolds}}</a>
              </template>
            </li>
          </ul>
        </template>
        <div class="nomsg" v-else>No data yet</div>
      </div>
    </div>

    <!-- 初始化全部的弹窗   -->
    <popList></popList>

    <!-- 历史兑换记录 -->
    <!-- <transition name="pop_animate">
      <div class="pop pop_list_redemption_record" v-if="pop_list_redemption_record">
        <div class="pop_main">
          <a href="javascript:" class="pop_close" @click="pop_list_redemption_record = false"></a>
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
            todo empty -
          </div>
        </div>
      </div>
    </transition>-->

    <!-- 批量兑换 -->
    <!-- <div class="pop pop_rechange_many hide">
      <div class="pop_main">
        <a href="javascript:" class="pop_close"></a>
        <div class="h3 pop_name">{{_('m_payment.exchange_success')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <div class="product_msg">
          <p class="product_name">100 Amazon</p>
          <p class="product_count">({{_('m_payment.virtual_num', 3)}})</p>
        </div>
        <p class="product_use">1000 gift card for Amazon Mail</p>
         批量兑换前
        <div class="pop_rechange_many_before">
          <p class="text_error"></p>
          <div class="input_box">
            <a href="javascript:;" class="btn btn_delete">-</a>
            <input type="number">
            <a href="javascript:;" class="btn btn_add">+</a>
          </div>
          <p class="text_tips">({{_('m_payment.exchange_tip', 50)}})</p>
        </div>
        批量兑换成功后
        <div class="pop_rechange_many_main hide">
          <ul>
            <li class="pop_rechange_many_list">
              <p>
                <span class="card_num">{{_('m_payment.card_no')}}:</span>
                <i class="card_psw">1256484359765815</i>
              </p>
              <p>
                <span class="card_num">{{_('m_payment.password')}}:</span>
                <i class="card_psw">654235654235654235654</i>
              </p>
            </li>
            <li class="pop_rechange_many_list">
              <p>
                <span class="card_num">{{_('m_payment.card_no')}}:</span>
                <i class="card_psw">1256484359765815</i>
              </p>
              <p>
                <span class="card_num">{{_('m_payment.password')}}:</span>
                <i class="card_psw">654235654235654235654235654235654235</i>
              </p>
            </li>
            <li class="pop_rechange_many_list">
              <p>
                <span class="card_num">{{_('m_payment.card_no')}}:</span>
                <i class="card_psw">1256484359765815</i>
              </p>
              <p>
                <span class="card_num">{{_('m_payment.password')}}:</span>
                <i class="card_psw">654235654235654235654235654235654235</i>
              </p>
            </li>
          </ul>
        </div>
        <a href="javascript:" class="btn_default">{{_('m_payment.copy_all')}}</a>
      </div>
    </div>-->

    <!-- 帮助弹层+ -->
    <!-- <div class="pop pop_rule hide">
      <div class="pop_main">
        <a href="javascript:" class="pop_close"></a>
        <div class="h3 pop_name">{{_('m_payment.rule_title')}}</div>
        <div class="pop_rule_main">
          <p v-html="_('m_payment.rule1')"></p>
          <p v-html="_('m_payment.rule2')"></p>
          <p v-html="_('m_payment.rule3')"></p>
        </div>
      </div>
    </div>-->

    <!-- 兑换提醒弹层 -->
    <!-- <div class="pop pop_rule" :class="{hide: !showDeliverPop}">
      <div class="pop_main">
        <a href="javascript:" class="pop_close" @click="showDeliverPop = false"></a>
        <div class="h3 pop_name">{{_('m_payment.rule_title')}}</div>
        <div class="pop_rule_main">
          <p v-html="_('m_payment.rule1')"></p>
          <p v-html="_('m_payment.rule2')"></p>
          <p v-html="_('m_payment.rule3')"></p>
        </div>
        <div class="rechange_tips">
           disable 不可点击
          <a href="javascript:" class="btn_default" @click="confirmDeliverTip">{{_('m_payment.confirm')}}</a>
          <div class="tips_form">
            <input type="checkbox" v-model="deliverConfirm">
            <i class="icon_checkbox" :class="{on: deliverConfirm}" @click="deliverConfirm = !deliverConfirm"></i>
            <label for="tips">{{_('m_payment.rule_tip')}}</label>
          </div>
        </div>
      </div>
    </div>-->

    <!-- 商品详情 -->
    <!-- <div class="pop pop_product_detailed hide">
      <div class="pop_main">
        <a href="javascript:" class="pop_close"></a>
        <div class="h3 pop_name">{{_('m_payment.exchange_title')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>
        <p class="product_nedd">
          <i class="icon_gold"></i>10
        </p>
      </div>
    </div>-->

    <!-- 虚拟商品兑换弹层 -->
    <!-- <div class="pop pop_exchange_virtual" :class="{hide: !showVirtualPop}">
      <div class="pop_main">
        <a href="javascript:" class="pop_close" @click="showVirtualPop = false"></a>
        <div class="h3 pop_name">{{_('m_payment.exchange_title')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>

        <div class="card_msg card_msg_before" :class="{hide: virtualCard !== '' && virtualPass !== ''}">
          <p>
            <span>{{_('m_payment.card_no')}}:</span>
            <i class="card_layer"></i>
          </p>
          <p>
            <span>{{_('m_payment.password')}}:</span>
            <i class="card_layer"></i>
          </p>
        </div>

        <div class="card_msg card_msg_after" :class="{hide: virtualCard === '' || virtualPass === ''}">
          <p>
            <span>{{_('m_payment.card_no')}}:</span>
            <i class="card_psw">{{virtualCard}}</i>
            <a href="javascript:;" class="btn_copy" v-clipboard:copy="virtualCard" v-clipboard:success="copySucc" v-clipboard:error="copyError">{{_('m_payment.copy')}}</a>
          </p>
          <p>
            <span>{{_('m_payment.password')}}:</span>
            <i class="card_psw">{{virtualPass}}</i>
            <a href="javascript:;" class="btn_copy" v-clipboard:copy="virtualPass" v-clipboard:success="copySucc" v-clipboard:error="copyError">{{_('m_payment.copy')}}</a>
          </p>
        </div>
        <a href="javascript:" class="btn_default" @click="confirmVirtual">{{_('m_payment.exchange_confirm')}}</a>
      </div>
    </div>-->

    <!-- 实物商品兑换弹层 -->
    <!-- <div class="pop pop_exchange_real" :class="{hide: !showRealPop}">
      <div class="pop_main">
        <a href="javascript:" class="pop_close" @click="showRealPop = false"></a>
        <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
        <img class="product_img" src="@assets/img/10g.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>

        <div class="address_input" v-if="isCheckReal">
          <input type="text" :placeholder="_('m_payment.name')" v-model="realName">
          <input type="text" :placeholder="_('m_payment.phone')" v-model="realTel">

          <input type="text" :placeholder="_('m_payment.address')" v-model="realAddress">
          <input type="text" :placeholder="_('m_payment.code')" v-model="realPostcode">
          <a href="javascript:" class="btn_default" @click="checkRealInfo">{{_('m_payment.exchange_confirm')}}</a>
        </div>
        <div class="address_check" v-else>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.name1')}}:</span>
            <span class="user_c">{{realName}}</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.address1')}}:</span>
            <span class="user_c">{{realAddress}}</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.phone1')}}:</span>
            <span class="user_c">{{realTel}}</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.code1')}}:</span>
            <span class="user_c">{{realPostcode}}</span>
          </p>
          <div class="btn_choose">
            <a href="javascript:;" class="btn_back">{{_('m_payment.back_modify')}}</a>
            <a href="javascript:;" class="btn_default">{{_('m_payment.exchange_now')}}</a>
          </div>
        </div>
        兑换成功
        <div class="icon_success"></div>
      </div>
    </div>-->

    <!-- pop_common -->
    <!-- <div class="pop pop_common ">
      <div class="pop_main">
        <a href="javascript:;" class="pop_close"></a>
        <div class="pop_common_title"></div>
        <p class="is-center">
          因为获得充值送优惠，
          <br>您还需要使用
          <i class="color_white bold">5000猜球币</i> ，才可进行兑换哦~
        </p>
        <a href="javascript:;" class="btn_default">知道了</a>
      </div>
    </div>-->

    <Toast v-if="toast"></Toast>
  </div>
</template>

<script>
import Toast from "@components/Toast.vue"
import {
    copySucc, copyError, formateBalance
} from "@/common/util"
// 弹窗
import popList from "../components/Pop_list"
// 弹窗data
import mixins_pop from "../mixins/pop.js"
export default {
    mixins: [mixins_pop],
    provide () {
        return {
            app: this
        }
    },
    data () {
        return {
            acitveClass: "all",
            deliverConfirm: false,
            showDeliverPop: false,
            showRealPop: false,
            showVirtualPop: false,
            exchangeList: [],
            pop_list_redemption_record:false,
            virtualCard: "",
            virtualPass: "",
            realName: "",
            realAddress: "",
            realTel: "",
            realPostcode: "",
            isCheckReal: false,
            avaliable_total: "0",
            aid: "",
            activeItem: {
            },
            toast: false,
            showNews:false,
            newsWidth:''
        }
    },
    components: {
        popList,
        Toast
    },
    computed: {
        checkRealInfo () {
            if (this.realName && this.realAddress && this.realTel && this.realPostcode) {
                return true
            }
            return false
        }
    },
    methods: {
        copySucc,
        copyError,
        formateBalance,
        recordListFn () {
            this.setPopStore("setRecordList", true)
        },
        showProductDetail(e){
            this.product_detail = e
            this.setPopStore("setProductDetail", true)
        },
        showDetail (item) {
            this.activeItem = item
            if (item.goodstype === "2") {
                let deliverTip = window.localStorage && localStorage.getItem("noDeliverTip")
                if (!deliverTip) {
                    this.setPopStore("setRuleHelp", true)
                    return
                }
                this.setPopStore("setExchangeReal", true)
            } else {
                this.virtualCard = ""
                this.virtualPass = ""
                this.setPopStore("setExchangeVirtual", true)
            }
        },
        confirmDeliverTip () {
            if (this.deliverConfirm) {
                window.localStorage && localStorage.setItem("noDeliverTip", "true")
            }
            this.setPopStore("setRuleHelp", false)
            this.setPopStore("setExchangeReal", true)
        },
        confirmVirtual () {
            this.exchange(this.activeItem)
                .then(res => {
                    console.log(res)
                    this.virtualCard = "123456789"
                    this.virtualPass = "987654321"
                })
        },
        exchangeReal () {
            this.exchange(this.activeItem, this.aid)
                .then(() => {
                    this.setPopStore("setExchangeReal", false)
                })
        },
        getList () {
            let arr = []
            let displayArr = []
            if (this.acitveClass === "all") {
                arr = [...this.exchangeList]
            } else if (this.acitveClass === "card") {
                arr = this.exchangeList.filter(item => item.goodstype === "1")
            } else if (this.acitveClass === "electronics") {
                arr = this.exchangeList.filter(item => item.goodstype === "2")
            } else {
                arr = this.exchangeList.filter(item => item.goodstype !== "1" && item.goodstype !== "2")
            }

            arr.forEach((item, index) => {
                if (index % 2 === 0) {
                    displayArr.push([item])
                } else {
                    displayArr[displayArr.length - 1].push(item)
                }
            })
            return displayArr
        },
        getExchangeList () {
            this.$get("/shops/goods/list")
                .then(res => {
                    res.data.sort((a, b) => Number(a.weigth) > Number(b.weight) ? 1 : -1)
                    this.exchangeList = res.data
                })
        },
        getUserInfo () {
            this.$get("/simple/user/info").then(res => {
                this.avaliable_total = Number(res.data.avaliable_total)
            })
        },
        addAddress () {
            this.$post("/shipping/address/add", {
                consignee: this.realName,
                mobile: this.realTel,
                address: this.realAddress,
                postcode: this.realPostcode
            })
                .then(res => {
                    this.isCheckReal = true
                    this.aid = res.data.aid
                })
        },
        getUserAddress () {
            this.$post("/shipping/address/get")
                .then(res => {
                    this.realName = res.data.f_consignee || ""
                    this.realTel = res.data.f_mobile || ""
                    this.realAddress = res.data.f_address || ""
                    this.realPostcode = res.data.f_postcode || ""
                    this.aid = res.data.f_aid
                })
        },
        exchange (item, aid, amount = 1) {
            let data = {
                goodsid: item.id,
                amount
            }
            if (aid) {
                data.aid = aid
            }
            return this.$post("/shops/goods/exchange", data)
                .then(res => {
                    console.log(res)
                    return res
                })
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.newsWidth = this.$refs.newsWidth.clientWidth + 'px'
        })
        this.getExchangeList()
        this.getUserInfo()
        this.getUserAddress()
        window._this = this
    }
}
</script>

<style lang="less" type="text/less" scope>
@import "../../../styles/lib-mixins.less";
.page_mall {
  width: 750/75rem;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-size: 750/75rem;
  font-size: 24/75rem;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url(../img/bg_line.jpg) repeat-y;
    background-size: 750/75rem;
    .bg_header {
      width: 750/75rem;
      height: 600/75rem;
      background: url(../img/bg_mall.jpg) no-repeat center top;
      background-size: cover;
    }
  }
}
.header {
  width: 730/75rem;
  margin: 2/75rem auto 0;
  overflow: hidden;
  .btn {
    width: 72/75rem;
    height: 72/75rem;
    &.btn_back {
      background: url(../../../assets/img/icon_back.png) no-repeat center;
      background-size: cover;
    }
    &.btn_question {
      background: url(../../../assets/img/icon_question.png) no-repeat center;
      background-size: cover;
    }
    &.btn_list_redemption_record {
      margin: 0 23/75rem;
      background: url(../../../assets/img/icon_list_redemption_record.png)
        no-repeat center;
      background-size: cover;
      margin-right: 0;
    }
  }
  .my_balance {
    width: 197/75rem;
    height: 55/75rem;
    overflow: hidden;
    white-space: nowrap;
    background: url(../../../assets/img/my_balance.png) no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      opacity: 0.6;
    }
  }
  .fr {
    display: flex;
    align-items: center;
  }
}
.news {
  width: 739/75rem;
  height: 49/75rem;
  overflow: hidden;
  padding: 0 5%;
  line-height: 49/75rem;
  margin: 146/75rem auto 0;
  font-size: 0;
  color: #979ae1;
  transition: all 0.2s;
  background: url(../img/bg_new.png) no-repeat center;
    background-size: cover;
    font-size: 28/75rem;
  //   ul {
  //     display: flex;
  //     overflow: hidden;
  //     width: 9999999999px;
  //   }
  //   li {
  //     width: 739/75rem;
  //     text-align: center;
  //   }
  .news_main {
    overflow: hidden;
  }
  p {
    display: inline-block;
    white-space: nowrap;
     animation: scrollNew 10s linear infinite;
  }
}
.mall {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 52/75rem 0 0;
}
.mall_tab {
  width: 686/75rem;
  height: 58/75rem;
//   overflow: hidden;
  margin: 0 auto;
  border: 2/75rem solid #7952af;
  border-radius: 10/75rem;
  background: #5f4a82;
  box-shadow: 0 2/75rem 8/75rem 0 rgba(45, 44, 63, 0.75);
  ul {
    display: flex;
    height: 100%;
    line-height: 20/75rem;
  }
  li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    text-align: center;
    white-space: nowrap;
    & + li {
      border-left: 2/75rem solid #7952af;
    }
    &.on {
      background: #7952af;
    }
    &.hot {
      &::after {
        content: "";
        position: absolute;
        right: -2/75rem;
        top: -6/75rem;
        display: block;
        width: 33/75rem;
        height: 33/75rem;
        overflow: hidden;
        background: url(../../../assets/img/icon_hot.png) no-repeat center;
        background-size: cover;
        transform-origin: right;
        transform: scale(0.85);
      }
    }
  }
}
.mall_main {
  position: relative;
  width: 740/75rem;
  flex: 1;
  overflow: auto;
  margin: 30/75rem auto 0;
  ul {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding-bottom: 12/75rem;
    &::after {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: -25/75rem;
      content: "";
      display: block;
      background: url(../img/light.png) no-repeat bottom;
      background-size: 100%;
      width: 740/75rem;
      height: 117/75rem;
    }
  }
  li {
    position: relative;
    z-index: 2;
    width: 308/75rem;
    margin: 0 2/75rem;
    overflow: hidden;
    &:nth-child(2n + 1) {
      .reward_box {
        background: url(../img/bg_reward_right.png) no-repeat;
        background-size: cover;
      }
    }
    &:nth-child(2n) {
      .reward_box {
        background: url(../img/bg_reward_left.png) no-repeat;
        background-size: cover;
      }
    }
  }
  li.unlock {
    img {
      opacity: 0.4;
    }
    &::before {
      position: absolute;
      box-sizing: border-box;
      z-index: 2;
      top: 10/75rem;
      left: 40/75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      content: "Top up to unlock it";
      width: 215/75rem;
      height: 49/75rem;
      overflow: hidden;
      padding: 22/75rem 0 0 37/75rem;
      background: url(../img/icon_unlock.png) no-repeat center;
      background-size: cover;
      //   font-family: "openSans_bold";
      font-weight: bold;
      font-size: 16/75rem;
      white-space: nowrap;
    }
  }
  .reward_box {
    position: relative;
    width: 308/75rem;
    height: 243/75rem;
    padding-top: 15/75rem;
    img {
      width: 223/75rem;
      height: 163/75rem;
    }
  }
  .reward_name {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 70/75rem;
    text-align: center;
    white-space: nowrap;
    opacity: 0.6;
  }
  .btn_reward {
    position: relative;
    top: -4/75rem;
    width: 214/75rem;
    height: 76/75rem;
    overflow: hidden;
    margin: 0 auto;
    background: url(../img/btn_reward.png) no-repeat center;
    background-size: cover;
    font-weight: bold;
    font-size: 36/75rem;
    text-align: center;
    line-height: 76/75rem;
    white-space: normal;
    text-indent: 30/75rem;
  }
}
.nomsg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 200/75rem;
  width: 100%;
  background: url(../img/pop_record_nodata.png) no-repeat center top;
  background-size: 265/75rem;
  text-align: center;
  font-size: 30/75rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}

@keyframes scrollNew {
  0% {
    transform: translate(100%);
  }
  100% {
    transform: translate(-100%);
  }
}
</style>
