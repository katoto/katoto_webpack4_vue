<template>
    <div>
        <header>
            <img
                src="../img/madsportslogo.png"
                alt=""
            >
        </header>
        <div class="contain">
            <img
                src="../img/bgtitle.png"
                alt=""
            >
            <img
                class="bg2title"
                src="../img/bg2title.png"
                alt=""
            >
            <div class="btn">
                <a
                    :href="contHref"
                    target="_blank"
                ></a>
            </div>
            <div class="secondTitle">
                <img
                    src="../img/feature.png"
                    alt=""
                >
            </div>
        </div>
        <footer>
            <img
                src="../img/style1.png"
                alt=""
            >
            <img
                src="../img/style2.png"
                alt=""
            >
            <img
                src="../img/style3.png"
                alt=""
            >
            <p class="reserved">
                ©ROTARY FORTUNE LIMITED 2018. All Rights Reserved
            </p>
        </footer>
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
        this.$nextTick(() => {
            if (isIOS) {
                // 待修改
                this.contHref = "https://itunes.apple.com/app/id1453136833"
            } else {
                if (getURLParams() && getURLParams().utm_source === "facebook") {
                    this.contHref = "//www.madcrickets.com/msapk/cbet_release_v1.2.7_fbsns.apk"
                }
            }
        })
    }
}
</script>
<style lang="less">
.hide {
  display: none !important;
}
a {
  text-decoration: none;
}

body {
  width: 100%;
  // height: 3113/75rem;
  background: #000 url(../img/conbg.png) no-repeat center;
  background-size: cover;
  header {
    position: absolute;
    left: 30/75rem;
    top: 30/75rem;
    img {
      display: block;
      width: 94/75rem;
      height: 74/75rem;
    }
  }
  .contain {
    img {
      display: block;
      margin: 0 auto;
      padding: 66/75rem 0 0 0;
      width: 679/75rem;
      height: 210/75rem;
    }
    .bg2title {
      padding: 0;
      width: 552/75rem;
      height: 44/75rem;
    }
    .btn {
      a {
        display: block;
        margin: 622/75rem auto 0 auto;
        width: 300/75rem;
        height: 96/75rem;
        transition: all 0.4s;
        background: url(../img/btndown.png) no-repeat left center;
        background-size: cover;
        &:active {
          filter: brightness(0.8);
        }
      }
    }
    .secondTitle {
      margin: 48/75rem auto 0 auto;
      img {
        display: block;
        width: 570/75rem;
        height: 55/75rem;
      }
    }
  }
  footer {
      position: relative;
    img {
      display: block;
      &:nth-child(1) {
        margin: 2/75rem auto;
        width: 729/75rem;
        height: 470/75rem;
      }
      &:nth-child(2) {
        margin: 2/75rem auto;
        width: 750/75rem;
        height: 509/75rem;
      }
      &:nth-child(3) {
        margin: 150/75rem auto;
        width: 733/75rem;
        height: 262/75rem;
        // padding-bottom: 200/75rem;
      }
    }
  }
}
.reserved{
    position: absolute;
    left: 0;
    bottom: -1.5rem;
    width: 100%;
    line-height: 2;
    text-align: center;
    color: #eec870;
    opacity: 0.8;
    user-select: auto;
}
</style>
