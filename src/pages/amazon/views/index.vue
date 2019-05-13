<template>
    <div class="page_amazon">
        <header>
            <a class="btn_back" @click="href('card.html')"> </a>
            <h1>My Prize</h1>
        </header>
        <div class="check" if="!need_recharge" @click="topup">
            <p class="msg">The authentication</p>
            <p class="view">Before collecting the prize, we need to verify that you are a natural person</p>
        </div>
        <ul>
            <li class="list" v-for="item in gifts" :key="item.card_no">
                <div class="card_description">
                    <p class="card_count">₹500</p>
                    <p class="card_msg">Amazon.com Gift Card</p>
                </div>
                <div class="card_key">
                    <i>NO.</i>
                    <p>{{item.card_no}}</p>
                    <a class="btn_copy" @click="handleCopy(item.card_no)">Copy</a>
                </div>
                <div class="card_val">
                    <i>KEY.</i>
                    <p>{{item.password}}</p>
                    <a class="btn_copy" @click="handleCopy(item.password)">Copy</a>
                </div>
            </li>
        </ul>
        <div class="pop_layer" v-if="pop_topup">
        </div>
        <transition name="pop_animate">
            <div class="pop_topup" v-if="pop_topup">
                <a class="btn_close" @click="pop_topup = false"></a>
                <h2 class="title">Authenticate</h2>
                <p class="msg">Please recharge for verification Get the same number of tokens</p>
                <div class="count">
                    79,000
                </div>
                <a class="btn" @click="gotoshop">₹79 Charge verification</a>
                <p class="tips">After successful recharge display card</p>
            </div>
        </transition>
    </div>
</template>

<script>
import {
    copy, cbetLocal
} from "@common/util"
export default {
    data () {
        return {
            // 是否是已验证用户
            need_recharge: false,
            pop_topup: false,
            gifts: []
        }
    },
    methods: {
        href (href) {
            location.href = `${href}${location.search}`
        },
        topup () {
            this.pop_topup = true
        },
        handleCopy (text) {
            copy(text)
        },
        gotoshop () {
            cbetLocal({
                func: "jumpToLocal",
                params: {
                    content: "jp://ShopScene"
                }
            })
        }
    },
    mounted () {
        this.$post("/api/scratch/gifts").then(res => {
            let data = res.data
            this.need_recharge = data.need_recharge === "True"
            this.gifts = [...data.gifts]
        })
    }
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
.page_amazon {
  min-height: 100vh;
  background: #dce6f3;
}
header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120 * @vw;
  background: #ec3644;
  background: linear-gradient(90deg, #f33b48, #d2235b);
  font-size: 42 * @vw;
  .btn_back {
    position: absolute;
    left: 0;
    top: 0;
    width: 90 * @vw;
    height: 100%;
    background: url(../img/btn_back.png) no-repeat center;
    background-size: 50 * @vw;
  }
}
.check {
  padding: 37 * @vw 0 34 * @vw 20 * @vw;
  background: #ffeaa0 url(../img/icon_arrow.png) no-repeat 660 * @vw center;
  background-size: 30 * @vw;
  color: #1c1c1c;
  .msg {
    width: 590 * @vw;
    line-height: 60 * @vw;
    font-size: 42 * @vw;
  }
  .view {
    width: 590 * @vw;
    line-height: 34 * @vw;
    font-size: 26 * @vw;
  }
}
.list {
  padding: 47 * @vw 20 * @vw 38 * @vw 34 * @vw;
  color: #1c1c1c;
  background: #fff url(../img/icon_amazon.png) no-repeat 630 * @vw 42 * @vw;
  background-size: 82 * @vw;
  .card_count {
    line-height: 65 * @vw;
    font-size: 88 * @vw;
    font-weight: bold;
  }
  .card_msg {
    line-height: 40 * @vw;
    color: #999999;
    font-size: 26 * @vw;
  }
  .card_key {
    margin-top: 16 * @vw;
  }
  .card_val {
    margin-top: 30 * @vw;
  }
  .card_key,
  .card_val {
    display: flex;
    align-items: center;
    font-size: 32 * @vw;
    i {
      min-width: 72 * @vw;
    }
  }
  .btn_copy {
    margin-left: auto;
    text-align: center;
    line-height: 43 * @vw;
    width: 113 * @vw;
    height: 47 * @vw;
    border: 2 * @vw solid rgba(149, 159, 172, 1);
    border-radius: 4 * @vw;
    color: #959fac;
  }

  & + .list {
    margin-top: 20 * @vw;
  }
}

.pop_layer {
  position: fixed;
}
.pop_topup {
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 622 * @vw;
  min-height: 632 * @vw;
  padding: 85 * @vw 0 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 16 * @vw;
  text-align: center;
  color: #333333;
  .btn_close {
    position: absolute;
    top: 0;
    right: 0;
    width: 140 * @vw;
    height: 110 * @vw;
    background: url(../img/btn_close.png) no-repeat center;
    background-size: 31 * @vw;
  }
  .title {
    line-height: 55 * @vw;
    font-size: 44 * @vw;
    font-weight: bold;
  }
  .msg {
    width: 510 * @vw;
    line-height: 40 * @vw;
    font-size: 26 * @vw;
    margin: 0 auto;
  }
  .count {
    display: inline-block;
    padding-left: 104 * @vw;
    font-size: 64 * @vw;
    font-weight: bold;
    background: url(../img/icon_coins.png) no-repeat left center;
    background-size: 100 * @vw;
    margin: 40 * @vw auto 75 * @vw;
  }
  .btn {
    width: 540 * @vw;
    height: 100 * @vw;
    overflow: hidden;
    line-height: 100 * @vw;
    background: rgba(49, 170, 108, 1);
    border-radius: 16 * @vw;
    margin: 0 auto;
    font-weight: bold;
    white-space: nowrap;
  }
  .tips {
    line-height: 76 * @vw;
    font-size: 26 * @vw;
  }
}
</style>
