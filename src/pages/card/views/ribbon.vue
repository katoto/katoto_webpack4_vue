
<template>
    <canvas id="ribbon" width="750" height="1334"></canvas>
</template>

<script>

export default {
    data () {
        return {
            n: 30,
            colors: ["#00ff6c","#ff6b2a","#7fa9ff","#febb2b"],
            width: 40,
            height: 20,
            ribbons: [],
            // 重力加速度
            G: 0.3,
            isMove: true

        }
    },
    components: {

    },
    computed: {},
    methods: {},
    mounted () {
        let that = this
        let ribbon = document.getElementById("ribbon")
        let ribbon_context = ribbon.getContext("2d")
        let WIDTH = ribbon.width
        let HEIGHT = ribbon.height
        class Ribbon {
            constructor (color = "#ff6b2a",width,height) {
                this.color = color
                this.x = width / 2
                this.y = height / 2
                this.width = width
                this.height = height
                /* +-100 */
                this.transform_x = ~~(WIDTH / 2 + (Math.random() * 2 - 1) * 100)
                this.transform_y = HEIGHT / 2
                /* +-60deg */
                this.angle = Math.round((Math.random() * 2 - 1) * 90)
                /* 旋转加速度 */
                this.angleV = (Math.random() * 2 - 1) * 2
                /* +- 2 */
                this.vx =  Math.round((Math.random() * 2 - 1) * 15)
                /* 8-10 */
                this.vy = (Math.random() * 2 - 1) * 8 + 10
            }
            draw () {
                ribbon_context.beginPath()
                ribbon_context.save()
                ribbon_context.fillStyle = this.color
                ribbon_context.translate(this.transform_x, this.transform_y)
                ribbon_context.rotate(Math.PI / 180 * this.angle)
                ribbon_context.fillRect(-this.width / 2,-this.height / 2,this.width,this.height)
                ribbon_context.restore()
                ribbon_context.closePath()
            }
        }
        for (let i = 0;i < this.n;i++) {
            let ribbon = new Ribbon(getColor(),this.width,this.height)
            ribbon.draw()
            this.ribbons.push(ribbon)
        }
        (function frame () {
            if (that.isMove) {
                requestAnimationFrame(frame)
                ribbon_context.clearRect(0,0,WIDTH,HEIGHT)
                that.ribbons.forEach((ribbon,index) => {
                    ribbon.transform_y -= ribbon.vy
                    ribbon.vy -= that.G
                    ribbon.angle -= ribbon.angleV
                    if ( ribbon.vx > 0 ) {
                        ribbon.transform_x -= ribbon.vx
                        ribbon.vx -= that.G
                    }
                    if ( ribbon.vx < 0 ) {
                        ribbon.vx += that.G
                        ribbon.transform_x -= ribbon.vx
                    }
                    if (ribbon.transform_y > HEIGHT * 2) {
                        // 删除的时候会闪烁
                        that.ribbons.splice(index,1)
                    }
                    ribbon.draw()
                })
                if (that.ribbons.length == 0) {
                    that.isMove = false
                }
            }
        })()

        function getColor () {
            return that.colors[Math.round(Math.random() * that.colors.length)]
        }
    }
}

</script>

<style lang="less" scoped type="text/less">
</style>
