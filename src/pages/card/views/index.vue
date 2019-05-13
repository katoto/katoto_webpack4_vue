<template>
    <div class="page_card" :class="[inList?'lists':'card']">
        <div class="bg_card" v-show="!inList" ref="bg_card"></div>
        <header class="card_header">
            <a class="btn_back" @click="handleBack" key="btn_back"></a>
            <template v-if="inList">
                <a class="btn_card" key="starcard" v-hidden="true">Star Card</a>
                <a class="btn_gift" key="gift" @click="href('/amazon.html')">{{_('m_card.prize')}}</a>
            </template>
            <template v-else>
                <!-- todo -->
                <a class="btn_star" key="Star" v-hidden="true">
                    Star Card 0
                    <transition name="starChange">
                        <i class="starChange" v-if="starChange">+1</i>
                    </transition>
                </a>

            </template>
            <a class="btn_ticket" @click="handlePop('pop_ticket',true)" key="btn_ticket">
                {{userInfo.total_card || 0}}
                <transition name="ticketChange">
                    <i class="ticketChange" v-if="ticketChange">+{{add_ticket_num}}</i>
                </transition>
            </a>
        </header>
        <template v-if="inList">
            <div class="news">
                <ul>
                    <broadcast :time="userInfo.broadcast ? userInfo.broadcast.length * 1 : 0">
                        <li v-for="(item, index) in userInfo.broadcast" :key="index" v-html="_(item.prize_type === 'golds' ? 'm_card.broadcast1' : 'm_card.broadcast', item.username, formatterNum(item.prize_amount || 0))"></li>
                    </broadcast>
                </ul>
            </div>
            <div class="actlists">
                <div class="act">
                    <p>{{_('m_card.title')}}</p>
                    <a class="btn_question hide"></a>
                </div>
                <ul>
                    <li class="actlist regular" @click="goView">
                        <div class="bg"></div>
                        <p class="actlist_view hide">Giving Cricket Star Card</p>
                    </li>
                </ul>
            </div>
            <div class="more">
                <p>
                    More scratch CARDS are in the works
                    <br>
                    Please coming soon
                </p>
            </div>
        </template>

        <template v-else>
            <div class="ticket_title"></div>
            <div class="ticket_bonus"></div>
            <card :class="{'on': isShowCard}" @getPrize="getPrize" ref="card"></card>
            <transition enter-active-class="animated bounceIn">
                <div class="balance" v-show="balance">
                    <p>{{formatterNum(userInfo.gold_total || 0)}}</p>
                </div>
            </transition>
        </template>

        <!-- pop -->
        <div class="pop_layer" v-if="pop_layer" @click="handlePop('all', false)">
            <coins v-if="pop_coins"></coins>
            <ribbon v-if="pop_celebtity || pop_amazon"></ribbon>
        </div>
        <!-- 购买门票 -->
        <transition name="pop_animate">
            <div class="pop_ticket" v-if="pop_ticket">
                <div class="pop_ticket_header">
                    <p class="myticket">{{userInfo.total_card || 0}}</p>
                    <p class="mycoins">{{formatterNum(userInfo.gold_total || 0)}}</p>
                </div>
                <a class="btn_close" @click="handlePop('pop_ticket', false)"></a>
                <p class="title">{{_('m_card.getcard')}}</p>
                <ul class="list">
                    <li @click="goAD">
                        <div class="ticket_count">x1</div>
                        <p class="ticket_msg">{{_('m_card.watch')}}</p>
                    </li>
                    <li @click="invite" v-if="canInvite">
                        <div class="ticket_count">x10</div>
                        <p class="ticket_msg">{{_('m_card.inviting')}}</p>
                    </li>
                    <li @click="buyCard('1')">
                        <div class="ticket_count">x1</div>
                        <p class="ticket_msg">{{_('m_card.spending500')}}</p>
                    </li>
                    <li @click="buyCard('10')">
                        <div class="ticket_count">x10</div>
                        <p class="ticket_msg">{{_('m_card.spending5000')}}</p>
                    </li>
                </ul>
            </div>
        </transition>
        <!-- 获得金币 -->
        <transition name="pop_animate">
            <div class="pop_coins" v-if="pop_coins" @click="handlePop('coins', false)">
                <p>{{_('m_card.congratulations')}}</p>
                <p class="bold">{{formatterNum(golds_amount)}} coins</p>
            </div>
        </transition>
        <!-- 获得球星卡 -->
        <transition name="pop_animate">
            <div class="pop_celebtity"  v-if="pop_celebtity">
                <p class="title">
                    Congratulations!
                    <br>
                    Get a star card
                </p>
                <img src="../img/img_celebtity.png" alt="">
            </div>
        </transition>
        <!-- 获得亚马逊卡 -->
        <transition name="pop_animate">
            <div class="pop_amazon"  v-if="pop_amazon">
                <p class="title">
                    {{_('m_card.congratulations')}}
                </p>
                <img src="../img/img_amazon.png" alt="">
                <a class="btn btn_get" @click="href('/amazon.html')">
                    Get Now
                </a>
                <a class="btn btn_continue" @click="handlePop('amazon', false)">
                    Continue
                </a>
            </div>
        </transition>
        <!-- 赠送两张门票 -->
        <transition name="pop_animate">
            <div class="pop_freeTicket" v-if="pop_freeTicket">
                <p>{{_('m_card.welcome')}}</p>
                <p>{{_('m_card.getCardSuccess')}}</p>
                <div class="icon">
                    <p class="p1">x</p>
                    <p class="p2">2</p>
                </div>
                <a class="btn" @click="handlePop('all', false)">{{_('m_card.m_freeticket_btn')}}</a>
            </div>
        </transition>
        <load v-if="loading"></load>
    </div>
