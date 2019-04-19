<template>
    <div class="pop-list">
        <div class="pop_layer" v-show="app.hadPopShow"></div>
        <RecordList></RecordList>
        <RechangeMany></RechangeMany>
        <Real2card></Real2card>
        <RuleHelp></RuleHelp>
        <ExchangeTips></ExchangeTips>
        <ProductDetail></ProductDetail>
        <ExchangeVirtual></ExchangeVirtual>
        <ExchangeReal></ExchangeReal>
        <ExchangedReal></ExchangedReal>
        <!-- <common></common>
        <confirm></confirm> -->
    </div>
</template>
<script>
import RecordList from "./pop/Pop_record_list.vue"
import RechangeMany from "./pop/Pop_rechange_many.vue"
import Real2card from "./pop/Pop_real2card.vue"
import RuleHelp from "./pop/Pop_rule_help.vue"
import ExchangeTips from "./pop/Pop_exchange_tips.vue"
import ProductDetail from "./pop/Pop_product_detail.vue"
import ExchangeVirtual from "./pop/Pop_exchange_virtual.vue"
import ExchangeReal from "./pop/Pop_exchange_real.vue"
// import common from "./pop/Pop_common.vue"
// import confirm from "./pop/Pop_confirm.vue"
import ExchangedReal from "./pop/Pop_exchanged_real"
export default {
    inject: ["app"],
    components: {
        RecordList,
        RechangeMany,
        Real2card,
        RuleHelp,
        ExchangeTips,
        ProductDetail,
        ExchangeVirtual,
        ExchangeReal,
        // common,
        // confirm,
        ExchangedReal
    }
}
</script>
<style lang="less" type="text/less" scope>
@import "../../../styles/lib-mixins.less";
.pop {
  &.pop_list_redemption_record {
    .pop_main {
      display: flex;
      flex-direction: column;
      height: 1020/75rem;
    }
    .redemption_record {
      flex: 1;
      margin: 18/75rem 0;
      overflow: auto;
    }
    ul {
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(52, 53, 82, 0.3);
      border: 2/75rem solid #443e6d;
      width: 594/75rem;
      height: 217/75rem;
      overflow: hidden;
      margin: 0 auto;
      border-radius: 8/75rem;
      & + li {
        margin-top: 14/75rem;
      }
    }
    .record_img {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 230/75rem;
      white-space: nowrap;
      img {
      }
      .record_name {
      }
    }
    .record_msg {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 330/75rem;
      height: 200/75rem;
      overflow: hidden;
      padding-top: 20/75rem;
      font-size: 22/75rem;
    }
    .record_view {
      p {
        display: flex;
        align-items: flex-start;
        line-height: 1.2;
        min-height: 40/75rem;
      }
      span {
        white-space: nowrap;
      }
      i {
        word-break: break-all;
      }
    }
    .record_time {
      line-height: 40/75rem;
    }

    .record_view {
      flex: 1;
    }
    .goods_unusual {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  &.pop_rule {
    .pop_rule_main {
      width: 616/75rem;
      max-height: 500/75rem;
      overflow: auto;
      padding: 12/75rem 16/75rem 20/75rem 40/75rem;
      line-height: 44/75rem;
      font-size: 26/75rem;
      margin: 54/75rem auto 25/75rem;
      background-color: rgba(20, 18, 30, 0.302);
      box-shadow: inset 0/75rem 1/75rem 2/75rem 0/75rem rgba(9, 8, 14, 0.75);
      border-radius: 10/75rem;
    }
    p + p {
      margin-top: 44/75rem;
    }
    .rechange_tips {
      margin-top: 37/75rem;

      .tips_form {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 86/75rem;
        label {
          white-space: nowrap;
        }
      }
      input {
        display: none;
      }
      .icon_checkbox {
        display: block;
        width: 43/75rem;
        height: 35/75rem;
        overflow: hidden;
        margin-right: 8/75rem;
        background: url(../../../assets/img/checkbox_green.png) no-repeat center;
        background-size: cover;
        white-space: nowrap;
        &.on {
          background: url(../../../assets/img/checkbox_green_on.png) no-repeat
            center;
          background-size: cover;
        }
      }
    }
    .btn_default {
      margin-bottom: 4/75rem;
    }
  }
  &.pop_exchange_virtual {
    text-align: center;
    .product_img {
      width: percentage(223/674);
      margin: 30/75rem auto 26/75rem;
    }
    .product_name {
      line-height: 58/75rem;
      font-size: 30/75rem;
    }
    .product_use {
      height: 120/75rem;
      line-height: 52/75rem;
      font-size: 20/75rem;
      opacity: 0.3;
    }
    .card_msg {
      padding-left: 60/75rem;
      text-align: left;
      font-size: 28/75rem;
      white-space: nowrap;
      p {
        display: flex;
        align-items: flex-start;
        height: 51/75rem;
        &.message {
          height: auto;
        }
      }
      span {
        display: block;
        width: 93/75rem;
        width: 150/75rem;
      }
      p + p {
        margin-top: 22/75rem;
      }
    }
    .card_layer {
      display: block;
      width: 363/75rem;
      height: 51/75rem;
      overflow: hidden;
      margin-left: 10/75rem;
      background: url(../img/card_layer.png) no-repeat center;
      background-size: cover;
    }
    .card_psw {
      display: block;
      padding-right: 10/75rem;
      width: 300/75rem;
      overflow: hidden;
      margin-left: 24/75rem;
      word-break: break-word;
      white-space: normal;
      &.overflow {
        .text-overflow();
      }
      &.message {
        flex: 1;
        padding-right: 20/75rem;
      }
    }
    .btn_copy {
      position: relative;
      width: 81/75rem;
      height: 35/75rem;
      //   overflow: hidden;
      border-radius: 18/75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20/75rem;
      &::after {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #fff;
        transform-origin: left top;
        transform: scale(0.5);
        border-radius: 14/75rem;
      }
    }
    .btn_default {
      margin: 80/75rem auto 92/75rem;
    }
  }
  &.pop_rechange_many {
    .product_img {
      width: percentage(223/674);
      margin: 30/75rem auto 26/75rem;
    }
    .product_msg {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
    }
    .product_name {
      line-height: 57/75rem;
      padding: 0 12/75rem;
      font-size: 36/75rem;
      font-weight: bold;
    }
    .product_count {
      font-size: 32/75rem;
      color: #febb2c;
    }
    .product_use {
      display: table;
      margin: 10/75rem auto;
      padding: 0 22/75rem;
      line-height: 57/75rem;
      font-size: 20/75rem;
      color: #807e86;
      white-space: nowrap;
    }
    .pop_rechange_many_main {
      width: 616/75rem;
      max-height: 290/75rem;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12/75rem 0 20/75rem 0;
      line-height: 50/75rem;
      font-size: 28/75rem;
      margin: 0 auto;
      background-color: rgba(20, 18, 30, 0.302);
      box-shadow: inset 0/75rem 1/75rem 2/75rem 0/75rem rgba(9, 8, 14, 0.75);
      border-radius: 10/75rem;
    }
    .pop_rechange_many_list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 620/75rem;
      height: 127/75rem;
      padding: 0 66/75rem;
      overflow: hidden;
      margin: 0 auto 0;
      background: url(../../../assets/img/icon_pop_line.png) no-repeat center
        bottom;
      background-size: 100%;
      white-space: nowrap;
      p {
        display: flex;
        overflow: hidden;
      }
    }
    .card_num {
      opacity: 0.3;
    }
    .card_psw {
      margin-left: 24/75rem;
      .text-overflow();
    }

    .pop_rechange_many_before {
      text-align: center;
    }
    .text_error {
      margin: 27/75rem 0 0;
      line-height: 62/75rem;
      font-size: 30/75rem;
      color: #ff3a2b;
    }
    .input_box {
      display: flex;
      align-items: center;
      width: 304/75rem;
      height: 78/75rem;
      overflow: hidden;
      margin: 0 auto 0;
      border: 3/75rem solid #534c78;
      background: #534c6f;
      border-radius: 10/75rem;
      .btn {
        height: 100%;
        flex: 1;
        text-indent: 999999px;
        font-size: 0;
        &.btn_delete {
          background: #38324e url(../../../assets/img/icon_delete.png) no-repeat
            center;
          background-size: 21/75rem;
        }
        &.btn_add {
          background: #38324e url(../../../assets/img/icon_add.png) no-repeat
            center;
          background-size: 21/75rem;
        }
      }
      input {
        border-left: 2/75rem solid #534c78;
        border-right: 2/75rem solid #534c78;
        width: 206/75rem;
        height: 100%;
        background: #23202e;
        color: #fff;
        font-size: 36/75rem;
        text-align: center;
      }
    }
    .text_tips {
      height: 95/75rem;
      line-height: 66/75rem;
      font-size: 28/75rem;
      opacity: 0.3;
    }
    .btn_default {
      margin: 40/75rem auto 30/75rem;
    }
  }
  &.pop_exchange_real {
    text-align: center;
    .product_img {
      width: percentage(223/674);
      margin: 30/75rem auto 26/75rem;
    }
    .product_name {
      line-height: 58/75rem;
      font-size: 30/75rem;
    }
    .product_use {
      line-height: 52/75rem;
      font-size: 20/75rem;
      opacity: 0.3;
    }
    .address_input {
      position: relative;
      width: 605/75rem;
      margin: 0 auto;
      overflow: hidden;
    }
    input {
      position: relative;
      z-index: 2;
      display: block;
      width: 605/75rem;
      height: 90/75rem;
      overflow: hidden;
      border-radius: 10/75rem;
      line-height: 90/75rem;
      background: rgba(31, 28, 41, 0.75);
      border: 2/75rem solid rgba(113, 102, 175, 0.75);
      font-size: 30/75rem;
      color: #fff;
      text-indent: 28/75rem;
      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.3);
        font-size: 30/75rem;
        //   font-size: 20/75rem;
      }
      & + input {
        margin-top: 12/75rem;
      }
    }
    .address_detail {
      position: absolute;
      z-index: 1;
      left: 0;
      top: (90+90+12+12)/75rem;
      width: 605/75rem;
      line-height: 90/75rem;
      text-indent: 28/75rem;
      color: rgba(255, 255, 255, 1);
      font-size: 30/75rem;
      white-space: nowrap;
      text-align: left;
      i {
        font-size: 20/75rem;
      }
    }
    .user_msg {
      display: flex;
      text-align: left;
      line-height: 50/75rem;
      font-size: 28/75rem;
      .user_t {
        width: 190/75rem;
        text-indent: 54/75rem;
        white-space: nowrap;
        opacity: 0.3;
      }
      .user_c {
        width: 420/75rem;
        word-break: break-all;
        &.user_address {
          margin-top: 5/75rem;
          line-height: 40/75rem;
        }
      }
      & + .user_msg {
        margin-top: 15/75rem;
      }
    }
    .address_input {
      .btn_default {
        margin: 47/75rem auto 53/75rem;
      }
    }
    .btn_choose {
      margin: 74/75rem auto 53/75rem;
    }
  }
  &.pop_product_detailed {
    text-align: center;
    .product_img {
      width: percentage(223/674);
      margin: 30/75rem auto 26/75rem;
    }
    .product_name {
      line-height: 58/75rem;
      font-size: 30/75rem;
    }
    .product_use {
      line-height: 52/75rem;
      font-size: 20/75rem;
      opacity: 0.3;
    }
    .product_nedd {
      display: flex;
      justify-content: center;
      margin: 50/75rem auto 70/75rem;
    }
  }
}
.pop_congratulation {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .pop_con_main {
    position: relative;
    width: 100%;
    img {
      display: block;
      width: 230/75rem;
    }
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 506/75rem;
      position: absolute;
      z-index: 1;
      top: 115/75rem;
      left: 0;
      background: url(../img/pop_congratulation_light.png) no-repeat center;
      background-size: 512/75rem;
    }
  }
  .c_title,
  .c_count,
  .c_msg {
    position: relative;
    z-index: 2;
  }
  .c_title {
    width: 486/75rem;
    height: 231/75rem;
    overflow: hidden;
    margin: 72/75rem auto 42/75rem;
    background: url(../img/pop_congratulation_title.png) no-repeat center;
    background-size: cover;
    // line-height: 80/75rem;
    // font-size: 48/75rem;
    // font-weight: bold;
    // color: #f4d82a;
    // &::before {
    //   content: attr(data-msg);
    //   background-image: linear-gradient(to bottom, #f4b632, #f4e228);
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   text-shadow: 0 0 10/75rem rgba(50, 46, 82, 0.75),
    //     0 0 4/75rem rgba(124, 115, 163, 0.75);
    //   line-height: 80/75rem;
    //   font-size: 48/75rem;
    //   font-weight: bold;
    //   color: #f4d82a;
    // }
  }
  .c_count {
    padding-top: 139/75rem;
    line-height: 66/75rem;
    font-size: 50/75rem;
    color: #febb2b;
    font-weight: bold;
    font-family: sans-eb;
    background: url(../img/pop_congratulation_box.png) no-repeat center top;
    background-size: 216/75rem;
  }
  .c_msg {
    max-width: 94%;
    margin: 0 auto;
    line-height: 50/75rem;
    font-size: 24/75rem;
    opacity: 0.6;
  }
  .btn_default {
    width: 213/75rem;
    height: 76/75rem;
    overflow: hidden;
    margin: 90/75rem auto 0;
    text-align: center;
    line-height: 76/75rem;
    font-size: 34/75rem;
    font-weight: bold;
    background: url(~@assets/img/btn_default.png) no-repeat center;
    background-size: cover;
    &.disable {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
.icon_success {
  position: absolute;
  top: 170/75rem;
  right: 200/75rem;
  width: 74/75rem;
  height: 74/75rem;
  overflow: hidden;
  background: #39b607 url(../../../assets/img/pop_confirm.png) no-repeat
    center;
  background-size: 55/75rem;
  border-radius: 50%;
  animation: icon_success_enter 0.2s;
}
@keyframes icon_success_enter {
  0% {
    opacity: 0;
    transform: scale(5);
  }
  40%{
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: 1;
  }
}
</style>
