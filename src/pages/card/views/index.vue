<template>
    <div class="page_card">
        <header class="card_header">
            <a class="btn_back"></a>
            <!-- <a class="btn_gift"></a>
            <a class="btn_help"></a> -->
            <a class="btn_ticket">6</a>
        </header>
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
@vh: 100/1334vh;
.page_card {
  min-height: 100vh;
  padding-top: 15 * @vw;
  background: #363a46;
}
.card_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 24 * @vw 0 20 * @vw;
  height: 60 * @vw;
  overflow: hidden;
  .btn_back {
    width: 50 * @vw;
    height: 50 * @vw;
    overflow: hidden;
    background: url(../img/btn_back.png) no-repeat center;
    background-size: cover;
  }
  .btn_ticket {
      display: flex;
    width: 195 * @vw;
    height: 60 * @vw;
    overflow: hidden;
    background: url(../img/btn_ticket.png) no-repeat center;
    background-size: cover;
    line-height: 60*@vw;
    text-align: center;
    font-size: 36*@vw;
    font-weight: bold;
  }
}
</style>