</template>

<script>
import event from "@/common/event"
import card from "./card.vue"
import ribbon from "./ribbon.vue"
import coins from "./coins.vue"
import {
    formatterNum, cbetLocal, getURLParams
} from "@/common/util"
// 通用播报
import broadcast from "@/components/broadcast"
import load from "@/components/loading"
export default {
    data () {
        return {
            /* 在列表页？ */
            inList: true,
            /* 修改头部门票数量 */
            ticketChange: false,
            /* 修改明星卡数量 */
            starChange: false,
            pop_ticket: false,
            pop_coins: false,
            pop_celebtity: false,
            pop_amazon: false,
            pop_freeTicket: false,
            isShowCard: false,
            golds_amount: 0,
            add_ticket_num: 1,
            userInfo: {},
            // 金币余额
            balance: false,
            loading: false,
            canInvite: false,
            isReady: false
        }
    },
    components: {
        card,
        ribbon,
        coins,
        broadcast,
        load
    },
    computed: {
        pop_layer () {
            return this.pop_ticket || this.pop_coins || this.pop_celebtity || this.pop_amazon || this.pop_freeTicket
        }
    },
    methods: {
        formatterNum,
        href (href) {
            location.href = `${href}${location.search}`
        },
        wait (time) {
            return new Promise(resolve => {
                setTimeout(() => resolve(true), time)
            })
        },
        async addCoinAnimate () {
            this.balance = true
            await this.wait(1000)
            this.userInfo.gold_total = Number(this.userInfo.gold_total) + Number(this.golds_amount)
        },
        handlePop (pop, show) {
            if ((this.pop_coins || this.pop_amazon)) {
                Promise.all([
                    this.getUserInfo(),
                    this.wait(1800)
                ])
                    .then(res => {
                        res = res[0]
                        if (Number(res.data.total_card) > 0) {
                            this.$refs.card && this.$refs.card.init()
                        } else {
                            this.pop_ticket = true
                            this.inList = false
                        }
                    })
                this.balance = false
            } else if (this.pop_freeTicket) {
                this.showAddTicket(2)
            }
            if (!show) {
                this.pop_ticket = false
                this.pop_coins = false
                this.pop_celebtity = false
                this.pop_amazon = false
                this.pop_freeTicket = false
            } else {
                this[pop] = show
            }
        },
        goView (e) {
            if (!this.isReady) {
                return
            }
            if (this.userInfo && Number(this.userInfo.total_card) > 0) {
                setTimeout(() => {
                    this.inList = false
                }, 300)
            } else {
                this.pop_ticket = true
            }
        },
        getUserInfo () {
            return this.$get("/api/scratch/list").then(res => {
                this.isReady = true
                // 获取用户金额
                this.userInfo = {
                    ...res.data
                }
                if (this.userInfo.is_first !== "False") {
                    this.pop_freeTicket = true
                }
                return res
            })
        },
        handleBack () {
            if (this.inList) {
                // 回到客户端首页
                cbetLocal({
                    func: "closeWebview",
                    params: {}
                })
            } else {
                // 返回列表页
                this.inList = true
            }
        },
        goAD () {
            this.loading = true
            // 观看广告
            cbetLocal({
                func: "jumpToLocal",
                params: {
                    content: "jp://showAdVideo?type=3",
                    hold: "1"
                }
            })
        },
        showAdVideoCallback (isSuccess) {
            // todo 需增加一个看完广告 得到奖励的告知
            if (isSuccess) {
                this.getUserInfo()
            } else {
                this.$toast({
                    content: _("m_card.adLoading")
                })
            }
            this.loading = false
        },
        getPrize (card) {
            if (card.card_result === "H") {
                // 获得亚马逊卡
                this.pop_amazon = true
            } else {
                // 获得金币
                this.pop_coins = true
            }
            this.golds_amount = Number(card.golds_amount)
            this.addCoinAnimate()
        },
        buyCard (amount) {
            if (Number(this.userInfo.gold_total) - (500 * Number(amount)) > 0) {
                this.loading = true
                this.$post("/api/scratch/buy", {
                    amount
                }).then(() => {
                    this.loading = false
                    this.userInfo.gold_total = Number(this.userInfo.gold_total) - (500 * Number(amount))
                    this.userInfo.total_card = Number(this.userInfo.total_card) + Number(amount)
                    this.getUserInfo()
                    // this.showAddTicket()
                }).catch(err => {
                    this.loading = false
                })
            } else {
                this.$toast({
                    content: _("m_card.nogold")
                })
            }
        },
        async showAddTicket (num) {
            this.add_ticket_num = Number(num)
            this.$nextTick(async () => {
                this.ticketChange = true
                await this.wait(500)
                this.ticketChange = false
            })
        },
        invite () {
            cbetLocal({
                func: "jumpToLocal",
                params: {
                    content: "jp://HomeScene?view=invite",
                    hold: "0"
                }
            })
        },
        getInvite () {
            let data = getURLParams()
            if (data.uid) {
                this.$post("/invite/info", {
                    userid: data.uid
                }).then(res => {
                    this.canInvite = Number(res.data.config.invite_limit) > Number(res.data.info.invited_num)
                })
            }
        }
    },
    mounted () {
        this.getUserInfo()
        this.getInvite()
        event.$on("showAdVideoCallback", this.showAdVideoCallback)
    }
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
.page_card {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  &.lists {
    display: flex;
    flex-direction: column;
    background: #dce6f3;
    padding-bottom: 66 * @vw;
    .card_header {
      background: #ed3744;
      font-size: 22 * @vw;
      color: #fff;
    }
  }
  &.card {
    // background: #b31b58 url(../img/ticket_bg.jpg) no-repeat top center;
    // background-size: 100%;
    .btn_ticket {
      margin-left: 19 * @vw;
    }
  }
}
.bg_card {
  //todo位置暂时写死，应该从列表页获取
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 330 * @vw;
  transform: translate(-50%, 0);
  width: 670 * @vw;
  height: 454 * @vw;
  background: url(../img/icon_card.jpg) no-repeat center -60 * @vw;
  background-size: 100%;
  border-radius: 16 * @vw;
  animation: bgMove 0.2s cubic-bezier(0, 0, 0.67, -0.11) both;
  transform-origin: center;
}
@keyframes bgMove {
  0% {
  }
  100% {
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 0;
    background-position: center top;
  }
}
.card_header {
  display: flex;
  align-items: center;
  padding: 0 20 * @vw;
  height: 120 * @vw;
  overflow: hidden;
  white-space: nowrap;
  line-height: 48 * @vw;
  text-align: center;
  .btn_back {
    width: 50 * @vw;
    height: 50 * @vw;
    overflow: hidden;
    background: url(../img/btn_back.png) no-repeat center;
    background-size: cover;
  }
  .btn_card,
  .btn_gift {
    overflow: hidden;
    margin-top: 20 * @vw;
    padding-top: 52 * @vw;
    min-width: 66 * @vw;
    background-size: 66 * @vw;
    background-repeat: no-repeat;
    transition-duration: 0ms;
  }
  .btn_card {
    margin-left: 155 * @vw;
    background-image: url(../img/icon_card.png);
    background-position: center top;
  }
  .btn_gift {
    margin-left: 70 * @vw;
    background-image: url(../img/icon_amazon.png);
    background-position: center top;
  }
  .btn_star {
    position: relative;
    margin-left: auto;
    height: 60 * @vw;
    line-height: 60 * @vw;
    overflow: hidden;
    border-radius: 30 * @vw;
    background: #363a46;
    padding: 0 25 * @vw;
    opacity: 0;
    animation: fadeIn 0.5s cubic-bezier(0.73, -0.2, 1, 1) both;
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: -50%;
      width: 100%;
      height: 100%;
      border-radius: 30 * @vw;
      background: #4c5160;
      z-index: -1;
    }
  }
  .btn_ticket {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 195 * @vw;
    height: 60 * @vw;
    // overflow: hidden;
    background: url(../img/btn_ticket.png) no-repeat center;
    background-size: cover;
    font-size: 36 * @vw;
    font-weight: bold;
    margin-left: auto;
    i {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12 * @vw;
      color: #fff100;
    }
  }
}
.ticket_title {
  width: 444 * @vw;
  height: 181 * @vw;
  overflow: hidden;
  //   background: url(../img/ticket_title.png) no-repeat center;
  //   background-size: cover;
  margin: 0 0 0 25 * @vw;
}
.ticket_bonus {
  width: 419 * @vw;
  height: 166 * @vw;
  overflow: hidden;
  //   background: url(../img/ticket_bonus.png) no-repeat center;
  //   background-size: cover;
  margin: 2 * @vw 0 0 45 * @vw;
}

