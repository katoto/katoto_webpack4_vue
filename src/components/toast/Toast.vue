<template>
        <!-- toast -->
        <div v-if="messageArr && messageArr.length > 0">
            <transition name="toast">
                <div class="toast">
                    <div class="toast_main">
                        <span v-for="item in messageArr" :key="item.name">{{ item.content }}</span>
                    </div>
                </div>
            </transition>
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
            notice = {
                ...notice,
                name
            }
            this.messageArr.push(notice)
            setTimeout(() => {
                this.remove(name)
            }, Number(notice.duration))
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 673/75rem;
    height: 132/75rem;
    overflow: hidden;
    // background: url(../../assets/img/toast.png) no-repeat center;
    background: rgba(0, 0, 0, 0.5);
    background: linear-gradient(to right, transparent, #000, transparent);
    background-size: cover;
    text-align: center;
    line-height: 1.2;
    font-size: 30/75rem;
    color: #ffffff;
  }
  span + span {
    margin-top: 10/75rem;
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
