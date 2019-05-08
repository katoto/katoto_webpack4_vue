
export default {
    data () {
        return {
            n: 3,
            colors: ["#00ff6c","#ff6b2a","#7fa9ff","#febb2b"],
            width: 40,
            height: 20,
            ribbons: []
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
        let width = ribbon.width
        let height = ribbon.height
        class Ribbon {
            constructor (color = "#ff6b2a",x,y,width,height,angle) {
                this.color = color
                this.x = x
                this.y = y
                this.width = width
                this.height = height
                this.vx = (Math.random() * 2 - 1) * 100
                this.vy = Math.random() * 10
                // +-60deg
                this.angle = Math.round((Math.random() * 2 - 1) * 90)
            }
            draw () {
                ribbon_context.beginPath()
                ribbon_context.save()
                ribbon_context.fillStyle = this.color
                ribbon_context.translate(width / 2 + this.vx,height / 2 + this.vy)
                ribbon_context.rotate(Math.PI / 180 * this.angle)
                ribbon_context.fillRect(-this.width / 2,-this.height / 2,this.width,this.height)
                ribbon_context.restore()
                ribbon_context.closePath()
            }
        }
        for (let i = 0;i < this.n;i++) {
            let ribbon = new Ribbon(getColor(),getLocation().x,getLocation().y,20,40)
            ribbon.draw()
            this.ribbons.push(ribbon)
        }
        (function frame () {
            // requestAnimationFrame(frame)
            ribbon_context.clearRect(0,0,width,height)
            that.ribbons.forEach((ribbon,index) => {

                ribbon.vy++
                ribbon.draw()

            })
        })()

        function getColor () {
            return that.colors[Math.round(Math.random() * that.colors.length)]
        }
        function getLocation () {
            return {
                x: Math.random() * width,
                y: height / 2
            }
        }
    }
}
