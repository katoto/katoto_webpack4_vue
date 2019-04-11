<template>
    <!-- toast -->
    <div v-if="messageArr && messageArr.length>0">
        <!-- <transition name="toast"> -->
        <div class="toast">
            <div class="toast_main">
                <span v-for="(item,index) in messageArr" :key="index">{{ item.content }}</span>
            </div>
        </div>
        <!-- </transition> -->
    </div>

</template>

<script>
let seed = 0
function getuid () {
    return "toast_" + (seed ++)
}

export default {
    data () {
        return {
            messageArr: []
        }
    },
    methods: {
        addNotice (notice) {
            const name = getuid()
            if (!notice.duration) {
                notice = Object.assign({
                    duration: 30000
                }, notice)
            }
            notice = Object.assign({
                name: name
            }, notice)
            let duration = notice.duration
            this.messageArr.push(notice)
            setTimeout(() => {
                this.remove(name)
            }, parseFloat(duration))
        },
        remove (name) {
            const messageArr = this.messageArr
            for (let i = 0; i < messageArr.length; i++) {
                if (messageArr[i].name === name) {
                    this.messageArr.splice(i, 1)
                    break
                }
            }
        }
    },
    mounted () {
    }
}
</script>

<style lang="less" scoped type="text/less">
//toast
.toast {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .toast_main {
    width: 673/75rem;
    height: 132/75rem;
    overflow: hidden;
    background: url(../../assets/img/toast.png) no-repeat center;
    background-size: cover;
    text-align: center;
    line-height: 132/75rem;
    font-size: 30/75rem;
    color: #ffffff;
  }
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
</style>
