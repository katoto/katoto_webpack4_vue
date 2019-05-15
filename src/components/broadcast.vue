<template>
    <ul class="list_news" :style="{transform:'translateY('+transform+')', transitionDuration: duration+'s'}">
        <li v-for="item in news1" :key="item.id" v-html="_(item.prize_type === 'golds' ? 'm_card.broadcast1' : 'm_card.broadcast', item.username, formatterNum(item.prize_amount || 0))">
        </li>
    </ul>
</template>

<script>
import {
    formatterNum
} from "@/common/util"
export default {
    props: {
        news: {
            type: Array
        },
        lineHeight: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            activeIndex: 0,
            timer: "",
            await: 2000,
            duration: 0.2,
            news1: []

        }
    },
    computed: {
        transform () {
            return -this.activeIndex * this.lineHeight + "vw"
        }
    },
    methods: {
        formatterNum,
        scroll () {
            this.news1 = this.news
            let that = this
            this.timer = setInterval(() => {
                if (this.activeIndex < that.news1.length) {
                    this.duration = 0.2
                    this.activeIndex ++
                } else {
                    this.duration = 0
                    this.activeIndex = 0
                }
            }, this.await)
        },
        format () {
            this.news1 = JSON.parse(JSON.stringify(this.news))
            this.news.length >= 1 && this.news1.push({
                ...this.news1[0]
            })

            this.news1 = this.news1.map(item => {
                item.id = Math.random()
                return item
            })
        }
    },
    watch: {
        news () {
            this.format()
        }
    },
    mounted () {
        this.scroll()
        this.format()
    }
}
</script>

<style lang="less" scoped>
.list_news{
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
}
</style>

