<template>
    <div class="ticket_img" id="ticket_img" ref="ticket_img" v-if="isloading">
        <canvas id="canvas_off" ref="off" class="canvas_off" :width="width" :height="height"></canvas>
        <canvas id="canvas_on" ref="on" class="canvas_on" :width="width" :height="height"></canvas>
        <!-- 手势 -->
        <div class="touch" v-if="touch" @touchmove="touch = false" @click="touch = false">
            <img src="../img/touch.png" alt="">
        </div>
    </div>
</template>

<script>
import { formatterNum } from "@/common/util"
import { setTimeout } from "timers"
const hastouch = "ontouchstart" in window ? true : false,
    tapstart = hastouch ? "touchstart" : "mousedown",
    tapmove = hastouch ? "touchmove" : "mousemove",
    tapend = hastouch ? "touchend" : "mouseup"
export default {
    data () {
        return {
            card: null,
            isClear: false,
            timer: null,
            isloading: false,
            width: 620,
            height: 620,
            /* 是否刮了刮刮卡 */
            isTouch: false,
            /* 是否显示触摸教学 */
            touch: false
        }
    },
    methods: {
        getImgData (imgsArr) {
            return Promise.all(imgsArr.map(img => this.loadImgData(img)))
        },
        loadImgData (imgpath) {
            return new Promise(resolve => {
                let img = new Image()
                img.onload = function () {
                    resolve(img)
                }
                img.src = imgpath
            })
        },
        getDetail () {
            return this.$get("/api/scratch/detail").then(res => {
                this.card = res.data.card
            })
        },
        renderAll () {
            if (this.card.items && this.card.items.length === 9) {
                let goldIndex = null
                this.card.items.map((item, index) => {
                    item = Number(item)
                    if (item === 8) {
                        item = 9
                    } else if (item === 9) {
                        item = 8
                        goldIndex = index
                    }
                    let xcanvasmod = index % 3
                    let ycanvasmod = Math.floor(index / 3)
                    if (item <= 9) {
                        let xmod = ((item - 1) % 3)
                        let ymod = Math.floor((item - 1) / 3)
                        this.contextOn.drawImage(this.imgon, xmod * 210, ymod * 210, 200, 200, xcanvasmod * 210, ycanvasmod * 210, 200 , 200)
                    } else {
                        let xmod = ((item - 11) % 3) + 3
                        let ymod = Math.floor((item - 11) / 3)
                        this.contextOn.drawImage(this.imgon, xmod * 210, ymod * 210, 200, 200, xcanvasmod * 210, ycanvasmod * 210, 200 , 200)
                    }
                })
                this.renderGold(this.card.golds_amount, goldIndex % 3 * 210 + 95, Math.floor(goldIndex / 3) * 210 + 125)
            } else {
                this.$toast({
                    content: _("networkError")
                })
            }
        },
        renderGold (number, x, y) {
            this.contextOn.font = "9vw bold Helvetica"
            this.contextOn.textAlign = "center"
            this.contextOn.textBaseline = "top"
            this.contextOn.fillStyle = "#48198e"
            this.contextOn.fillText(formatterNum(number.toString()), x, y)
        },
        renderAlloff () {
            this.contextOff.drawImage(this.imgoff, 0, 0)
            this.contextOff.globalCompositeOperation = "destination-out"
            this.contextOff.lineWidth = 80
            this.contextOff.lineJoin = "round"
            this.ticket_img = this.$refs.ticket_img
            this.offsetLeft = this.ticket_img.offsetLeft
            this.offsetTop = this.ticket_img.offsetTop
            this.scale = this.canvasOff.width / this.ticket_img.clientWidth
            this.canvasOff.addEventListener(tapstart, this.touchStartHandler)
            this.canvasOff.addEventListener(tapmove, this.touchMoveHandler)
        },
        touchStartHandler (event) {
            event.preventDefault()
            if (this.isClear || this.card === null || (this.card && this.card.card_id === undefined)) {
                return
            }
            event = event || window.event
            let touch = hastouch ? event.changedTouches[0] : event
            this.contextOff.beginPath()
            this.contextOff.arc((touch.pageX - this.offsetLeft) * this.scale, (touch.pageY - this.offsetTop) * this.scale, 40, 0, 2 * Math.PI, false)
            this.contextOff.fill()
            this.currentTouch = touch

            // 触摸了就算使用了这张刮刮卡
            if (!this.isTouch) {
                this.isTouch = true
                this.$post("/api/scratch/opened", {
                    card_id: this.card.card_id
                })
                this.$emit("delete_ticket")
            }

        },
        touchMoveHandler (event) {
            event.preventDefault()
            if (this.isClear || this.card === null || (this.card && this.card.card_id === undefined)) {
                return
            }
            event = event || window.event
            let touch = hastouch ? event.changedTouches[0] : event
            this.contextOff.beginPath()
            this.contextOff.moveTo((this.currentTouch.pageX - this.offsetLeft) * this.scale, (this.currentTouch.pageY - this.offsetTop) * this.scale)
            this.contextOff.lineTo((touch.pageX - this.offsetLeft) * this.scale, (touch.pageY - this.offsetTop) * this.scale)
            this.contextOff.closePath()
            this.contextOff.stroke()
            this.currentTouch = touch
            this.getClearArea()

        },
        getClearArea () {
            // 做个缓冲，不用每次触发move事件都计算有没有刮到80%
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.timer = setTimeout(() => {
                let data = this.contextOff.getImageData(0, 0, this.width, this.height).data
                let area = data.filter((item, index) => item === 0 && (index % 4 === 3)).length / (this.width * this.height)

                // 如果刮到的部分超过80%则开奖
                if (area >= 0.5) {
                    this.contextOff.clearRect(0, 0, this.width, this.height)
                    this.isClear = true
                    this.isTouch = false
                    // 触发开奖动画
                    this.$emit("getPrize", {
                        ...this.card
                    })
                    // // 上报刮刮卡, 上报失败的话再上报一次, 成功的话更新余额
                    // this.$post("/api/scratch/opened", {
                    //     card_id: this.card.card_id
                    // }).catch(() => {
                    //     this.$post("/api/scratch/opened", {
                    //         card_id: this.card.card_id
                    //     })
                    // })
                    // 重新开始
                }
            }, 300)
        },
        checkIsTouch () {
            let data = this.contextOff.getImageData(0, 0, this.width, this.height).data
            let area = data.filter((item, index) => item === 0 && (index % 4 === 3)).length / (this.width * this.height)
            if (area < 0.1) {
                this.touch = true
            }
        },
        init () {
            // 如果有多张票 开完奖后会再次调用这个函数
            // 未加载完数据先不展示刮刮卡
            this.isloading = false
            if (!this.imgDataPromise) {
                // 重新开始刮卡不用再次下载图片
                this.imgDataPromise = this.getImgData([
                    "./staticImg/all_off.png",
                    "./staticImg/all.png"
                ])
                    .then(res => {
                        this.imgoff = res[0]
                        this.imgon = res[1]
                        return res
                    })
            }
            Promise.all([
                this.getDetail(),
                this.imgDataPromise
            ]).then(data => {
                // 展示刮刮卡
                this.isloading = true
                this.$nextTick(() => {
                    this.isClear = false
                    this.timer = null
                    this.canvasOff = this.$refs.off
                    this.contextOff = this.canvasOff.getContext("2d")
                    this.canvasOn = this.$refs.on
                    this.contextOn = this.canvasOn.getContext("2d")
                    // 渲染刮刮卡
                    this.renderAll()
                    this.renderAlloff()
                })
            })
        }
    },
    beforeDestroy () {
        if (this.canvasOff) {
            this.canvasOff.removeEventListener(tapstart, this.touchStartHandler)
            this.canvasOff.removeEventListener(tapmove, this.touchMoveHandler)
            this.canvasOff.removeEventListener(tapend, this.touchEndHandler)
        }
    },
    mounted () {
        this.init()
        /* 3秒后检测是否有开始刮 */
        setTimeout(() => {
            this.checkIsTouch()
        }, 5000)
    }
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
.ticket_img {
  position: relative;
  width: 560 * @vw;
  overflow: hidden;
  margin: 146 * @vw auto 0;
  border-radius: 16 * @vw;
  opacity: 0;
  animation: fadeIn 0.2s cubic-bezier(0.73,-0.2, 1, 1) both;
  canvas {
    display: block;
    width: 100%;
  }
  .canvas_off {
    position: relative;
    z-index: 2;
  }
  .canvas_on {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
  }
  .touch {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    img{
        position: absolute;
        top: 50%;
        left: 0;
        width: 10vw;
        animation: touch 2s infinite;
    }
  }
}
@keyframes fadeIn {
  0% {
  }
  100% {
    opacity: 1;
  }
}
@keyframes touch {
  0% {
    left: 60%;
  }
  100% {
    left: 30%;
  }
}
</style>
