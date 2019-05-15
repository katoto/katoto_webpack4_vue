<template>
    <div v-if="message && message.content">
        <transition name="toast">
            <div class="toast">
                <div class="toast_main">
                    <span>{{ message.content }}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    data () {
        return {
            message: {},
            timer: false
        }
    },
    methods: {
        addNotice (notice) {
            this.message = notice
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.remove()
            }, Number(notice.duration))
        },
        remove () {
            this.message = {}
            this.timer = false
        }
    }
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
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
    width: 673*@vw;
    height: 132*@vw;
    overflow: hidden;
    // background: url(../../assets/img/toast.png) no-repeat center;
    background: rgba(0, 0, 0, 0.5);
    background: linear-gradient(to right, transparent, #000, transparent);
    background-size: cover;
    text-align: center;
    line-height: 1.2;
    font-size: 30*@vw;
    color: #ffffff;
  }
  span + span {
    margin-top: 10*@vw;
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
