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
          <span>3568</span>
        </a>
        <a href="javascript:;" class="btn btn_list_redemption_record" @click="recordListFn"></a>
        <a href="javascript:;" class="btn btn_question"></a>
      </div>
    </div>
    <div class="news">
      <ul>
        <li>{{_('m_payment.mall_title')}}</li>
        <li>Earn gold coins to redeem gifts!!!!!</li>
        <li>Earn gold coins to redeem gifts!!!!!</li>
      </ul>
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
            <a href="javascript:;">
              {{_('m_payment.electronics')}}
            </a>
          </li>
          <li @click="acitveClass = 'other'" :class="{on: acitveClass === 'other'}">
            <a href="javascript:;">{{_('m_payment.other')}}</a>
          </li>
        </ul>
      </div>
      <div class="mall_main">
        <ul v-for="item in getList()" :key="`${item[0].id}-${item[1] ? item[1].id : '-'}`">
          <li :class="{unlock: item[0].islock === '1'}">
            <div class="reward_box">
              <img :src="item[0].imgurl" alt>
              <p class="reward_name">{{item[0].name}}</p>
            </div>
            <a href="javascript:" class="btn_reward" @click="showDetail(item[0])">{{item[0].needgolds}}</a>
          </li>
          <li :class="{unlock: item[1] && item[1].islock === '1'}">
              <template v-if="item[1]">
                <div class="reward_box">
                    <img :src="item[1].imgurl" alt>
                    <p class="reward_name">{{item[1].name}}</p>
                </div>
                <a href="javascript:" class="btn_reward" @click="showDetail(item[1])">{{item[1].needgolds}}</a>
              </template>
          </li>
        </ul>
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
    </transition> -->

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
    </div> -->

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
    </div> -->

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
    </div> -->

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
    </div> -->

    <!-- 虚拟商品兑换弹层 -->
    <!-- <div class="pop pop_exchange_virtual" :class="{hide: !showVirtualPop}">
      <div class="pop_main">
        <a href="javascript:" class="pop_close" @click="showVirtualPop = false"></a>
        <div class="h3 pop_name">{{_('m_payment.exchange_title')}}</div>
        <img class="product_img" src="@assets/img/amazon.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>
         兑换前
        <div class="card_msg card_msg_before">
          <p>
            <span>{{_('m_payment.card_no')}}:</span>
            <i class="card_layer"></i>
          </p>
          <p>
            <span>{{_('m_payment.password')}}:</span>
            <i class="card_layer"></i>
          </p>
        </div>
         兑换后
        <div class="card_msg card_msg_after hide">
          <p>
            <span>{{_('m_payment.card_no')}}:</span>
            <i class="card_psw">1256484359765815</i>
            <a href="javascript:;" class="btn_copy">{{_('m_payment.copy')}}</a>
          </p>
          <p>
            <span>{{_('m_payment.password')}}:</span>
            <i class="card_psw">654235654235654235654235654235654235</i>
            <a href="javascript:;" class="btn_copy">{{_('m_payment.copy')}}</a>
          </p>
        </div>
        <a href="javascript:" class="btn_default">{{_('m_payment.exchange_confirm')}}</a>
      </div>
    </div> -->

    <!-- 实物商品兑换弹层 -->
    <!-- <div class="pop pop_exchange_real" :class="{hide: !showRealPop}">
      <div class="pop_main">
        <a href="javascript:" class="pop_close" @click="showRealPop = false"></a>
        <div class="h3 pop_name">{{_('m_payment.exchange')}}</div>
        <img class="product_img" src="@assets/img/10g.png" alt>
        <p class="product_name">100 Amazon</p>
        <p class="product_use">1000 gift card for Amazon Mail</p>
         没填地址
        <div class="address_input">
          <input type="text" :placeholder="_('m_payment.name')">
          <input type="text" :placeholder="_('m_payment.phone')">
          todo placeholder样式缩小
          <input type="text" :placeholder="_('m_payment.address')">
          <input type="text" :placeholder="_('m_payment.code')">
          <a href="javascript:" class="btn_default">{{_('m_payment.exchange_confirm')}}</a>
        </div>
        填好地址
        <div class="address_check hide">
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.name1')}}:</span>
            <span class="user_c">吴阳阳</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.address1')}}:</span>
            <span class="user_c">深圳市龙岗神仙岭500.com大大厦深圳市龙岗神仙岭500.com大大厦</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.phone1')}}:</span>
            <span class="user_c">12345678888</span>
          </p>
          <p class="user_msg">
            <span class="user_t">{{_('m_payment.code1')}}:</span>
            <span class="user_c">1236546</span>
          </p>
          <div class="btn_choose">
            <a href="javascript:;" class="btn_back">{{_('m_payment.back_modify')}}</a>
            <a href="javascript:;" class="btn_default">{{_('m_payment.exchange_now')}}</a>
          </div>
        </div>
        兑换成功
        <div class="icon_success"></div>
      </div>
    </div> -->

    <!-- toast -->
    <div class="toast hide">toast</div>
  </div>
