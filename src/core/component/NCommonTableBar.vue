<script lang="ts" setup>
import {
    NLayoutHeader,
    NSpace
} from 'naive-ui'
</script>

<template>
    <n-layout-header class="n-common-table-bar">
        <n-space align="center" justify="space-between">
            <slot name="table-title"></slot>
            <div class="right-part">
                <slot name="table-btn"></slot>
            </div>
        </n-space>
    </n-layout-header>
</template>

<style lang="scss" scoped>
@import '~@coscss/ncommontablebar.scss';
</style>
