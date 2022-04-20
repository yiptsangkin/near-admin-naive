<script lang="ts" setup>
import {
    NBreadcrumb,
    NBreadcrumbItem,
    NDropdown
} from 'naive-ui'
import { computed, h } from 'vue'

import costore from '@costore/index'
import utils from '@csts/utils'

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

const toPage = (key, menu) => {
    const currentMenuIdx = utils.getCurTabIdx(store.curTabList, key)
    if (currentMenuIdx === -1) {
        // new page
        store.addCurTab(menu)
        store.setCurTabIdx(store.curTabList.length - 1)
    } else {
        // old page
        store.setCurTabIdx(currentMenuIdx)
    }
}

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
                            @select="toPage"
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