</template>

<script>
// 弹窗
import popList from "../components/Pop_list"
// 弹窗data
import mixins_pop from "../mixins/pop.js"

import {
    setTimeout
} from "timers"
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
            exchangeList: []
        }
    },
    components: {
        popList
    },
    computed: {

    },
    methods: {
        recordListFn(){
            this.setPopStore("setRecordList", true)
        },
        showDetail (item) {
            if (item.goodstype === "2") {
                let deliverTip = window.localStorage && localStorage.getItem("noDeliverTip")
                if (!deliverTip) {
                    this.showDeliverPop = true
                    return
                }
                this.showRealPop = true
            } else {
                this.showVirtualPop = true
            }
        },
        confirmDeliverTip () {
            if (this.deliverConfirm) {
                window.localStorage && localStorage.setItem("noDeliverTip", "true")
            }
            this.showDeliverPop = false
            this.showRealPop = true
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
            this.$get("http://192.168.14.19:8888/shops/goods/list?ck=MTAwMDE2OWFjZTNhMTM3ZDJmZDEyYzk3NTdhNzY1MmEyYWE3MGU4&platform=1&version=2&channel=3")
                .catch(err => {
                    return {
                        "status":"100",
                        "message":"ok",
                        "data":[{
                            "islock":"0",
                            "weight":"1",
                            "needgolds":"12521512",
                            "goodsdesc":"1",
                            "id":"50004",
                            "imgurl":"http:\/\/home.500.com\/main\/style\/5lin\/images\/5lin_link.png",
                            "updatetime":"0",
                            "name":"1",
                            "top_status":"0",
                            "activity_imgurl":"",
                            "usage":"",
                            "goodstype":"2"
                        },{
                            "islock":"0",
                            "weight":"10",
                            "needgolds":"100",
                            "goodsdesc":"100元亚马逊换购卡",
                            "id":"50002",
                            "imgurl":"http:\/\/149.129.138.180\/static\/amazon.png",
                            "updatetime":"0",
                            "name":"100元亚马逊卡",
                            "top_status":"0",
                            "activity_imgurl":"",
                            "usage":"",
                            "goodstype":"1"
                        },{
                            "islock":"0",
                            "weight":"50",
                            "needgolds":"1000",
                            "goodsdesc":"小米8s",
                            "id":"50003",
                            "imgurl":"http:\/\/149.129.138.180\/static\/mobile.png",
                            "updatetime":"0",
                            "name":"小米8s",
                            "top_status":"0",
                            "activity_imgurl":"",
                            "usage":"",
                            "goodstype":"2"
                        }]
                    }
                })
                .then(res => {
                    res.data.sort((a, b) => Number(a.weigth) > Number(b.weight) ? 1 : -1)
                    this.exchangeList = res.data
                })
        }
    },
    mounted () {
        this.getExchangeList()
        window._this = this
        setTimeout(() => {
            this.acitveClass = "1111111"
            // 设置值
            // this.setPopStore("setRecordList", true)
            // this.setPopStore("setRechangeMany", true)
            // this.setPopStore("setRuleHelp", true)
            // this.setPopStore("setExchangeTips", true)
            // this.setPopStore("setProductDetail", true)
            // this.setPopStore("setExchangeVirtual", true)
            // this.setPopStore("setExchangeReal", true)
        },5000)
    }
}
</script>

