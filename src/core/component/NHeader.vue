<script lang="ts" setup>
import {
    NLayoutHeader,
    NMenu,
    NSpace,
    NIcon,
    NPopselect
} from 'naive-ui'
import { h, onMounted } from 'vue'
import costore from '@costore/index'
import csstore from '@csstore/index'
import utils from '@cots/utils'
import dict from '@cots/dict'
import i18n from '@colocale/lang'
import { ExpandOutline, SearchOutline, SunnyOutline, MoonOutline, ContractOutline } from '@vicons/ionicons5'
import NUserAvatar from './NUserAvatar.vue'
import NLangPicker from './NLangPicker.vue'

const coStore = costore()
const csStore = csstore()

const personalOptions = [
    {
        key: 'user_info',
        label: '用户信息',
        value: 'user_info',
        disabled: true,
    },
    {
        label: dict.userPanel.frontendLog,
        key: 'frontend_log',
        value: 'frontend_log'
    },
    {
        label: dict.userPanel.customSetting,
        key: 'personal_setting',
        value: 'personal_setting'
    },
    {
        label: dict.userPanel.cleanConfig,
        key: 'clean_config',
        value: 'clean_config'
    },
    {
        label: dict.userPanel.cleanCache,
        key: 'clean_cache',
        value: 'clean_cache'
    },
    {
        label: '退出登录',
        key: 'to_logout',
        value: 'to_logout'
    }
]

const changeHeaderMenu = (key, menu) => {
    coStore.setAsideMenuList(menu.idx)
}

const setThemeType = (theme: string) => {
    coStore.setGlobalTheme(theme)
}

const toFullScreen = () => {
    coStore.setFullScreen(!coStore.fullScreen)
    utils.fullScreenCtl(coStore.fullScreen)
}

const setFullScreen = (fullScreen: boolean) => {
    utils.fullScreenCtl(fullScreen)
    coStore.setFullScreen(fullScreen)
}

const renderUserOptions = (option) => {
    if (option.key === 'user_info') {
        return h('div', {
            style: {
                width: '260px',
                lineHeight: 1.4,
                padding: '4px 12px'
            }
        }, h(NSpace, {
            align: 'center'
        }, [
            h('div', {}, [
                h(NUserAvatar, {
                    size: 24
                })
            ]),
            h('div', {
                style: {
                    padding: '2px 0 6px 0',
                    fontSize: '12px'
                }
            }, [
                h('div', {
                    class: 'n-user-username'
                }, csStore.userInfo.userName),
                h('div', {
                    class: 'n-user-attach'
                }, csStore.userInfo.userEmail),
            ]),
        ]))
    }
    if (option.key === 'to_logout') {
        return h('div', {
            style: {
                fontSize: '12px',
                padding: '0 12px',
                textAlign: 'center',
                lineHeight: '30px'
            },
            class: 'n-user-op-option'
        }, i18n.t(option.label))
    }
    return h('div', {
        style: {
            fontSize: '12px',
            padding: '0 12px',
            lineHeight: '30px'
        },
        class: 'n-user-op-option'
    }, i18n.t(option.label))
}

const getOptionsEvent = (key, option) => {
    if (key === 'frontend_log') {
        coStore.addCurTab({
            component: 'logline/LogLine',
            label: option.label,
            key: utils.randomCharacter(32),
            params: {
                apiNew: true
            }
        })
        coStore.setCurTabIdx(coStore.curTabList.length - 1)
    }
}

onMounted(() => {
    window.document.onfullscreenchange = () => {
        if (!document.fullscreenElement) {
            setFullScreen(false)
        }
    }
})

</script>

<template>
    <n-layout-header bordered class="n-manage-header">
        <n-space align="center" justify="space-between">
            <n-menu
                    v-model:value="coStore.currentHeaderMenuKey"
                    :render-label="(option) => h('span', {}, $t(option.label))"
                    class="n-header-menu" mode="horizontal"
                    @update:value="changeHeaderMenu"
                    :options="coStore.headerMenuList"
            ></n-menu>
            <div class="n-header-right">
                <n-space align="center" justify="end" :size="2">
                    <div class="com-header-item">
                        <n-icon class="n-com-header-icon" :component="SearchOutline"/>
                    </div>
                    <div class="com-header-item">
                        <n-icon class="n-com-header-icon" @click="setThemeType('normal')" v-if="coStore.globalTheme === 'dark'" :component="SunnyOutline"/>
                        <n-icon class="n-com-header-icon" @click="setThemeType('dark')" v-else :component="MoonOutline"/>
                    </div>
                    <div class="com-header-item" @click="toFullScreen">
                        <n-icon class="n-com-header-icon" v-if="!coStore.fullScreen" :component="ExpandOutline"/>
                        <n-icon class="n-com-header-icon" v-else :component="ContractOutline"/>
                    </div>
                    <div class="com-header-item">
                        <n-lang-picker :size="18" :show-locale-text="false"></n-lang-picker>
                    </div>
                    <div class="com-header-item">
                        <n-popselect @update:value="getOptionsEvent" class="n-user-popover" display-directive="show" :options="personalOptions" :render-label="renderUserOptions">
                            <n-user-avatar :size="24"></n-user-avatar>
                        </n-popselect>
                    </div>
                </n-space>
            </div>
        </n-space>
    </n-layout-header>
</template>

<style lang="scss" scoped>
@import '~@coscss/nheader.scss';
</style>

<style lang="scss">
@import '~@coscss/nuseroption.scss';
</style>
