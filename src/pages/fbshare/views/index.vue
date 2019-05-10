<template>
    <div class="page_share">
        <h1>fb 的分享打开页</h1>
        <div class="bg_page">
            <div class="bg_particle">
                <div class="bg bg_p1" :class="{bounceIn:fadeIn}"></div>
            </div>
            <div class="bg_light"></div>
        </div>
        <div>
            <p>测试facebook 的登陆</p><br>
            <button class="fbbtn" @click="checkFb">fb 授权登陆</button><br>
        </div>

    </div>
</template>

<script>

import {
    cbetLocal,
    formateBalance,
    formatMoney,
    formatTime,
    formatIndiaTime,
    calSecond,
    copy,
    cookie,
    preloadImage
} from "@common/util"

export default {
    data () {
        return {
            contentSrc: "",
            contHref: "//play.google.com/store/apps/details?id=com.crazy500.cbet",
            baseFB: null,
            accToken: null,
            fadeIn: false,
            scrollTop: 0
        }
    },
    watch: {
        show_pop_invite_frient (val) {

        }
    },
    methods: {
        formatMoney,
        formatIndiaTime,
        formateBalance,
        formatTime,
        calSecond,
        testFriendCode (e) {
            if (this.friend_code && this.friend_code.length > 10) {
                this.friend_code = this.friend_code.slice(0, 10)
            }
            if (e && e.target) {
                this.friend_code = e.target.value
            }
        },
        checkFb () {
            window.FB.getLoginStatus( (response) => {
                console.log(response)
                console.log("===response=======")
                if (response.status) {
                    if (response.status !== "connected") {
                        window.FB.login()
                    } else {
                        this.startPage(response.authResponse)
                    }
                }
                // 请求信息
                // status 表示应用用户的登录状态。状态可以是以下某个值：
                // connected — 用户已登录 Facebook 和您的应用。
                // not_authorized — 用户已登录 Facebook，但未登录您的应用。
                // unknown — 用户未登录 Facebook，所以不知道其是否已登录您的应用，或者 FB.logout() 在之前已被调用，因此无法连接至 Facebook。
            })
        },
        startPage ({ accessToken }) {
            let data = this.$post("/login/cpuser",{
                token: accessToken,
                idfa: ""
            })
            console.log(data)
        }
    },
    components: {
    },
    created () {
        window.onload = function () {
            this.checkFb()
        }.bind(this)
    },
    async mounted () {
        this.fadeIn = true
        this.$nextTick(() => {
            console.log(window.FB)
        })
        new Error("123")
        console.log(window.FB)
    }
}
</script>

<style lang="less" type="text/less">

.fbbtn{
    cursor: pointer;
    position: relative;
    z-index: 1000;
    font-size: 23px;
}

