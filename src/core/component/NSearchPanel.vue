<script lang="ts" setup>
import {
    NSpace,
    NButton,
    NLayoutHeader,
} from 'naive-ui'
import { ref } from 'vue'
import dict from '@cots/dict'

const isCollapse = ref(true)
const emit = defineEmits(['search', 'reset'])

defineProps({
    expandText: {
        default: dict.searchPanel.expandText,
        type: String
    },
    collapseText: {
        default: dict.searchPanel.collapseText,
        type: String
    },
    resetText: {
        default: dict.searchPanel.resetText,
        type: String
    },
    searchText: {
        default: dict.searchPanel.searchText,
        type: String
    }
})

const changeCollapse = () => {
    isCollapse.value = !isCollapse.value
}

const comSearch = () => {
    emit('search')
}
const comReset = () => {
    emit('reset')
}

</script>

<template>
    <n-layout-header class="n-common-search-panel">
        <n-space>
            <n-button size="small" @click="changeCollapse">{{ $t(isCollapse ? expandText : collapseText) }}</n-button>
            <n-button size="small" @click="comReset">{{ $t(resetText) }}</n-button>
            <slot name="n-custom-search-btn" :collapse="isCollapse">
            </slot>
            <n-button type="primary" size="small" @click="comSearch">{{ $t(searchText) }}</n-button>
        </n-space>
        <div class="n-custom-search-ctx">
            <slot name="n-custom-search-ctx" :collapse="isCollapse"></slot>
        </div>
    </n-layout-header>
</template>

<style lang="scss" scoped>
@import '~@coscss/nsearchpanel.scss';
</style>
