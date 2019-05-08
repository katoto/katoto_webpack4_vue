
export default {
    data () {
        return {

        }
    },
    components: {

    },
    computed: {},
    methods: {},
    mounted () {
        var that = this
        var canvas = document.getElementById("canvas_off")
        var ctx = canvas.getContext("2d")
        var ticket_img = document.getElementById("ticket_img")
        var scale = canvas.width / ticket_img.clientWidth
        var offsetLeft = ticket_img.offsetLeft
        var offsetTop = ticket_img.offsetTop
        var imgs = ["./staticImg/all_off.png", "./staticImg/all.png"]
        var cicle_r = 40
        // 0.5=>50%时自动清空画布
        var isClear = 0.5
        var cache = []
        var ongoinTouches = []
        var hastouch = "ontouchstart" in window ? true : false,
            tapstart = hastouch ? "touchstart" : "mousedown",
            tapmove = hastouch ? "touchmove" : "mousemove",
            tapend = hastouch ? "touchend" : "mouseup"

        /* 离线图片 */
        var cacheCanvas = document.createElement("canvas")
        cacheCanvas.width = 1240
        cacheCanvas.height = 620
        var cacheContext = cacheCanvas.getContext("2d")
        /*
        从离线图片生成的目标图片
        * width:200
        * height:200
        * margin:10
        */
        var resultCanvas = document.getElementById("canvas_on")
        var resultContext = resultCanvas.getContext("2d")
        var cacheImage = new Image()
        cacheImage.src = "./staticImg/all.png"
        cacheImage.onload = function () {
            cacheContext.drawImage(cacheImage, 0, 0)
            that.lists.forEach(function (key, index) {
                /* image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight */
                resultContext.drawImage(cacheImage,location[key].x,location[key].y, 200 , 200, location[key].x , location[key].y , 200 , 200)
                // resultContext.drawImage(cacheImage, 0, 0)
            })
        }
        preloadImage(imgs, function () {
            init()
            ctx.globalCompositeOperation = "destination-out"
            canvas.addEventListener(tapstart, handleStart, false)
            canvas.addEventListener(tapend, handleEnd, false)
        })
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
                canvas.removeEventListener(tapstart, handleStart)
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
        function init () {
            ctx.drawImage(cache[0], 0, 0)
        }
    }
}
