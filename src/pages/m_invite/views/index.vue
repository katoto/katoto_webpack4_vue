<template>
  <div>
    <div class="head">
      <button @click="fb_invite">facebook 邀请</button>
      <div class="btn">
        <a
          :href="contHref"
          target="_blank"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import { isIOS } from '@common/util'

export default {
    data() {
        return {
            contentSrc: '',
            contHref: '//play.google.com/store/apps/details?id=com.crazy500.cbet'
        };
    },
    methods:{
      fb_invite(){
        console.log('111111')
      },
      pageinit(FB){
        FB.getLoginStatus(function(response) {
            console.log(response);
        });
      }
    },
    components: {
    },
    mounted() {
        window.fbAsyncInit = () => {
          FB.init({
            appId      : '781965488850377',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.2'
          });
          FB.AppEvents.logPageView();
          this.pageinit(FB)
        };
      
    }
}
</script>
<style>
img {
  display: block;
  border: 0;
}
body {
  background-color: #fff;
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
body .head .btn a {
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
}
body .head .btn a:active,
body .head .btn a:hover {
  filter: brightness(0.8);
}

/*滚动条样式*/
::-webkit-scrollbar {
  border-radius: 8px;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #efefef 0%, #fff 78%, #efefef 100%);
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    0deg,
    rgb(227, 182, 143) 0%,
    rgb(255, 227, 166) 48%,
    rgb(227, 182, 143) 100%
  );
}

::-webkit-scrollbar-thumb:vertical {
  background: linear-gradient(
    90deg,
    rgb(227, 182, 143) 0%,
    rgb(255, 227, 166) 48%,
    rgb(227, 182, 143) 100%
  );
}
</style>
