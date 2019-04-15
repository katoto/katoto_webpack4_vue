export default {
    data () {
        return {
            pop: {
                showRecordList: false,
                showRechangeMany: false,
                showRuleHelp: false,
                showExchangeTips: false,
                showProductDetail: false,
                showExchangeVirtual: false,
                showExchangeReal: true,
                showCommon: false,
                showReal2card: false
            },
            product_detail:{
                activity_imgurl: "",
                goodsdesc: "",
                goodstype: "",
                id: "",
                imgurl: "",
                islock: "",
                name: "",
                needgolds: "",
                top_status: "",
                updatetime: "",
                usage: "",
                weight: ""
            },
            covert_message: {
                goodsname: "123",
                imgurl: "12",
                goodstype: "123",
                goodsdesc: "12",
                goodsid: "123",
                cards: [
                    {
                        cardno: "1",
                        goodsid: "1",
                        password: "1"
                    }
                ]
            }
        }
    },
    methods: {
        setPopStore (func = "setRecordList", data = false) {
            switch (func) {
            case "setRecordList":
                this.pop.showRecordList = data
                break
            case "setRechangeMany":
                this.pop.showRechangeMany = data
                break
            case "setRuleHelp":
                this.pop.showRuleHelp = data
                break
            case "setExchangeTips":
                this.pop.showExchangeTips = data
                break
            case "setProductDetail":
                this.pop.showProductDetail = data
                break
            case "setExchangeVirtual":
                this.pop.showExchangeVirtual = data
                break
            case "setExchangeReal":
                this.pop.showExchangeReal = data
                break
            case "setCommon":
                this.pop.showCommon = data
                break
            case "setReal2card":
                this.pop.showReal2card = data
                break
            }
        }
    }
}
