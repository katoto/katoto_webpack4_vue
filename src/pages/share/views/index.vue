<template>
  <div class="page_share">
    <div class="hide">
      <div class="head">
        <button @click="fb_invite">facebook 邀请 222222</button>
        <br>
        <br>
        <br>
        <button @click="fb_morePeop">facebook 邀请列表</button>
        <br>
        <br>

        <button @click="fb_whatsapp">WhatsApp原生</button>
        <br>
        <br>
        <button @click="fb_fackbook">Fackbook 原生</button>

        <button>
          <a href="whatsapp://send?text=HERE GOES THE URL ENCODED TEXT YOU WANT TO SHARE" target="_blank" data-action="share/whatsapp/share">Share via Whatsapp</a>
        </button>

        <div class="fb-share-button" data-href="https://www.katoto.cn/" data-layout="button" data-size="small">
          <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.baidu.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a>
        </div>
      </div>
    </div>
    <div class="bg_page">
      <div class="bg_particle">
        <div class="bg bg_p1" :class="{bounceIn:fadeIn}"></div>
        <div class="bg bg_p2" :class="{bounceIn:fadeIn}"></div>
        <div class="bg bg_p3" :class="{bounceIn:fadeIn}"></div>
      </div>
      <div class="bg_light"></div>
    </div>
    <div class="page_share_main">
      <h1 class="title" :class="{fadeIn:fadeIn}">{{ _('m_share.sh_bigTitle', '5000') }}</h1>
      <div class="total" :class="{fadeIn:fadeIn}">
        <p class="total_title">{{ _('m_share.sh_invited_friends') }}</p>
        <div class="total_person" @click="popInviteFrient()"><span v-if="invitemsg">{{ invitemsg.invited_num }}</span></div>
        <div class="total_money">{{ invitemsg.have_earn }}</div>
      </div>
      <div class="btn_box">
        <a href="javascript:;" @click="fb_fackbook()" class="btn btn_facebook" :class="{fadeIn:fadeIn}">Facebook</a>
        <a href="javascript:;" @click="fb_whatsapp()" class="btn btn_whatsApp" :class="{fadeIn:fadeIn}">WhatsApp</a>
      </div>
      <div class="share_code" :class="{fadeIn:fadeIn}">
        <p>
          {{ _('m_share.sh_refer_code') }}
          <i class="bold" v-if="invitemsg">{{ invitemsg.invite_code }}</i>
        </p>
        <a href="javascript:;" class="btn_copy" @click="shareCopy(invitemsg.invite_code)">{{ _('m_share.sh_btc_copy') }}</a>
      </div>
      <div class="tips" :class="{fadeIn:fadeIn}">{{ _('m_share.sh_invitemsg') }}</div>
      <div class="page_share_bottom" :class="{fadeIn:fadeIn}">
        <div class="share_byfriend">
          <p class="msg">{{ _('m_share.sh_invited_byfriends') }}</p>
          <div class="input_box">
            <input type="text" :placeholder="_('m_share.sh_enter_code')" @input="testFriendCode" v-model="friend_code" :class="{isput:friend_code}">
            <a href="javascript:;" class="btn" v-if="friend_code" @click="sendInviteCode">{{ _('m_share.sh_btn_confirm') }}</a>
          </div>
          <p class="time">{{ _('m_share.sh_validtime') }}19 days 23:59</p>
        </div>
        <div class="share_tips">
          <p class="share_tips_t">{{ _('m_share.sh_rule_title') }}</p>
          <p>{{ _('m_share.sh_rule_1') }}</p>
          <p>{{ _('m_share.sh_rule_2') }}</p>
        </div>
      </div>
    </div>
    <div class="pop_invite_frient" :class="{hide:!show_pop_invite_frient}">
      <transition name="pop_animate">
        <div class="pop_invite_frient_layer" v-if="show_pop_invite_frient">
          <div class="pop_main">
            <a href="javascript:" class="pop_close" @click="show_pop_invite_frient = false"></a>
            <div class="header">{{ _('m_share.sh_invited_friends') }}</div>
            <ul class="pop_invite_frient_list" v-if="friendList">
            <li>
                <p class="list_rank">{{ _('m_share.sh_no_list') }}</p>
                <p class="list_name">{{ _('m_share.sh_name') }}</p>
            </li>
              <li v-for="(item, index) in friendList" :key="index">
                <p class="list_rank">{{ _('m_share.sh_no_list') }}{{ index + 1 }}</p>
                <p class="list_name">{{ item.name }}</p>
              </li>
            </ul>
            <p class="nomsg" v-else>{{ _('m_share.sh_invite_nodata') }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
    isIOS, appID, cbetLocal, preloadImage, formateBalance
} from "@common/util"
import {
    setTimeout
} from "timers"

