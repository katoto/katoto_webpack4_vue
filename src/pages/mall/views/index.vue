<template>
  <div class="fullscreen page_mall">
    <div class="bg">
      <div class="bg_header"></div>
    </div>
    <div class="header">
      <div class="fl">
        <a href="javascript:;" class="btn btn_back" @click="closeView"></a>
      </div>
      <div class="fr">
        <a href="javascript:;" class="my_balance" @click="jumpToWithdraw">
          <span>{{formateBalance(gold_total)}}</span>
        </a>
        <a href="javascript:;" class="btn btn_list_redemption_record" @click="setPopStore('setRecordList', true)"></a>
        <a href="javascript:;" class="btn btn_question" @click="setPopStore('setExchangeTips', true)" v-if="false"></a>
      </div>
    </div>
    <!-- todo 提成公共组件轮询新闻 -->
    <div class="news">
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
              <i class="unlock-tip">{{_('m_payment.unlock_tip')}}</i>
              <div class="reward_box" @click="showProductDetail(item[0])">
                <img :src="item[0].imgurl" alt>
                <p class="reward_name">{{item[0].name}}</p>
              </div>
              <a href="javascript:" class="btn_reward" @click="showDetail(item[0])">{{formateBalance(item[0].needgolds)}}</a>
            </li>
            <li :class="{unlock: item[1] && item[1].islock === '1'}">
              <i class="unlock-tip">{{_('m_payment.unlock_tip')}}</i>
              <template v-if="item[1]">
                <div class="reward_box" @click="showProductDetail(item[1])">
                  <img :src="item[1].imgurl" alt>
                  <p class="reward_name">{{item[1].name}}</p>
                </div>
                <a href="javascript:" class="btn_reward" @click="showDetail(item[1])">{{formateBalance(item[1].needgolds)}}</a>
              </template>
            </li>
          </ul>
        </template>
        <div class="nomsg" v-else-if="getList().length==0">{{ _('m_payment.sm_nodata') }}</div>
        <div class="common_loading" v-else></div>
      </div>
    </div>
    <!-- 初始化全部的弹窗   -->
    <popList></popList>
  </div>
</template>

<script>
import {
    formateBalance, cbetLocal
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
            exchangeList: [],
            virtualCard: "",
            virtualPass: "",
            virtualCardStatus: false,
            realName: "",
            realAddress: "",
            realTel: "",
            realPostcode: "",
            isCheckReal: false,
            isChangeReal: false,
            gold_total: "0",
            aid: "",
            activeItem: {},
            newsWidth: "",
            userInfo: false,
            covert_message: {
                convert: {
                    cards: []
                }
            }
        }
    },
    components: {
        popList
    },
    computed: {
        checkRealInfo () {
            if (this.realName && this.realAddress && this.realTel && this.realPostcode) {
                return true
            }
            return false
        },
        isLog () {
            return this.userInfo && this.userInfo.user_type !== "guest"
        }
    },
    methods: {
        formateBalance,
        showProductDetail (e) {
            this.product_detail = e
            this.setPopStore("setProductDetail", true)
        },
        showDetail (item) {
            this.activeItem = item
            if (!this.isLog) {
                this.$toast({
                    content: _("please_login")
                })
                return
            }
            if (item.islock === "1") {
                this.$toast({ content: _("m_payment.unlock_tip") })
                return
            }
            if (item.goodstype === "1") {
                this.virtualCard = ""
                this.virtualPass = ""
                this.setPopStore("setExchangeVirtual", true)
            } else {
                let deliverTip = window.localStorage.getItem("no_deliver_tip")
                // 重置 兑换成功状态
                this.isChangeReal = false
                if (!deliverTip) {
                    this.setPopStore("setRuleHelp", true)
                    return
                }
                this.setPopStore("setExchangeReal", true)
            }
        },
        showCardDetail (cardno, password, virtualCardStatus, item) {
            this.activeItem = item
            this.virtualCard = cardno
            this.virtualPass = password
            this.virtualCardStatus = virtualCardStatus
            this.setPopStore("setExchangeVirtual", true)
        },
        confirmDeliverTip () {
            this.setPopStore("setRuleHelp", false)
            this.setPopStore("setExchangeReal", true)
        },
        confirmVirtual () {
            if (this.virtualCard && this.virtualPass) {
                this.setPopStore("setExchangeVirtual", false)
                return
            }
            this.exchange(this.activeItem)
                .then(res => {
                    this.virtualCard = res.data.cardno
                    this.virtualPass = res.data.password
                    this.virtualCardStatus = res.data.review === "False"
                    this.getUserInfo()
                })
        },
        exchangeReal () {
            this.exchange(this.activeItem, this.aid)
                .then(() => {
                    this.isChangeReal = true
                    this.getUserInfo()
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
                this.gold_total = Number(res.data.gold_total)
                this.userInfo = res.data
            })
        },
        addAddress () {
            if (!this.checkRealInfo) {
                return
            }
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
                    if (this.aid) {
                        this.isCheckReal = true
                    }
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
                    return res
                })
        },
        jumpToWithdraw () {
            cbetLocal({
                func: "jumpToLocal",
                params: {
                    content: "jp://ShopScene"
                }
            })
        },
        closeView () {
            cbetLocal({
                func: "closeWebview",
                params: {}
            })
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.newsWidth = this.$refs.newsWidth.clientWidth + "px"
        })
        this.getExchangeList()
        this.getUserInfo()
        this.getUserAddress()
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
    .unlock-tip {
      display: none;
      position: absolute;
      box-sizing: border-box;
      z-index: 2;
      top: 10/75rem;
      left: 40/75rem;
      align-items: center;
      justify-content: center;
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
  li.unlock {
    img {
      opacity: 0.4;
    }
    .unlock-tip {
      display: flex;
    }
    .btn_reward {
      background: url(../img/btn_reward_lock.png) no-repeat center;
      background-size: cover;
      color: rgba(255, 255, 255, 0.4);
    }
  }
  .reward_box {
    position: relative;
    width: 308/75rem;
    height: 243/75rem;
    padding-top: 20/75rem;
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
