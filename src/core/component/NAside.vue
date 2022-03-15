<script lang="ts" setup>
import {
    NSpace,
    NLayoutSider,
    NMenu
} from 'naive-ui'
import { ref, h, onMounted } from 'vue'
import costore from '@costore/index'
import csstore from '@csstore/index'
import utils from '@csts/utils'
import csDict from '@csts/dict'

const coStore = costore()
const csStore = csstore()

const isCollapsed = ref(true)

const changeCollapsed = (collapsed: boolean) => {
    isCollapsed.value = !collapsed
    utils.setCacheLocalStorage('nearCacheAsideCollapsed', isCollapsed.value)
}

const updateCurrentMenu = (key: string, menu: any) => {
    utils.setCacheLocalStorage('nearCacheCurrentMenu', key)
    const currentMenuIdx = utils.getCurTabIdx(coStore.curTabList, key)
    if (currentMenuIdx === -1) {
        // new page
        coStore.addCurTab(menu)
        coStore.setCurTabIdx(coStore.curTabList.length - 1)
    } else {
        // old page
        coStore.setCurTabIdx(currentMenuIdx)
    }
}

const checkIfCollapsed = () => {
    const collapsed = utils.getCacheLocalStorage('nearCacheAsideCollapsed')
    if (collapsed) {
        isCollapsed.value = collapsed === 'true'
    } else {
        if (window.innerWidth < csDict.collapsedConfig.collapsedThresholdValue) {
            changeCollapsed(true)
        } else {
            changeCollapsed(false)
        }
    }
}

onMounted(() => {
    checkIfCollapsed()
    window.onresize = () => {
        if (window.innerWidth < csDict.collapsedConfig.collapsedThresholdValue) {
            changeCollapsed(true)
        } else {
            changeCollapsed(false)
        }
    }
})

</script>

<template>
    <n-layout-sider
            class="n-common-layout"
            :width="200"
            :collapsed="!isCollapsed"
            collapse-mode="width"
            show-trigger
            bordered
            @update:collapsed="changeCollapsed"
    >
        <n-space class="n-aside-logo-wrp" align="center" justify="center">
            <div class="n-aside-logo">
                <img :src="csStore.sysInfo.logo" alt="">
            </div>
            <div class="n-aside-title" v-if="isCollapsed">{{ csStore.sysInfo.name }}</div>
        </n-space>
        <n-menu
                v-model:value="coStore.currentMenu"
                @update:value="updateCurrentMenu"
                :render-label="(option) => h('span', {}, $t(option.label))"
                :options="coStore.asideMenuList"
        />
    </n-layout-sider>
</template>

<style lang="scss" scoped>
@import '~@coscss/naside.scss';
</style>
