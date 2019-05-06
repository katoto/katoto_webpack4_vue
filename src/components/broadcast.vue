<template>
    <div class="broadcast">
        <div class="broadcast-box" v-if="list.length > 0" :style="{animationDuration: `${time}s`}">
            <p class="broadcast-item" v-for="(item, index) in list" :key="index">{{item}}</p>
        </div>
        <div class="broadcast-box" :style="{animationDuration: `${time}s`}" v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        time: {
            type: Number,
            default: () => {
                return 10
            }
        }
    }
}
</script>

<style lang="less" scoped>
.broadcast {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  .broadcast-box /deep/ {
    display: inline-block;
    animation: go 10s linear infinite;
    min-width: 100%;
    .broadcast-item, p {
      white-space: nowrap;
      display: inline;
    }
  }
}

@keyframes go {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>

