<template>
  <Pop class="pop_rechange_many" :show.sync="show">
    <div class="h3 pop_name">{{_('m_payment.exchange_success')}}</div>
    <img class="product_img" :src="message.imgurl" alt>
    <div class="product_msg">
      <p class="product_name">{{message.goodsname}}</p>
      <p class="product_count">({{_('m_payment.virtual_num', 3)}})</p>
    </div>
    <p class="product_use">{{message.goodsdesc}}</p>
    <div class="pop_rechange_many_main">
      <ul v-if="message.convert">
        <li class="pop_rechange_many_list" v-for="item in message.convert.cards" :key="item.cardno">
          <p>
            <span class="card_num">{{_('m_payment.card_no')}}:</span>
            <i class="card_psw">{{item.goodsid}}</i>
          </p>
          <p>
            <span class="card_num">{{_('m_payment.password')}}:</span>
            <i class="card_psw">{{item.password}}</i>
          </p>
        </li>
      </ul>
    </div>
    <a href="javascript:" class="btn_default">{{_('m_payment.copy_all')}}</a>
  </Pop>
</template>
<script>
import Pop from "./Pop.vue"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showReal2card
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setReal2card", true)
                } else {
                    this.app.setPopStore("setReal2card", false)
                }
            }
        },
        message:{
            get:function(){
                return this.app.covert_message
            }
        }
    },
    components:{
        Pop
    },
    mounted(){
        console.log(this.message)
    }
}
</script>
