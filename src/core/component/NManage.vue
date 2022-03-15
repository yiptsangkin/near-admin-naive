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
import NAside from './NAside.vue'
import NTab from './NTab.vue'
import NBreadcrumb from './NBreadcrumb.vue'
import NHeader from './NHeader.vue'
import NLoading from './NLoading.vue'
import NNotFound from './NNotFound.vue'

const store = costore()
const currentCp = ref(store.curTabList[store.curTabIdx])

const message = useMessage()

const getPageCp = () => {
    let basePath: string
    if (config.publicPath) {
        basePath = window.location.pathname.split('/').slice(2, 3).join('/')
    } else {
        basePath = window.location.pathname.split('/').slice(1, 2).join('/')
    }
    let activeComp: any
    if (utils.checkIfUrl(currentCp.value.component)) {
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
                    message.error(`${i18n.t(dict.comTip.notFoundModule)}${currentCp.value.component}`)
                    fail()
                } else {
                    fail()
                }
            }
        })
    } else {
        activeComp = defineAsyncComponent({
            loader: () => import(`@/pages/${basePath}/view/${currentCp.value.component}`),
            delay: 200,
            timeout: 3000,
            loadingComponent: NLoading,
            errorComponent: NNotFound,
            onError (error, retry, fail, attempts) {
                if (error.message.match(/fetch/) && attempts <= 3) {
                    retry()
                } else if (error.message.match(/Cannot find module/)) {
                    message.error(`${i18n.t(dict.comTip.notFoundModule)}${currentCp.value.component}`)
                    fail()
                } else {
                    fail()
                }
            }
        })
    }
    const activeCompName = currentCp.value.component.split('/').slice(-1)[0]
    activeComp.name = `${activeCompName}@${activeComp.key || utils.randomCharacter(32)}`
    return activeComp
}

const initWebViewUrl = () => {
    if (utils.checkIfUrl(currentCp.value.component)) {
        currentCp.value.params.pageUrl = currentCp.value.component
    }
}

const init = () => {
    if (!currentCp.value.asyncComponent) {
        currentCp.value.asyncComponent = getPageCp()
        initWebViewUrl()
    }
}

watch(() => store.curTabIdx, () => {
    currentCp.value = store.curTabList[store.curTabIdx]
    init()
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