export default {
    data () {
        return {
            contentSrc: "",
            contHref: "//play.google.com/store/apps/details?id=com.crazy500.cbet",
            baseFB: null,
            accToken: null,
            fadeIn:false,
            scrollTop: 0,
            isOnPop: true,
            show_pop_invite_frient:false,
            friend_code:"",
            invitemsg: "",
            friendList: null // 好友列表
        }
    },
    watch:{
        show_pop_invite_frient (val) {
            if (val) {
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                document.body.classList.add("isOnPop")
                document.body.style.top = -this.scrollTop + "px"
            } else {
                document.body.classList.remove("isOnPop")
                window.scrollTo(0, this.scrollTop)
                document.body.style.top = 0
            }
        }
    },
    methods:{
        testFriendCode () {
            if (this.friend_code && this.friend_code.length > 10) {
                this.friend_code = this.friend_code.slice(0,10)
            }
        },
        sendInviteCode () {
            // 发送邀请码
            let codeReg = /[0-9a-zA-Z]{10}/
            if (codeReg.test(this.friend_code)) {
                // 发起请求
                this.$post("/invite/use_code",{
                    code: this.friend_code
                }).catch(() => {
                    return {
                        "status":"100",
                        "message":"ok",
                        "data":[{
                        }]
                    }
                }).then((res) => {
                    if (res && res.status === "100") {
                        this.getInviteInfo()
                    } else {
                        // 邀请出错
                    }
                })
            } else {
                console.warn("code 有误")
            }
        },
        popInviteFrient (noneTip=false) {
            if (!noneTip) {this.show_pop_invite_frient = true}
            this.$post("/invite/get_firends").catch( e => {
                return {
                    "status":"100",
                    "message":"ok",
                    "data":[{
                        name: "哈哈哈",
                        userid: "1111"
                    },{
                        name: "哈哈哈2",
                        userid: "3334412"
                    },{
                        name: "哈哈哈3",
                        userid: "6666"
                    },{
                        name: "哈哈哈4",
                        userid: "333434535412"
                    },{
                        name: "哈哈哈2",
                        userid: "3334412"
                    },{
                        name: "哈哈哈3",
                        userid: "6666"
                    },{
                        name: "哈哈哈4",
                        userid: "333434535412"
                    },{
                        name: "哈哈哈2",
                        userid: "3334412"
                    },{
                        name: "哈哈哈3",
                        userid: "6666"
                    },{
                        name: "哈哈哈4",
                        userid: "333434535412"
                    },{
                        name: "哈哈哈2",
                        userid: "3334412"
                    },{
                        name: "哈哈哈3",
                        userid: "6666"
                    },{
                        name: "哈哈哈4",
                        userid: "333434535412"
                    }]
                }
            }).then((res) => {
                if (res && res.status === "100") {
                    this.friendList = res.data
                }
            })
        },
        shareCopy (code="") {
            // 多语言
            let cont = "todo"
            cbetLocal({
                func:"copyToPasteboard",
                params:{
                    content: cont
                }
            })
        },
        fb_whatsapp () {
            // 分享的内容
            cbetLocal({
                func: "share",
                params:{
                    content: "321312132",
                    plat: "whatsapp"
                }
            })
        },
        fb_fackbook () {
            // 分享的内容
            console.log(121)
            cbetLocal({
                func: "share",
                params:{
                    content: "12312321",
                    plat: "facebook"
                }
            })
        },
        fb_morePeop () {
            window.FB.ui({
                appID,
                method: "apprequests",
                message: "这是疯狂猜球应用测试",
                title: "Invite friends to play"
            }, function (response) {
                if (response && response.to.length>0) {
                    console.log("Welcome!  Fetching your information....1111 ")
                }
                console.log(response)
            })
        },
        fb_invite () {
            console.log(this.baseFB)
            this.baseFB.getLoginStatus(function (response) {
                console.log(response)
                this.accToken = response.accessToken
                if (response && response.status === "unknown") {
                    window.FB.login(function (response) {
                        if (response.authResponse) {
                            console.log("Welcome!  Fetching your information.... ")
                        } else {
                            console.log("User cancelled login or did not fully authorize.")
                        }
                    })
                }
            })
        },
        pageinit (FB) {
            FB.getLoginStatus(function (response) {
                if (response && response.status === "unknown") {
                    FB.login(function (response) {
                        if (response.authResponse) {
                            console.log("Welcome!  Fetching your information.... ")
                            console.log(response)
                            console.log("111111111")
                        } else {
                            console.log("User cancelled login or did not fully authorize.")
                        }
                    })
                }
                console.log(response)
                console.log("====")
            })

        },
        getInviteInfo () {
            this.$post("/invite/info").then(() => {
            }).catch(e => {
                return {
                    "status":"100",
                    "message":"ok",
                    "data":{
                        info:{
                            invite_code:"11qwedf",
                            invited_num:"1",
                            have_earn:"3333",
                            used_code:"0"
                        },
                        config:{
                        }
                    }
                }
            }).then((res) => {
                if (res && res.status === "100") {
                    console.log(res)
                    this.invitemsg = res.data.info
                } else {
                    console.warn("49")
                }
            })
        }
    },
    components: {
    },
    created () {
        this.getInviteInfo()
    },
    async mounted () {
        preloadImage(["bg.jpg","title.png","bg_light.png","bg_particle1.png","bg_particle2.png","bg_particle3.png"], () => {
            this.fadeIn = true
        }, "./img/")

        this.$nextTick(() => {
            this.popInviteFrient(true)
        })

        window.fbAsyncInit = () => {
            FB.init({
                appId      : appID,
                cookie     : true,
                xfbml      : true,
                version    : "v3.2"
            })
            FB.AppEvents.logPageView()
            // this.pageinit(FB)
            this.baseFB = FB
        }

    }
}
</script>

