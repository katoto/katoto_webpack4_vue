
<template>
    <canvas id="ribbon" width="750" height="1334"></canvas>
</template>

<script>

export default {
    data () {
        return {
            n: 5,
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

        class Ribbon {
            constructor (x,y) {
                this.color = getColor()
                this.x = x
                this.y = y
                this.width = that.width
                this.height = that.height
            }
            print (index) {
                ribbon_context.fillStyle = this.color
                ribbon_context.rotate(Math.PI / 180 * index)
                ribbon_context.fillRect(this.x,this.y,this.width,this.height)
            }
            move () {
                this.print()
            }
        }

        function init () {
            for (let i = 0; i < 50; i++) {
                let ribbon = new Ribbon(WIDTH / 2,HEIGHT / 2)
                that.ribbons.push(ribbon)
            }
            update()
        }
        function update () {
            ribbon_context.clearRect(0,0,WIDTH,HEIGHT)
            that.ribbons.forEach((ribbon, index) => {
                ribbon.move(index)
            })
            // requestAnimationFrame(update)
        }
        init()

        function getRandom (a, b) {
            return Math.random() * (b - a) + a
        }
        function getColor () {
            return that.colors[Math.round(Math.random() * that.colors.length)]
        }

    }
}
</script>

<style lang="less" scoped type="text/less">
</style>
