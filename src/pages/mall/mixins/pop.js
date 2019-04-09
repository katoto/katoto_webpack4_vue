export default {
    data () {
        return {
            pop:{
                showRecordList: false,
                showRechangeMany: false,
                showRuleHelp: false,
                showExchangeTips: false,
                showProductDetail: false,
                showExchangeVirtual: false,
                showExchangeReal: false,
                showCommon: false
            }
        }
    },
    methods: {
        setPopStore (func = "setRecordList", data = false) {
            switch (func) {
            case "setRecordList": this.pop.showRecordList = data; break
            case "setRechangeMany": this.pop.showRechangeMany = data; break
            case "setRuleHelp": this.pop.showRuleHelp = data; break
            case "setExchangeTips": this.pop.showExchangeTips = data; break
            case "setProductDetail": this.pop.showProductDetail = data; break
            case "setExchangeVirtual": this.pop.showExchangeVirtual = data; break
            case "setExchangeReal": this.pop.showExchangeReal = data; break
            case "setCommon": this.pop.showCommon = data; break
            }
        }
    }
}
