<script lang="ts" setup>
import {
    NLayout,
    NLayoutContent,
    useMessage
} from 'naive-ui'
import { defineAsyncComponent, ref, watch } from 'vue'
import costore from '@costore/index'
import config from '@csts/config'
import utils from '@cots/utils'
import dict from '@cots/dict'
import i18n from '@colocale/lang'
import { CpInfo } from '@cots/type'
import NAside from './NAside.vue'
import NTab from './NTab.vue'
import NBreadcrumb from './NBreadcrumb.vue'
import NHeader from './NHeader.vue'
import NLoading from './NLoading.vue'
import NNotFound from './NNotFound.vue'
import NNoRight from './NNoRight.vue'

const store = costore()
const currentCp = ref(store.curTabList[store.curTabIdx])

const message = useMessage()

const getPageCp = (customCp?: CpInfo) => {
    const basePath = utils.getBasePath(false)
    if (!customCp) {
        customCp = currentCp.value
    }

    let activeComp: any
    const hasRight = utils.getIfExistMenu(customCp.key, store.asideMenuList)
    if (customCp.component && hasRight === -1 && !customCp.params.apiNew && config.sysInfo.noNeedCheckRightPath.indexOf(customCp.component) === -1) {
        return NNoRight
    }
    if (utils.checkIfUrl(customCp.component)) {
        activeComp = defineAsyncComponent({
            loader: () => import('@/core/component/NWebView.vue'),
            delay: 200,
            timeout: 3000,
            loadingComponent: NLoading,
            errorComponent: NNotFound,
            onError (error, retry, fail, attempts) {
                if (error.message.match(/fetch/) && attempts <= 3) {
                    retry()
                } else if (error.message.match(/Cannot find module/)) {
                    message.error(`${i18n.t(dict.comTip.notFoundModule)}${customCp.component}`)
                    fail()
                } else {
                    fail()
                }
            }
        })
    } else {
        activeComp = defineAsyncComponent({
            loader: () => import(`@/pages/${basePath}/view/${customCp.component}`),
            delay: 200,
            timeout: 3000,
            loadingComponent: NLoading,
            errorComponent: NNotFound,
            onError (error, retry, fail, attempts) {
                if (error.message.match(/fetch/) && attempts <= 3) {
                    retry()
                } else if (error.message.match(/Cannot find module/)) {
                    message.error(`${i18n.t(dict.comTip.notFoundModule)}${customCp.component}`)
                    fail()
                } else {
                    fail()
                }
            }
        })
    }
    if (customCp.component) {
        const activeCompName = customCp.component.split('/').slice(-1)[0]
        activeComp.name = `${activeCompName}@${activeComp.key || utils.randomCharacter(32)}`
        return activeComp
    }
    return NNotFound
}

const initWebViewUrl = (customCp?: CpInfo) => {
    if (!customCp) {
        customCp = currentCp.value
    }
    if (utils.checkIfUrl(customCp.component)) {
        currentCp.value.params.pageUrl = customCp.component
    }
}

const init = () => {
    if (!currentCp.value.asyncComponent) {
        currentCp.value.asyncComponent = getPageCp()
        initWebViewUrl()
    }
}

const updateCpRight = () => {
    store.curTabList.forEach((cp: CpInfo) => {
        if (cp.asyncComponent) {
            currentCp.value.asyncComponent = getPageCp()
            initWebViewUrl(cp)
        }
    })
}

watch(() => store.curTabIdx, () => {
    currentCp.value = store.curTabList[store.curTabIdx]
    init()
})

watch(() => store.asideMenuList, (nv) => {
    if (nv && nv.length > 0) {
        updateCpRight()
    }
})

init()
</script>

<template>
    <n-layout class="n-manage" has-sider>
        <n-aside></n-aside>
        <n-layout>
            <n-header></n-header>
            <n-layout-content :class="[
                'n-common-content',
                store.globalTheme === 'dark' ? '' : 'n-common-content-default'
            ]">
                <n-tab></n-tab>
                <n-breadcrumb></n-breadcrumb>
                <div class="n-component-page">
                    <keep-alive>
                        <component :is="currentCp.asyncComponent"></component>
                    </keep-alive>
                </div>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<style lang="scss" scoped>
@import '~@coscss/nmanage';
</style>
