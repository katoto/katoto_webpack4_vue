<template>
    <div class="pop-list">
        <RecordList></RecordList>
        <RechangeMany></RechangeMany>
        <RuleHelp></RuleHelp>
        <ExchangeTips></ExchangeTips>
        <ProductDetail></ProductDetail>
        <ExchangeVirtual></ExchangeVirtual>
        <ExchangeReal></ExchangeReal>
    </div>

</template>
<script>
import RecordList from "./pop/Pop_record_list.vue"
import RechangeMany from "./pop/Pop_rechange_many.vue"
import RuleHelp from "./pop/Pop_rule_help.vue"
import ExchangeTips from "./pop/Pop_exchange_tips.vue"
import ProductDetail from "./pop/Pop_product_detail.vue"
import ExchangeVirtual from "./pop/Pop_exchange_virtual.vue"
import ExchangeReal from "./pop/Pop_exchange_real.vue"
export default {
    components:{
        RecordList,
        RechangeMany,
        RuleHelp,
        ExchangeTips,
        ProductDetail,
        ExchangeVirtual,
        ExchangeReal
    }
}
</script>
