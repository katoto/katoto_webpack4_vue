export default {
    data () {
        return {
            hadPopShow:false,
            pop: {
                showRecordList: false,
                showRechangeMany: false,
                showRuleHelp: false,
                showExchangeTips: false,
                showProductDetail: false,
                showExchangeVirtual: false,
                showExchangeReal: false,
                showCommon: false,
                showReal2card: false,
                showCongratulation: false,
                showExchangedReal: false
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
            // 弹层的灰色蒙版单独处理
            if (!data ) {
                // 二次弹层关闭时保留蒙版
                if (func!=="setReal2card") {
                    setTimeout(() => {
                        this.hadPopShow = data
                    }, 200)
                }
            } else {
                this.hadPopShow = data
            }

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
            case "setCongratulation":
                this.pop.showCongratulation = data
                break
            case "setExchangedReal":
                this.pop.showExchangedReal = data
                break
            }

        }
    }
}
