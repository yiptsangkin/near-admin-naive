<script lang="ts" setup>
import costore from '@/core/store'

const store = costore()
</script>

<template>
    <div :style="{
        backgroundColor: store.globalTheme === 'dark' ? 'rgb(24, 24, 28)' : 'rgb(255, 255, 255)'
    }">
        <slot name="content"></slot>
    </div>
</template>

<style lang="scss"></style>
