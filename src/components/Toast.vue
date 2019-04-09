<template>
  <!-- toast -->
  <transition name="toast">
    <div class="toast">
      <div class="toast_main">toast</div>
    </div>
  </transition>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   computed: {},
   methods: {},
   mounted(){}
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
    background: url(../assets/img/toast.png) no-repeat center;
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
