<script lang="ts" setup>
import {
    NBreadcrumb,
    NBreadcrumbItem,
    NDropdown
} from 'naive-ui'
import { computed, h } from 'vue'

import costore from '@costore/index'

const store = costore()

const currentTab = computed(() => store.curTabList[store.curTabIdx])

const currentBreadList = computed(() => store.curTabList[store.curTabIdx].breadList || [])

const finalBreadOptions = computed(() => {
    const breadList = store.curTabList[store.curTabIdx].breadList || []
    if (breadList.length > 0) {
        return breadList[breadList.length - 1].children
    }
    return []
})

</script>

<template>
    <div class="n-breadcrumb-wrp">
        <n-breadcrumb>
            <n-breadcrumb-item v-for="(item, index) in currentBreadList" :key="index">
                {{ $t(item.label) }}
            </n-breadcrumb-item>
            <n-breadcrumb-item>
                <template v-if="finalBreadOptions.length">
                    <n-dropdown
                            :options="finalBreadOptions"
                            :render-label="(option) => h('span', {}, $t(option.label))"
                    >
                        {{ $t(currentTab.label) }}
                    </n-dropdown>
                </template>
                <template v-else>
                    {{ $t(currentTab.label) }}
                </template>
            </n-breadcrumb-item>
        </n-breadcrumb>
    </div>
</template>

<style lang="scss" scoped>
@import '~@coscss/nbreadcrumb';
</style>
