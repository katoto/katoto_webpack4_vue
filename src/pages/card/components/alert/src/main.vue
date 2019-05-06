<template>
    <transition name="el-alert-fade">
        <div class="el-alert"
            :class="[typeClass, center ? 'is-center' : ''] "
            v-show="visible"
            role="alert"
        >
            <i class="el-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
            <div class="el-alert__content">
                <span class="el-alert__title" :class="[ isBoldTitle ]">
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="el-alert__description" v-if="$slots.default && !description"><slot></slot></p>
                <p class="el-alert__description" v-if="description && !$slots.default">{{ description }}</p>
                <!-- 有自定义关闭文案 -->
                <i class="el-alert__closebtn" v-show="closable" :class="{ 'is-customed' : closeText !== '', 'el-icon-close' : closeText === ''}"  @click="close()">{{ closeText }}</i>
            </div>
        </div>
    </transition>
</template>

<script type="text/babel">
import { setTimeout } from 'timers';

const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error'
}

export default {
    name: 'ElAlert',
    props:{
        title:{
            type: String,
            default: ''
        },
        type:{
            type: String,
            default: 'info'
        },
        closable:{
            // 是否可关闭该tips
            type: Boolean,
            default: true
        },
        closeText:{
            type: String,
            default: ''
        },
        description:{
            type: String,
            default: ''
        },
        center: Boolean,
        showIcon: Boolean
    },
    data(){
        return {
            visible: true
        }
    },
    computed:{
        typeClass(){
            return `el-alert--${this.type}`
        },
        iconClass(){
            return TYPE_CLASSES_MAP[this.type] || 'el-icon-info'
        },
        isBoldTitle(){
            return this.description || this.$slots.default ? 'is-bold' : ''
        },
        isBigIcon(){
            return this.description || this.$slots.default ? 'is-big' : ''
        }
    },
    methods:{
        close(){
            this.visible = false;
            this.$emit('close')
        }
    }
}
</script>
