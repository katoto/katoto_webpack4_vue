<template>
    <div id="pentagon">

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
#pentagon {
  position: relative;
  width: 54px;
  box-sizing: content-box;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: red transparent;
}
#pentagon:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  top: -85px;
  left: -18px;
  border-width: 0 45px 35px;
  border-style: solid;
  border-color: transparent transparent red;
}

</style>
