<template>
  <div id="app">
    <router-view v-if="1" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            isReady: false
        }
    },
    components: {
    },
    methods: {
    },
    computed: {
    },
    async mounted() {
        console.log('config')
    }
}
</script>

<style lang="less" type="text/less">
// @import "../styles/lib-reset.css";
</style>
