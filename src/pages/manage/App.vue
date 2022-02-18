<script setup lang="ts">
import {
    NConfigProvider,
} from 'naive-ui'
import costore from '@costore/index'
import i18n from '@colocale/lang'

const store = costore()
</script>

<template>
    <n-config-provider :theme="store.globalTheme"
                       :theme-overrides="store.defaultTheme"
                       :locale="i18n.uiI18nMap[store.globalLocale].locale"
                       :date-locale="i18n.uiI18nMap[store.globalLocale].dateLocale">
        <router-view></router-view>
    </n-config-provider>
</template>

<style lang="scss">
@import "~@coscss/base";
@import "~@csscss/base";
</style>
