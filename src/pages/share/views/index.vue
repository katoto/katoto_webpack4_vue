<template>
  <div>
    <div class="head">
      <button @click="fb_invite">facebook 邀请 222222</button>
      <br>
      <br>
      <br>
      <button @click="fb_morePeop">facebook 邀请列表 </button>
      <br>
      <br>

      <button @click="fb_whatsapp">WhatsApp原生 </button>
        <br>
      <br>
      <button @click="fb_fackbook">Fackbook 原生</button>

    <button>
      <a href="whatsapp://send?text=HERE GOES THE URL ENCODED TEXT YOU WANT TO SHARE" target="_blank" data-action="share/whatsapp/share">Share via Whatsapp</a>
    </button>

      <div class="fb-share-button" data-href="https://www.katoto.cn/" data-layout="button" data-size="small">
        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.baidu.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a>
      </div>

    </div>
  </div>
</template>

<script>
import { isIOS, appID, cbetLocal } from '@common/util'
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            contentSrc: '',
            contHref: '//play.google.com/store/apps/details?id=com.crazy500.cbet',
            baseFB: null,
            accToken: null
        };
    },
    methods:{
        shareCopy(){
            cbetLocal({func:'copyToPasteboard', params:{
                content:"复制msg内容222  ",
            }})
            // cbetLocal({func:'jumpToLocal',  params:{ content:"jp://RaceDetailScene?matchId=1243563"}
            // })
        },
        fb_whatsapp(){
			// 内容
            cbetLocal({func: "share", params:{ content: "321312132", plat: 'whatsapp' } })
        },
        fb_fackbook(){
            console.log(121)
            cbetLocal({func: "share", params:{ content: "12312321", plat: 'facebook' } })
        },
        fb_morePeop(){
            window.FB.ui({
                appID,
                method: 'apprequests',
                message: '这是疯狂猜球应用测试',
                title: 'Invite friends to play'
            }, function(response){
                if(response && response.to.length>0){
                    console.log('Welcome!  Fetching your information....1111 ');
                }
                console.log(response);
            });
        },
        fb_invite(){
            console.log(this.baseFB)
            this.baseFB.getLoginStatus(function(response) {
                console.log(response)
                this.accToken = response.accessToken
                if(response && response.status === 'unknown'){
                    window.FB.login(function(response) {
                        if (response.authResponse) {
                            console.log('Welcome!  Fetching your information.... ');
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            });
        },
        pageinit(FB){
            FB.getLoginStatus(function(response) {
                if(response && response.status === 'unknown'){
                    FB.login(function(response) {
                        if (response.authResponse) {
                            console.log('Welcome!  Fetching your information.... ');
                            console.log(response)
                            console.log('111111111')
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    });
                }
                console.log(response);
                console.log('====')
            });

        }
    },
    components: {
    },
    async mounted() {
        // let bb = await this.$get('http://api.coinslot.com/home/info?platform=pc&src=pc&lotid=1&timezone=8&ck=')
        // console.log(bb + '2')
        // let cc = await this.$get('http://api.coinslot.com/home/info', {
        //     platform: '123'
        // })
        window.fbAsyncInit = () => {
            FB.init({
                appId      : appID,
                cookie     : true,
                xfbml      : true,
                version    : 'v3.2'
            });
            FB.AppEvents.logPageView();
            // this.pageinit(FB)
            this.baseFB = FB
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
