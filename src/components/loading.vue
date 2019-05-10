<template>
    <div class="loading">
        <div class="common_loading"></div>
    </div>
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
    mounted () {}
}
</script>

<style lang="less" scoped type="text/less">
@vw: 100/750vw;
.loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
