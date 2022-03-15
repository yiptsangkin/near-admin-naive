<script setup lang="ts">
import {
    NConfigProvider,
    NMessageProvider
} from 'naive-ui'
import { onMounted } from 'vue'
import costore from '@costore/index'
import csstore from '@csstore/index'
import i18n from '@colocale/lang'
import api from '@api/auth/apiMethod'
import CountryFlag from '@cots/countryflag'

const store = costore()
const cusStore = csstore()

const globalLangList = i18n.i18n.global.availableLocales.map((lang: string) => {
    // @ts-ignore
    const country = i18n.i18n.global.messages[lang]
    const langLabel: string = country.localeMap[lang]
    const flag = `${new CountryFlag().getFlagByChar(country.country)}`
    return {
        value: lang,
        key: lang,
        label: `${flag} ${langLabel}`
    }
})

store.setGlobalLangList(globalLangList)

const getUserMenu = async () => {
    await api.getUserMenu({
        data: {
        },
        success (res) {
            store.setMenuList(res)
        }
    })
}

const getUserInfo = async () => {
    await api.getUserInfo({
        data: {},
        success (res) {
            cusStore.setUserInfo(res)
        }
    })
}

onMounted(async () => {
    await getUserInfo()
    await getUserMenu()
})

</script>

<template>
    <n-config-provider :theme="store.globalThemeMap[store.globalTheme]"
                       :theme-overrides="store.defaultTheme"
                       :locale="i18n.uiI18nMap[store.globalLocale].locale"
                       :date-locale="i18n.uiI18nMap[store.globalLocale].dateLocale">
        <n-message-provider>
            <router-view></router-view>
        </n-message-provider>
    </n-config-provider>
</template>

<style lang="scss">
@import "~@coscss/base";
@import "~@csscss/base";
</style>