<style lang="less" scoped type="text/less">
.page_share {
  min-height: 1500/75rem;
  overflow: hidden;
  background: #752120 url(~@static/img/bg.jpg) no-repeat center top;
  background-size: 750/75rem;
}

.bg_page {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  .bg_particle {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 707/75rem;
    height: 658/75rem;
    overflow: hidden;
    .bg {
      position: absolute;
      opacity: 0;
    }
    .bg_p1 {
      left: 275/75rem;
      top: 0;
      width: 411/75rem;
      height: 356/75rem;
      &.bounceIn {
        background: url(~@static/img/bg_particle1.png) no-repeat center;
        background-size: cover;
        animation: bounceIn 1.2s ease-in-out forwards;
      }
    }
    .bg_p2 {
      left: 0;
      top: 304/75rem;
      width: 357/75rem;
      height: 354/75rem;
      &.bounceIn {
        background: url(~@static/img/bg_particle2.png) no-repeat center;
        background-size: cover;
        animation: bounceIn 1.2s 0.4s ease-in-out forwards;
      }
    }
    .bg_p3 {
      right: 0;
      top: 303/75rem;
      width: 224/75rem;
      height: 257/75rem;
      &.bounceIn {
        background: url(~@static/img/bg_particle3.png) no-repeat center;
        background-size: cover;
        animation: bounceIn 1.2s 0.8s ease-in-out forwards;
      }
    }
  }
  .bg_light {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 750/75rem;
    height: 813/75rem;
    overflow: hidden;
    background: url(~@static/img/bg_light.png) no-repeat center;
    background-size: cover;
  }
}
.page_share_main {
  position: relative;
  z-index: 2;
}
.title {
  width: 682/75rem;
  height: 234/75rem;
  overflow: hidden;
  margin: 176/75rem auto 0;
//   background: url(../img/title.png) no-repeat center;
//   background-size: cover;
//   font-size: 0;
//   text-indent: -9999/75rem;
  opacity: 0;
  &.fadeIn {
    animation-delay: 1.4s;
  }
}
.total {
  display: flex;
  align-items: center;
  width: 390/75rem;
  height: 46/75rem;
  overflow: hidden;
  margin: 48/75rem auto 0;
  border-radius: 20/75rem;
  background: #c24632;
  box-shadow: 0/75rem 3/75rem 5/75rem 0/75rem rgba(0, 0, 0, 0.19);
  font-size: 30/75rem;
  color: #ffe22e;
  opacity: 0;
  &.fadeIn {
    animation-delay: 1.6s;
  }
  .total_title {
    color: #ffbd82;
    margin-left: 15/75rem;
  }
  .total_person {
    margin-left: 20/75rem;
    padding-left: 45/75rem;
    background: url(../img/img_invide_info_icon_friend.png) no-repeat left
      center;
    background-size: 38/75rem;
    text-decoration: underline;
  }
  .total_money {
    margin-left: 52/75rem;
    padding-left: 34/75rem;
    background: url(../img/img_invide_info_icon_coins.png) no-repeat left center;
    background-size: 27/75rem;
  }
}
.btn_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75/75rem;
  .btn {
    width: 445/75rem;
    height: 94/75rem;
    overflow: hidden;
    border-radius: 10/75rem;
    box-shadow: 1/75rem 2/75rem 8/75rem 0.72/75rem rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 94/75rem;
    font-size: 38/75rem;
    font-weight: bold;
    text-shadow: 1/75rem 2/75rem 3/75rem rgba(0, 0, 0, 0.3);
    white-space: nowrap;
    opacity: 0;
  }
  .btn_facebook {
    background: url(../img/btn_facebook.png) no-repeat center;
    background-size: cover;
    &.fadeIn {
      animation-delay: 1.8s;
    }
  }
  .btn_whatsApp {
    margin-top: 40/75rem;
    background: url(../img/btn_whatsApp.png) no-repeat center;
    background-size: cover;
    &.fadeIn {
      animation-delay: 2s;
    }
  }
}
.share_code {
  display: flex;
  justify-content: space-between;
  width: 454/75rem;
  margin: 48/75rem auto 0;
  line-height: 1.2;
  font-size: 30/75rem;
  color: #fff6c0;
  white-space: nowrap;
  opacity: 0;
  &.fadeIn {
    animation-delay: 2.2s;
  }
  .bold {
    margin-left: 8/75rem;
  }
  .btn_copy {
    margin-right: 6/75rem;
    color: #ffbd82;
    text-decoration: underline;
  }
}
.tips {
  width: 680/75rem;
  margin: 92/75rem auto 0;
  line-height: 31/75rem;
  font-size: 26/75rem;
  color: #ffbd82;
  opacity: 0;
  &.fadeIn {
    animation-delay: 2.4s;
  }
}
.page_share_bottom {
  // opacity: 0.2;
  padding: 50/75rem 35/75rem 260/75rem;
  margin-top: 40/75rem;
  background: #8a2826;
  color: #ffbd82;
  opacity: 0;
  &.fadeIn {
    animation-delay: 2.6s;
  }
  .msg {
    line-height: 97/75rem;
    font-size: 34/75rem;
    font-weight: bold;
  }
  .input_box {
    display: flex;
    width: 567/75rem;
    height: 80/75rem;
    overflow: hidden;
    line-height: 80/75rem;
    margin: 0 auto;
    background: #752120;
    border-radius: 10/75rem;
  }
  input {
    flex: 1;
    text-align: center;
    font-size: 30/75rem;
    &::placeholder {
      color: #c38d5d;
    }
    &.isput {
      text-align: left;
      text-indent: 56/75rem;
      color: #fff6c0;
      font-weight: bold;
    }
  }
  .btn {
    width: 148/75rem;
    height: 80/75rem;
    overflow: hidden;
    background: #ffbd0a;
    border-radius: 10/75rem;
    text-align: center;
    font-size: 30/75rem;
    font-weight: bold;
    color: #733310;
  }
  .time {
    line-height: 66/75rem;
    text-align: center;
    font-size: 26/75rem;
  }
}
.share_tips {
  margin-top: 24/75rem;
  line-height: 36/75rem;
  font-size: 26/75rem;
  .share_tips_t {
    line-height: 76/75rem;
    font-size: 30/75rem;
    font-weight: bold;
  }
}
.pop_invite_frient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  font-size: 30/75rem;
  .pop_invite_frient_layer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pop_main {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 660/75rem;
    height: 660/75rem;
    overflow: hidden;
    border-radius: 10/75rem;
    background: #8a2826;
  }
  .pop_close {
    position: absolute;
    top: 15/75rem;
    right: 11/75rem;
    width: 47/75rem;
    height: 47/75rem;
    overflow: hidden;
    background: url(../img/btn_close.png) no-repeat center;
    background-size: cover;
  }
  .header {
    width: 356/75rem;
    height: 64/75rem;
    overflow: hidden;
    text-align: center;
    line-height: 64/75rem;
    border-bottom-left-radius: 20/75rem;
    border-bottom-right-radius: 20/75rem;
    background: #a53734;
    font-weight: bold;
    color: #fff6c0;
    margin: 0 auto;
  }
  .pop_invite_frient_list,
  .nomsg {
    position: relative;
    flex: 1;
    overflow: auto;
    margin-top: 53/75rem;
    background: #7f2725;
    line-height: 74/75rem;
    ul {
      overflow: auto;
    }
    li {
      display: flex;
      justify-content: space-between;
      width: 546/75rem;
      margin: 0 auto;
    }
    .list_rank {
      color: #ffbd82;
    }
    .list_name {
      color: #fff6c0;
    }
    .nomsg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
  .nomsg {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30/75rem;
    color: #fff6c0;
    white-space: nowrap;
  }
}
.fadeIn {
  //   animation: fadeIn 1s 1.5s forwards;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
@keyframes fadeIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translateY(0.26666667rem);
    transform: translateY(0.26666667rem);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}
</style>

