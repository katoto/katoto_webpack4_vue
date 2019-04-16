<template>
    <Pop class="pop_product_detailed" :show.sync="show">
        <div class="h3 pop_name">{{_('m_payment.exchange_title')}}</div>
        <img class="product_img" :src="message.imgurl" alt>
        <p class="product_name">{{message.name}}</p>
        <p class="product_use">{{message.goodsdesc}}</p>
        <p class="product_nedd">
            <i class="icon_gold"></i>{{formateBalance(message.needgolds)}}
        </p>
    </Pop>

</template>
<script>
import Pop from "./Pop.vue"
import {
    formateBalance
} from "@/common/util"
export default {
    inject: ["app"],
    computed:{
        show:{
            get: function () {
                return this.app.pop.showProductDetail
            },
            set: function (isShow) {
                if (isShow) {
                    this.app.setPopStore("setProductDetail", true)
                } else {
                    this.app.setPopStore("setProductDetail", false)
                }
            }
        },
        message:{
            get:function () {
                return this.app.product_detail
            }
        }
    },
    components:{
        Pop
    },
    methods: {
        formateBalance
    }
}
</script>