<style lang="less" type="text/less">
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
  line-height: 49/75rem;
  margin: 146/75rem auto 0;
  background: url(../img/bg_new.png) no-repeat center;
  background-size: cover;
  font-size: 28/75rem;
  color: #979ae1;
  ul {
    display: flex;
    overflow: hidden;
    width: 9999999999px;
  }
  li {
    width: 739/75rem;
    float: left;
    text-align: center;
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
  overflow: hidden;
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
        left: -2px;
        top: -1px;
        display: block;
        width: 33/75rem;
        height: 33/75rem;
        overflow: hidden;
        background: url(../../../assets/img/icon_hot.png) no-repeat center;
        background-size: cover;
      }
    }
  }
}
.mall_main {
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

.pop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  .pop_main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 674/75rem;
    //   height: 500px;
    background: #2d2a38 url(../../../assets/img/pop_gradient_bg.jpg) no-repeat
      top center;
    background-size: 668/75rem;
    border: 8/75rem solid rgba(147, 130, 99, 0.749);
    border-image-source: url(../../../assets/img/pop_border.png);
    border-image-slice: 15%;
    border-image-width: 10;
    border-image-repeat: stretch;
    border-radius: 10/75rem;
  }

  .pop_close {
    position: absolute;
    top: -34/75rem;
    right: -36/75rem;
    width: 92/75rem;
    height: 92/75rem;
    overflow: hidden;
    background: url(../../../assets/img/pop_close.png) no-repeat center;
    background-size: cover;
  }
  .pop_name {
    width: 367/75rem;
    height: 60/75rem;
    overflow: hidden;
    text-align: center;
    line-height: 60/75rem;
    background: url(../../../assets/img/pop_title_bg.png) no-repeat center;
    background-size: cover;
    font-size: 36/75rem;
    font-weight: bold;
    margin: 0 auto;
    color: #cbd9ef;
  }
  .btn_choose {
    display: flex;
    justify-content: space-between;
    width: 552/75rem;
    margin: 0 auto;
  }
  .btn_default,
  .btn_back {
    //   top 3 bottom 9 leftright 6
    width: 213/75rem;
    height: 76/75rem;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
    line-height: 76/75rem;
    font-size: 34/75rem;
    font-weight: bold;
    &.btn_default {
      background: url(../../../assets/img/btn_default.png) no-repeat center;
      background-size: cover;
    }
    &.btn_back {
      background: url(../../../assets/img/btn_back.png) no-repeat center;
      background-size: cover;
    }
    &.disable {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
.pop_list_redemption_record {
  .pop_main {
    display: flex;
    flex-direction: column;
    height: 1020/75rem;
  }
  .redemption_record {
    flex: 1;
    margin: 18/75rem 0;
    overflow: auto;
  }
  ul {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(52, 53, 82, 0.3);
    border: 2/75rem solid #443e6d;
    width: 594/75rem;
    height: 217/75rem;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 8/75rem;
    & + li {
      margin-top: 14/75rem;
    }
  }
  .record_img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 230/75rem;
    img {
    }
    .record_name {
    }
  }
  .record_msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 330/75rem;
    height: 157/75rem;
    overflow: hidden;
    font-size: 22/75rem;
  }
  .record_view {
    p {
      display: flex;
      align-items: flex-start;
      line-height: 1.2;
      min-height: 40/75rem;
    }
    span {
      white-space: nowrap;
    }
    i {
      word-break: break-all;
    }
  }
  .record_time {
    line-height: 40/75rem;
  }
}
.pop_rule {
  .pop_rule_main {
    width: 616/75rem;
    max-height: 1000/75rem;
    overflow: auto;
    padding: 12/75rem 16/75rem 20/75rem 40/75rem;
    line-height: 44/75rem;
    font-size: 26/75rem;
    margin: 54/75rem auto 25/75rem;
    background-color: rgba(20, 18, 30, 0.302);
    box-shadow: inset 0/75rem 1/75rem 2/75rem 0/75rem rgba(9, 8, 14, 0.75);
    border-radius: 10/75rem;
  }
  p + p {
    margin-top: 44/75rem;
  }
  .rechange_tips {
    margin-top: 37/75rem;

    .tips_form {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 86/75rem;
    }
    input {
      display: none;
    }
    .icon_checkbox {
      display: block;
      width: 43/75rem;
      height: 35/75rem;
      overflow: hidden;
      margin-right: 8/75rem;
      background: url(../../../assets/img/checkbox_green.png) no-repeat center;
      background-size: cover;
      white-space: nowrap;
      &.on {
        background: url(../../../assets/img/checkbox_green_on.png) no-repeat
          center;
        background-size: cover;
      }
    }
  }
  .btn_default {
    margin-bottom: 4/75rem;
  }
}
.pop_exchange_virtual {
  text-align: center;
  .product_img {
    width: percentage(223/674);
    margin: 30/75rem auto 26/75rem;
  }
  .product_name {
    line-height: 58/75rem;
    font-size: 30/75rem;
  }
  .product_use {
    height: 120/75rem;
    line-height: 52/75rem;
    font-size: 20/75rem;
    opacity: 0.3;
  }
  .card_msg {
    padding-left: 60/75rem;
    text-align: left;
    font-size: 28/75rem;
    white-space: nowrap;
    p {
      display: flex;
      align-items: center;
      height: 51/75rem;
    }
    p + p {
      margin-top: 22/75rem;
    }
  }
  .card_layer {
    display: block;
    width: 363/75rem;
    height: 51/75rem;
    overflow: hidden;
    margin-left: 10/75rem;
    background: url(../img/card_layer.png) no-repeat center;
    background-size: cover;
  }
  .card_psw {
    display: block;
    padding-right: 10/75rem;
    width: 360/75rem;
    overflow: hidden;
    margin-left: 24/75rem;
    .text-overflow();
  }
  .btn_copy {
    position: relative;
    width: 81/75rem;
    height: 35/75rem;
    //   overflow: hidden;
    border-radius: 18/75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20/75rem;
    &::after {
      content: "";
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      border: 1px solid #fff;
      transform-origin: left top;
      transform: scale(0.5);
      border-radius: 14/75rem;
    }
  }
  .btn_default {
    margin: 80/75rem auto 92/75rem;
  }
}