.balance {
  position: fixed;
  z-index: 100;
  bottom: 0;
  right: 65 * @vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 620 * @vw;
  height: 112 * @vw;
  overflow: hidden;
  p {
    background: url(../img/icon_c.png) no-repeat center left;
    background-size: 40 * @vw 40 * @vw;
    padding-left: 50 * @vw;
    line-height: 40 * @vw;
    font-size: 36 * @vw;
    font-weight: bold;
  }
}

.ticketChange-enter-active {
  animation: enter 0.5s both;
}
@keyframes enter {
  0% {
    transform: translate(-50%, 20%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
}

.pop_layer {
  position: fixed;
  canvas {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
  }
}
.pop_coins {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  line-height: 1;
  text-align: center;
  color: #febb2b;
  font-size: 72 * @vw;
  p + p {
    margin-top: 40 * @vw;
  }
}
.pop_ticket {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  width: 622 * @vw;
  padding: 0 42 * @vw 52 * @vw;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 15 * @vw;
  overflow: hidden;
  font-weight: bold;
  white-space: nowrap;
  .pop_ticket_header {
    display: flex;
    margin-top: 20 * @vw;
    height: 80 * @vw;
    color: #333333;
    font-size: 36 * @vw;
    font-weight: bold;
  }
  .myticket {
    display: flex;
    align-items: center;
    height: 80 * @vw;
    min-width: 120 * @vw;
    padding-right: 20 * @vw;
    background: url(../img/icon_ticket.png) no-repeat left center;
    background-size: 41 * @vw;
    padding-left: 50 * @vw;
  }
  .mycoins {
    display: flex;
    align-items: center;
    height: 80 * @vw;
    background: url(../img/icon_c.png) no-repeat left center;
    background-size: 40 * @vw;
    padding-left: 50 * @vw;
  }
  .btn_close {
    position: absolute;
    top: 20 * @vw;
    right: 30 * @vw;
    width: 71 * @vw;
    height: 71 * @vw;
    overflow: hidden;
    background: url(../img/btn_close.png) no-repeat center;
    background-size: 31 * @vw;
  }
  .title {
    height: 120 * @vw;
    text-align: center;
    line-height: 104 * @vw;
    overflow: hidden;
    color: #333333;
    font-size: 44 * @vw;
  }
  .list {
    display: block;
    li {
      display: flex;
      width: 540 * @vw;
      height: 100 * @vw;
      overflow: hidden;
      border-radius: 16 * @vw;
      transition: all 0.2s;
      &:active {
        transform: scale(0.8);
      }
    }
    li:first-child {
      .ticket_count {
        background-color: #3ec184;
      }
      .ticket_msg {
        background: #31aa6c;
      }
    }
    li + li {
      margin-top: 23 * @vw;
    }
    .ticket_count {
      display: flex;
      align-items: center;
      width: 165 * @vw;
      height: 100%;
      text-indent: 90 * @vw;
      background: #f36700 url(../img/icon_ticket_white.png) no-repeat 40 * @vw
        center;
      background-size: 31 * @vw;
      font-size: 36 * @vw;
    }
    .ticket_msg {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 35 * @vw;
      background: #ec4e00;
    }
  }
}
.pop_celebtity {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 68 * @vw;
  font-size: 64 * @vw;
  color: #febb2b;
  font-weight: bold;
  img {
    width: 502 * @vw;
    margin-top: 20 * @vw;
  }
}
.pop_amazon {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 110 * @vw;
  font-size: 64 * @vw;
  color: #febb2b;
  font-weight: bold;
  img {
    width: 394 * @vw;
  }
  .btn {
    width: 426 * @vw;
    height: 88 * @vw;
    text-align: center;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 44 * @vw;
    font-size: 44 * @vw;
    &.btn_get {
      margin-top: 70 * @vw;
      background: #febb2b;
      color: #1c1c1c;
      line-height: 88 * @vw;
    }
    &.btn_continue {
      margin-top: 40 * @vw;
      border: 6 * @vw solid #fff;
      line-height: 72 * @vw;
    }
    &:active {
      transform: scale(0.8);
    }
  }
}
.pop_freeTicket {
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 80%;
  transform: translate(-50%, -50%);
  z-index: 99;
  line-height: 60 * @vw;
  text-align: center;
  white-space: nowrap;
  font-size: 48 * @vw;
  color: #fff;
  font-weight: bold;
  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin: 75 * @vw 0 66 * @vw 0;
    &::before {
      content: "";
      display: block;
      width: 125 * @vw;
      height: 129 * @vw;
      background: url(../img/icon_ticket.png) no-repeat center;
      background-size: 125 * @vw;
    }
    .p1 {
      font-size: 64 * @vw;
      margin: 0 20 * @vw 0 10 * @vw;
    }
    .p2 {
      font-size: 96 * @vw;
    }
  }
  .btn {
    width: 426 * @vw;
    height: 88 * @vw;
    overflow: hidden;
    margin: 0 auto;
    line-height: 76 * @vw;
    border: 6 * @vw solid #fff;
    border-radius: 44 * @vw;
  }
}

/* lists */
.news {
  width: 706 * @vw;
  height: 54 * @vw;
  overflow: hidden;
  line-height: 54 * @vw;
  white-space: nowrap;
  border-radius: 26 * @vw;
  margin: 30 * @vw auto 0;
  font-size: 26 * @vw;
  color: #363a46;
  background: #fff url(../img/icon_news.png) no-repeat 20 * @vw center;
  background-size: 28 * @vw;
  text-indent: 65 * @vw;
  ul {
    margin: 0 30px;
  }
  /deep/ .red {
    color: #e83340;
  }
}
.actlists {
  flex: 1;
  width: 670 * @vw;
  margin: 22 * @vw auto;
  .act {
    display: flex;
    justify-content: space-between;
    line-height: 102 * @vw;
    font-size: 42 * @vw;
    font-weight: bold;
    white-space: nowrap;
    color: #333333;
  }
  .btn_question {
    width: 80 * @vw;
    height: 102 * @vw;
    overflow: hidden;
    background: url(../img/icon_question.png) no-repeat right center;
    background-size: 40 * @vw;
  }
  .actlist {
    position: relative;
    height: 498 * @vw;
    text-indent: 184 * @vw;
    line-height: 86 * @vw;
    font-size: 30 * @vw;
    color: #1c1c1c;
    font-weight: bold;
    transition: all 0.2s;
    .actlist_view {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    &.regular {
      .bg {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 16 * @vw;
        overflow: hidden;
        width: 100%;
        height: 454 * @vw;
        background: url(../img/icon_card.jpg) no-repeat center -60 * @vw;
        background-size: 100%;
      }
      .actlist_view {
        background: url(../img/actlist_view.png) no-repeat center;
        background-size: 511 * @vw;
      }
    }
    &:active {
      transform: scale(0.8);
    }
    & + .actlist {
      margin-top: 20 * @vw;
    }
    &::after {
      position: absolute;
      left: -100%;
      top: 0;
      width: 36px;
      height: 100%;
      content: "";
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0)
      );
      transform: skewX(-20deg);
      animation: moveLight 2s infinite;
      touch-action: none;
    }
  }
}
.more {
  padding-bottom: 48 * @vw;
  line-height: 36 * @vw;
  text-align: center;
  font-size: 26 * @vw;
  color: #959fac;
  background: url(../img/icon_smile.png) no-repeat center bottom;
  background-size: 40 * @vw;
}

@keyframes fadeIn {
  0% {
  }
  100% {
    opacity: 1;
  }
}

@keyframes moveLight {
  0% {
    left: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    left: 100%;
  }
}
</style>
