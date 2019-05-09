<template>
    <div class="page_amazon">
        <header>
            <a class="btn_back"> </a>
            <h1>My Prize</h1>
        </header>
        <div class="check" if="!checkId" @click="handleId">
            <p class="msg">The authentication</p>
            <p class="view">Before collecting the prize, we need to verify that you are a natural person</p>
        </div>
        <transition name="pop_animate">
            <div class="pop_topup">
                <a class="btn_close"></a>
                <h2 class="title">Authenticate</h2>
                <p class="msg">Please recharge for verification Get the same number of tokens</p>
                <div class="count">
                    79,000
                </div>
                <a class="btn">卢比79 Charge verification</a>
                <p class="tips">After successful recharge display card</p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            checkId: false,
            pop_topup: true
        }
    },
    components: {

    },
    computed: {},
    methods: {
        handleId () {

        }
    },
    mounted () {}
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

.pop_topup {
  position: fixed;
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
    background: rgba(49, 170, 108, 1);
    border-radius: 16 * @vw;
    margin: 0 auto;
  }
}
</style>
