<template>
    <div class="page_card">
        <header class="card_header">
            <a class="btn_back"></a>
            <!-- <a class="btn_gift"></a>
            <a class="btn_help"></a> -->
            <a class="btn_ticket">
                6
                <transition name="ticketChange">
                    <i class="ticketChange" v-if="ticketChange">+1</i>
                </transition>
            </a>
        </header>
        <div class="ticket_title"></div>
        <div class="ticket_bonus"></div>
        <div class="ticket_img" id="ticket_img">
            <canvas id="canvas" width="620" height="620"></canvas>
        </div>
        <div class="balance">
            <p>10.6K</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ticketChange: false
        }
    },
    components: {

    },
    computed: {},
    methods: {},
    mounted () {
        var canvas = document.getElementById("canvas")
        var ctx = canvas.getContext("2d")
        var ticket_img = document.getElementById("ticket_img")
        var scale = canvas.width / ticket_img.clientWidth
        var offsetLeft = ticket_img.offsetLeft
        var offsetTop = ticket_img.offsetTop
        var imgs = ["./img/ticket.png", "./img/ticket_on.png"]
        var cicle_r = 40
        // 0.5=>50%时自动清空画布
        var isClear = 0.5
        var cache = []
        var ongoinTouches = []
        var hastouch = "ontouchstart" in window ? true : false,
            tapstart = hastouch ? "touchstart" : "mousedown",
            tapmove = hastouch ? "touchmove" : "mousemove",
            tapend = hastouch ? "touchend" : "mouseup"

        function handleStart (e) {
            e.preventDefault()
            if (hastouch) {
                var touches = e.changedTouches
                ongoinTouches.push(copyTouch(touches[0]))
                ctx.beginPath()
                ctx.arc((touches[0].pageX - offsetLeft) * scale, (touches[0].pageY - offsetTop) * scale, cicle_r, 0, 2 * Math.PI, false)
                ctx.fill()
            } else {
                ongoinTouches.push({
                    x: e.pageX,
                    y: e.pageY
                })
                ctx.beginPath()
                ctx.arc((e.pageX - offsetLeft) * scale, (e.pageY - offsetTop) * scale, 40, 0, 2 * Math.PI, false)
                ctx.fill()
            }
            canvas.addEventListener(tapmove, handleMove, false)
        }
        function handleMove (e) {
            e.preventDefault()
            ctx.lineWidth = cicle_r * 2
            ctx.lineJoin = "round"
            if (hastouch) {
                var touches = e.changedTouches
                ctx.beginPath()
                ctx.moveTo((ongoinTouches[0].pageX - offsetLeft) * scale, (ongoinTouches[0].pageY - offsetTop) * scale)
                ctx.lineTo((touches[0].pageX - offsetLeft) * scale, (touches[0].pageY - offsetTop) * scale)
                ctx.closePath()
                ctx.stroke()
                ongoinTouches.splice(0, 1, copyTouch(touches[0]))
            } else {
                ctx.beginPath()
                ctx.moveTo((ongoinTouches[0].x - offsetLeft) * scale, (ongoinTouches[0].y - offsetTop) * scale)
                ctx.lineTo((e.pageX - offsetLeft) * scale, (e.pageY - offsetTop) * scale)
                ctx.closePath()
                ctx.stroke()
                ongoinTouches.splice(0, 1, {
                    x: e.pageX,
                    y: e.pageY
                })
            }
        }
        function handleEnd (e) {
            e.preventDefault()
            ongoinTouches.length = 0
            canvas.removeEventListener(tapmove, handleMove)
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            var index = 0
            for (var i = 0; i < imgData.data.length; i++) {
                if (imgData.data[i] == 0) {
                    index++
                }
            }
            if ((index / i) > isClear) {
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                canvas.removeEventListener(tapstart,handleStart)
            }
        }
        function copyTouch (touch) {
            return {
                identifier: touch.identifier,
                pageX: touch.pageX,
                pageY: touch.pageY
            }
        }
        function preloadImage (names, cb) {
            var n = 0, img
            names.forEach(function (name) {
                img = new Image()
                cache.push(img)
                img.onload = (function (name, img) {
                    return function () {
                        imgs[name] = img;
                        (++n === names.length) && cb()
                    }
                })(name, img)
                img.src = name
            })
        }

        preloadImage(imgs, function () {
            ctx.drawImage(cache[0], 0, 0)
            canvas.style.background = "url(" + imgs[1] + ") no-repeat center"
            canvas.style.backgroundSize = "100%"
            ctx.globalCompositeOperation = "destination-out"
            canvas.addEventListener(tapstart, handleStart, false)
            canvas.addEventListener(tapend, handleEnd, false)
        })
    }
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
@vh: 100/1334vh;
.page_card {
  min-height: 100vh;
  overflow: hidden;
  padding-top: 15 * @vw;
  background: #b31b58 url(../img/ticket_bg.jpg) no-repeat top center;
  background-size: 100%;
}
.card_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 24 * @vw 0 20 * @vw;
  height: 60 * @vw;
  overflow: hidden;
  .btn_back {
    width: 50 * @vw;
    height: 50 * @vw;
    overflow: hidden;
    background: url(../img/btn_back.png) no-repeat center;
    background-size: cover;
  }
  .btn_ticket {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 195 * @vw;
    height: 60 * @vw;
    overflow: hidden;
    background: url(../img/btn_ticket.png) no-repeat center;
    background-size: cover;
    font-size: 36 * @vw;
    font-weight: bold;
    i {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12 * @vw;
      opacity: 0.6;
    }
  }
}
.ticket_title {
  width: 444 * @vw;
  height: 181 * @vw;
  overflow: hidden;
  background: url(../img/ticket_title.png) no-repeat center;
  background-size: cover;
  margin: 33 * @vw 0 0 25 * @vw;
}
.ticket_bonus {
  width: 419 * @vw;
  height: 166 * @vw;
  overflow: hidden;
  background: url(../img/ticket_bonus.png) no-repeat center;
  background-size: cover;
  margin: 2 * @vw 0 0 45 * @vw;
}
.ticket_img {
  position: relative;
  width: 620 * @vw;
  height: 620 * @vw;
  overflow: hidden;
  //   background: url(../img/ticket_on.png) no-repeat center;
  //   background-size: cover;
  margin: 146 * @vw auto 0;
  canvas {
    display: block;
    width: 100%;
    // background: url(./img/ticket.png) no-repeat center;
    // background-size: cover;
  }
}
.balance {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 620 * @vw;
  height: 112 * @vw;
  overflow: hidden;
  margin: 0 auto;
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
  animation: enter 0.5s infinite backwards;
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
</style>