.pop_rechange_many {
  .product_img {
    width: percentage(223/674);
    margin: 30/75rem auto 26/75rem;
  }
  .product_msg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product_name {
    line-height: 57/75rem;
    padding: 0 12/75rem;
    font-size: 36/75rem;
    background: #322e3e;
    font-weight: bold;
  }
  .product_count {
    font-size: 32/75rem;
    color: #febb2c;
  }
  .product_use {
    display: table;
    margin: 10/75rem auto;
    padding: 0 22/75rem;
    line-height: 57/75rem;
    font-size: 20/75rem;
    background: #322e3e;
    color: #807e86;
  }
  .pop_rechange_many_main {
    width: 616/75rem;
    max-height: 290/75rem;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12/75rem 0 20/75rem 0;
    line-height: 50/75rem;
    font-size: 28/75rem;
    margin: 0 auto;
    background-color: rgba(20, 18, 30, 0.302);
    box-shadow: inset 0/75rem 1/75rem 2/75rem 0/75rem rgba(9, 8, 14, 0.75);
    border-radius: 10/75rem;
  }
  .pop_rechange_many_list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 620/75rem;
    height: 127/75rem;
    padding: 0 66/75rem;
    overflow: hidden;
    margin: 0 auto 0;
    background: url(../../../assets/img/icon_pop_line.png) no-repeat center
      bottom;
    background-size: 100%;
    white-space: nowrap;
    p {
      display: flex;
      overflow: hidden;
    }
  }
  .card_num {
    opacity: 0.3;
  }
  .card_psw {
    margin-left: 24/75rem;
    .text-overflow();
  }

  .pop_rechange_many_before {
    text-align: center;
  }
  .text_error {
    margin: 27/75rem 0 0;
    line-height: 62/75rem;
    font-size: 30/75rem;
    color: #ff3a2b;
  }
  .input_box {
    display: flex;
    align-items: center;
    width: 304/75rem;
    height: 78/75rem;
    overflow: hidden;
    margin: 0 auto 0;
    border: 3/75rem solid #534c78;
    background: #534c6f;
    border-radius: 10/75rem;
    .btn {
      height: 100%;
      flex: 1;
      text-indent: 999999px;
      font-size: 0;
      &.btn_delete {
        background: #38324e url(../../../assets/img/icon_delete.png) no-repeat
          center;
        background-size: 21/75rem;
      }
      &.btn_add {
        background: #38324e url(../../../assets/img/icon_add.png) no-repeat
          center;
        background-size: 21/75rem;
      }
    }
    input {
      border-left: 2/75rem solid #534c78;
      border-right: 2/75rem solid #534c78;
      width: 206/75rem;
      height: 100%;
      background: #23202e;
      color: #fff;
      font-size: 36/75rem;
      text-align: center;
    }
  }
  .text_tips {
    height: 95/75rem;
    line-height: 66/75rem;
    font-size: 28/75rem;
    opacity: 0.3;
  }
  .btn_default {
    margin: 40/75rem auto 30/75rem;
  }
}

