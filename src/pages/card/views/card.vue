<template>
    <div class="ticket_img" id="ticket_img" ref="ticket_img" v-if="isloading">
        <canvas id="canvas_off" ref="off" class="canvas_off" width="620" height="620"></canvas>
        <canvas id="canvas_on" ref="on" class="canvas_on" width="620" height="620"></canvas>
    </div>
</template>

<script>
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
            isloading: false
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
        getList () {
            return this.$get("/scratch/detail").then(res => {
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
                this.renderGold(this.card.golds_amount, goldIndex % 3 * 210 + 95, Math.floor(goldIndex / 3) * 210 + 152)
            } else {
                this.$toast({
                    content: _("networkError")
                })
            }
        },
        renderGold (number, x, y) {
            this.contextOn.font = "32px bold Helvetica"
            this.contextOn.textAlign = "center"
            this.contextOn.textBaseline = "middle"
            this.contextOn.fillStyle = "#48198e"
            this.contextOn.fillText(number.toString(), x, y)
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
            if (this.isClear || this.card === null) {
                return
            }
            event = event || window.event
            let touch = hastouch ? event.changedTouches[0] : event
            this.contextOff.beginPath()
            this.contextOff.arc((touch.pageX - this.offsetLeft) * this.scale, (touch.pageY - this.offsetTop) * this.scale, 40, 0, 2 * Math.PI, false)
            this.contextOff.fill()
            this.currentTouch = touch

        },
        touchMoveHandler (event) {
            event.preventDefault()
            if (this.isClear || this.card === null) {
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
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.timer = setTimeout(() => {
                let data = this.contextOff.getImageData(0, 0, 620, 620).data
                let area = data.filter((item, index) => item === 0 && (index % 4 === 3)).length / (620 * 620)
                if (area >= 0.8) {
                    this.contextOff.clearRect(0, 0, 620, 620)
                    this.isClear = true
                    // 上报刮刮卡后调用 refreshInfo 刷新金币数量
                    this.$emit("getPrize", {
                        ...this.card
                    })
                }
            }, 300)
        },
        init () {
            this.isloading = false
            let imgDataPromise = this.getImgData([
                "./staticImg/all_off.png",
                "./staticImg/all.png"
            ])
                .then(res => {
                    this.imgoff = res[0]
                    this.imgon = res[1]
                    this.renderAlloff()
                    return res
                })
            Promise.all([
                this.getList(),
                imgDataPromise
            ])
                .then(data => {
                    this.isloading = true
                    this.$nextTick(() => {
                        this.isClear = false
                        this.timer = null
                        this.canvasOff = this.$refs.off
                        this.contextOff = this.canvasOff.getContext("2d")
                        this.canvasOn = this.$refs.on
                        this.contextOn = this.canvasOn.getContext("2d")
                        this.renderAll()
                    })
                })
        }
    },
    destroyed () {
        this.canvasOff.removeEventListener(tapstart, this.touchStartHandler)
        this.canvasOff.removeEventListener(tapmove, this.touchMoveHandler)
        this.canvasOff.removeEventListener(tapend, this.touchEndHandler)
    },
    mounted () {
        this.init()
    }
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
.ticket_img {
  position: relative;
  width: 620 * @vw;
  overflow: hidden;
  margin: 146 * @vw auto 0;
  opacity: 0;
  animation: fadeIn 0.5s 0.4s cubic-bezier(0.73,-0.2, 1, 1) both;
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
}
@keyframes fadeIn {
  0%{}
  100%{
    opacity: 1;
  }
}
</style>
