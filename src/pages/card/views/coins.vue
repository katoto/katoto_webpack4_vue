
<template>
    <canvas id="ribbon" width="750" height="1334"></canvas>
</template>

<script>

export default {
    data () {
        return {
            n: 10,
            colors: ["#00ff6c","#ff6b2a","#7fa9ff","#febb2b"],
            width: 20,
            height: 40,
            ribbons: [],
            // 重力加速度
            G: 0.1,
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
        let img = new Image()
        img.src = "./staticImg/icon_c.png"
        img.onload = function () {
            init()
        }
        class Ribbon {
            constructor () {
                this.color = getColor()
                this.x = WIDTH / 2
                this.y = HEIGHT / 2
                this.a = Math.random()
                this.vx = 4
                this.vy = ~~getRandom(10,20) * 1
            }
            print () {
                ribbon_context.drawImage(img,0,0,40,41,this.x,this.y,40,41)
            }
            move (index) {
                this.print()
                this.x += this.vx
                this.y += this.vy
                // this.vx *= this.a
                // this.vy *= this.a
                if (this.x > WIDTH || this.x < 0 || this.y > HEIGHT || this.y < 0) {
                    // that.ribbons.splice(this,1)
                    this.x = WIDTH / 2
                    this.y = HEIGHT / 2
                }
            }
        }

        function init () {
            for (let i = 0; i < that.n; i++) {
                let ribbon = new Ribbon()
                that.ribbons.push(ribbon)
            }
            update()
        }
        function update () {
            ribbon_context.clearRect(0,0,WIDTH,HEIGHT)
            for (let i = 0;i < that.ribbons.length;i++) {
                that.ribbons[i].move()
            }
            requestAnimationFrame(update)
        }

        function getDirection () {
            let t = Math.random()
            let direction = 0
            t > 0.5 ? direction = 1 : direction = -1
            return direction
        }
        function getRandom (a, b) {
            return (Math.random() * (b - a) + a)
        }
        function getColor () {
            return that.colors[Math.round(Math.random() * that.colors.length)]
        }

    }
}
</script>

<style lang="less" scoped type="text/less">
</style>
