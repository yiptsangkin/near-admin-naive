<script lang="ts" setup>
import {
    NSelect
} from 'naive-ui'
import { h } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        default: () => [],
    }
})

const renderMultiOptions = ({ option }) => {
    return h('span')
}

</script>

<template>
    <n-select :options="options" :render-option="renderMultiOptions"></n-select>
</template>

<style lang="scss" scoped></style>