.page_share {
  .title {
    i {
      position: relative;
      font-style: italic;
      font-family: sans-eb;
      display: inline-block;
      font-size: 108/75rem;
      color: #ffe533;
      text-shadow: 0 4/75rem 0 #ed7912,
        0px 8/75rem 13/75rem rgba(31, 11, 11, 0.81);
      // background-image: linear-gradient(to bottom, #fff087, #ffe533);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      &::after {
        content: attr(data-msg);
        height: 65/75rem;
        overflow-y: hidden;
        overflow-x: visible;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff087;
        text-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>
<style lang="less" scoped type="text/less">
body {
  width: 100%;
  overflow: hidden;
}
.page_share {
  position: relative;
  width: 100%;
  min-height: 1500/75rem;
  overflow: hidden;
  background: #752120 url(../img/nobase.bg.jpg) no-repeat center top;
  background-size: 750/75rem;
}

.bg_page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
        background: url(../img/nobase.bg_particle1.png) no-repeat center;
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
        background: url(../img/nobase.bg_particle2.png) no-repeat center;
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
        background: url(../img/nobase.bg_particle3.png) no-repeat center;
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
    background: url(../img/nobase.bg_light.png) no-repeat center;
    background-size: cover;
  }
}
.page_share_main {
  position: relative;
  z-index: 2;
}
.title {
  //   width: 682/75rem;
  height: 234/75rem;
  //   overflow: hidden;
  margin: 176/75rem auto 0;
  //   background: url(../img/nobase.title.png) no-repeat center;
  //   background-size: cover;
  //   font-size: 0;
  //   text-indent: -9999/75rem;
  opacity: 0;
  font-style: italic;
  line-height: 1.2;
  font-size: 72/75rem;
  color: #f3eab8;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 -2/75rem 0 #fff, 0 4/75rem 0 #b37c14,
    0px 8/75rem 13/75rem rgba(31, 11, 11, 0.81);
  transform: translateZ(5px);

  &.fadeIn {
    animation-delay: 1.4s;
  }
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390/75rem;
  height: 46/75rem;
  overflow: hidden;
  margin: 48/75rem auto 0;
  padding: 15/75rem;
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
    // margin-left: 15/75rem;
  }
  .total_person {
    // margin-left: 20/75rem;
    padding-left: 45/75rem;
    background: url(../img/img_invide_info_icon_friend.png) no-repeat left
      center;
    background-size: 38/75rem;
    text-decoration: underline;
  }
  .total_money {
    // margin-left: 52/75rem;
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
    margin-top: 40/75rem;
    background: url(../img/btn_facebook.png) no-repeat center;
    background-size: cover;
    &.fadeIn {
      animation-delay: 2s;
    }
  }
  .btn_whatsApp {
    background: url(../img/btn_whatsApp.png) no-repeat center;
    background-size: cover;
    &.fadeIn {
      animation-delay: 1.8s;
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
    padding: 0 20px 0 10px;
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
    text-indent: 50/75rem;
    font-size: 30/75rem;
    color: #fff6c0;
    &::placeholder {
      color: #c38d5d;
    }
    &.isput {
      text-align: left;
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
    transform-origin: center;
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

.pop_congratulation {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .pop_con_main {
    position: relative;
    width: 100%;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 506/75rem;
      position: absolute;
      z-index: 1;
      top: 115/75rem;
      left: 0;
      background: url(../img/pop_congratulation_light.png) no-repeat center;
      background-size: 512/75rem;
    }
  }
  .c_title,
  .c_count,
  .c_msg {
    position: relative;
    z-index: 2;
  }
  .c_title {
    width: 486/75rem;
    height: 231/75rem;
    overflow: hidden;
    margin: 72/75rem auto 42/75rem;
    background: url(../img/pop_congratulation_title.png) no-repeat center;
    background-size: cover;
    // line-height: 80/75rem;
    // font-size: 48/75rem;
    // font-weight: bold;
    // color: #f4d82a;
    // &::before {
    //   content: attr(data-msg);
    //   background-image: linear-gradient(to bottom, #f4b632, #f4e228);
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   text-shadow: 0 0 10/75rem rgba(50, 46, 82, 0.75),
    //     0 0 4/75rem rgba(124, 115, 163, 0.75);
    //   line-height: 80/75rem;
    //   font-size: 48/75rem;
    //   font-weight: bold;
    //   color: #f4d82a;
    // }
  }
  .c_count {
    padding-top: 139/75rem;
    line-height: 66/75rem;
    font-size: 50/75rem;
    color: #febb2b;
    font-weight: bold;
    font-family: sans-eb;
    background: url(../img/pop_congratulation_box.png) no-repeat center top;
    background-size: 216/75rem;
  }
  .c_msg {
    max-width: 94%;
    margin: 0 auto;
    line-height: 50/75rem;
    font-size: 24/75rem;
    opacity: 0.6;
  }
  .btn_default {
    width: 213/75rem;
    height: 76/75rem;
    overflow: hidden;
    margin: 90/75rem auto 0;
    text-align: center;
    line-height: 76/75rem;
    font-size: 34/75rem;
    font-weight: bold;
    background: url(~@assets/img/btn_default.png) no-repeat center;
    background-size: cover;
    &.disable {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}

.pop_share-enter-active {
  animation: popShareEnter 0.4s;
}
.pop_share-leave-active {
  animation: popShareLeave 0.2s;
}
@keyframes popShareEnter {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  75% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes popShareLeave {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0);
  }
}
</style>

