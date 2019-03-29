<script>
    import footCode from '../../components/footCode'
    export default {
        data() {
            return {
                name: 'dude',
            };
        },
        render(h) {
            // jsx sample
            return (
                <div class="pd-10 bg">
                    <h3><i className="my-icon-warning"></i>
                        Hi {this.name}, Login goes here
                    </h3>
                    <div><a href="main.html">main</a></div>
                    <div><a href="pageB.html">pageB</a></div>
                    <div><a href="iconfontPreview.html">iconfont</a></div>
                    <foot-code></foot-code>
                </div>
            )
        },
        components: { footCode }
    }
</script>
<style scoped lang="scss">

    .bg {
        // background: $--color-primary-light-6;
        h3{
            font-size: 20px
        }
    }
</style>