<template>
    <div>
        <h3>This is stage2 here</h3>
        <button @click="$router.back()">Back</button>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    props: {
    },
    data () {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
    }
}
</script>

<style scoped lang="scss">
    .cart {
        border: 1px solid red;
    }
    .cart-item {
        line-height: 30px;
    }
    .main-color {
        color: red;
    }
</style>
