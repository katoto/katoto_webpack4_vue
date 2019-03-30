import Vue from 'vue';
require('@/styles/index.scss');

new Vue({
    el: '#app',
    template: `
        <div>
            <h3 style="padding:10px">invite</h3><hr/>
            <iconfont-preview></iconfont-preview>
        </div>`,
    components: { iconfontPreview }
})
