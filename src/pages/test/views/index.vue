<template>
    <div class="scroll-wrap">
        <div class="scroll-content" :style="{ top }">
            <p v-for="item in prizeList" >
                {{item.name}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeIndex: 0,
            intnum: undefined,
            prizeList: [
                {
                    name: "城轨采购网",
                    src: "http://www.railunique.com"
                },
                {
                    name: "城轨采购网",
                    src: "http://www.railunique.com"
                }
            ]
        }
    },
    components: {

    },
    computed: {
        top () {
            return - this.activeIndex * 50 + "px"
        }
    },
    methods: {
        ScrollUp () {
            this.intnum = setInterval(_ => {
                if (this.activeIndex < this.prizeList.length) {
                    this.activeIndex += 1
                } else {
                    this.activeIndex = 0
                }
            }, 1000)
        },
        Stop () {
            clearInterval(this.intnum)
        },
        Up () {
            this.ScrollUp()
        }
    },
    mounted () {
        this.ScrollUp()
    }
}
</script>

<style lang="less" scoped type="text/less">
 .scroll-wrap{
    height: 150px;
    overflow: hidden;
    color: #000;
 }
.scroll-content {
    position: relative;
    transition: top 0.5s;
}
 .scroll-content p{
    line-height: 50px;
    text-align: center;
}
a{

}
</style>