.pop_exchange_real {
  text-align: center;
  .product_img {
    width: percentage(223/674);
    margin: 30/75rem auto 26/75rem;
  }
  .product_name {
    line-height: 58/75rem;
    font-size: 30/75rem;
  }
  .product_use {
    line-height: 52/75rem;
    font-size: 20/75rem;
    opacity: 0.3;
  }
  input {
    display: block;
    width: 605/75rem;
    height: 90/75rem;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 10/75rem;
    line-height: 90/75rem;
    background: rgba(31, 28, 41, 0.75);
    border: 2/75rem solid rgba(113, 102, 175, 0.75);
    font-size: 30/75rem;
    color: #fff;
    text-indent: 28/75rem;
    &::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.3);
      font-size: 30/75rem;
      //   font-size: 20/75rem;
    }
    & + input {
      margin-top: 12/75rem;
    }
  }
  .user_msg {
    display: flex;
    text-align: left;
    line-height: 50/75rem;
    font-size: 28/75rem;
    .user_t {
      width: 190/75rem;
      text-indent: 54/75rem;
      white-space: nowrap;
      opacity: 0.3;
    }
    .user_c {
      width: 420/75rem;
    }
    & + .user_msg {
      margin-top: 15/75rem;
    }
  }
  .address_input {
    .btn_default {
      margin: 47/75rem auto 53/75rem;
    }
  }
  .btn_choose {
    margin: 74/75rem auto 53/75rem;
  }
  .icon_success {
    position: absolute;
    top: 170/75rem;
    right: 200/75rem;
    width: 74/75rem;
    height: 74/75rem;
    overflow: hidden;
    background: #39b607 url(../../../assets/img/pop_confirm.png) no-repeat
      center;
    background-size: 55/75rem;
    border-radius: 50%;
  }
}
.pop_product_detailed {
  text-align: center;
  .product_img {
    width: percentage(223/674);
    margin: 30/75rem auto 26/75rem;
  }
  .product_name {
    line-height: 58/75rem;
    font-size: 30/75rem;
  }
  .product_use {
    line-height: 52/75rem;
    font-size: 20/75rem;
    opacity: 0.3;
  }
  .product_nedd {
    display: flex;
    justify-content: center;
    margin: 50/75rem auto 70/75rem;
  }
}
</style>
