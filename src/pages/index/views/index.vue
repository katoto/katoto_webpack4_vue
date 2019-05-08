<template>
    <div>
        <div class="head">
            <img src="../img/contenthead.jpg">
            <div class="btn">
                <a :href="contHref" target="_blank" class="down_and"></a>
                <a href="https://itunes.apple.com/app/id1453136833" target="_blank" class="down_ios"></a>
            </div>
        </div>
        <div class="content">
            <img :src="contentSrc">
            <p class="reserved">
                ©ROTARY FORTUNE LIMITED 2018. All Rights Reserved
            </p>
        </div>
    </div>
</template>

<script>
import {
    isIOS,
    getURLParams
} from "@common/util"

export default {
    data () {
        return {
            contentSrc: "",
            contHref: "//play.google.com/store/apps/details?id=com.crazy500.cbet"
        }
    },
    components: {
    },
    mounted () {
        if(getURLParams() && getURLParams().utm_source === 'facebook'){
            this.contHref = '//www.madcrickets.com/msapk/cbet_release_v1.2.7_fbsns.apk'
        }
        this.$nextTick(() => {
            this.contentSrc = require("@/pages/index/img/contentbody.png")
        })
    }
}
</script>
<style>
img {
  display: block;
  border: 0;
}
body {
  background-color: #140e2b;
}
body .head img {
  display: block;
  width: 100%;
  min-height: 743px;
}
body .content {
  width: 100%;
  padding-top: 160px;
}
body .content img {
  display: block;
  margin: 0 auto;
  width: 1139px;
  height: 1578px;
}
.btn {
    margin: -120px auto;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center
}
body .head .btn a {
    display: block;
    width: 212px;
    height: 45px;
    margin: 0 10px;
    background-image: url(../img/down.png);
    position: relative;
    z-index: 2;
    transition: all .2s;
    cursor: pointer;
}

.down_and {
    background-position: 0 0
}

.down_ios {
    background-position: 0 bottom
}

body .head .btn a:active,body .head .btn a:hover {
    -webkit-filter: brightness(.8);
    filter: brightness(.8)
}
/* body .head .btn a {
  margin: -120px auto;
  display: block;
  width: 300px;
  height: 94px;
  background: url(../img/btndown.png) no-repeat left center;
  background-size: cover;
  position: relative;
  z-index: 2;
  transition: all 0.2s;
  transform: scale(0.7);
  cursor: pointer;
} */
body .head .btn a:active,
body .head .btn a:hover {
  filter: brightness(0.8);
}
.content{
    position: relative;
}
.reserved{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 2;
    text-align: center;
    color: #eec870;
    opacity: 0.8;
    user-select: auto;
}

</style>
