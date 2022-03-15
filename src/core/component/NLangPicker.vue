<script lang="ts" setup>
import {
    NDropdown,
    NIcon,
} from 'naive-ui'
import { EarthOutline } from '@vicons/ionicons5'
import costore from '@costore/index'
import i18n from '@colocale/lang'

const store = costore()

defineProps({
    size: {
        type: String || Number,
        default: 32,
    },
    showLocaleText: {
        type: Boolean,
        default: true,
    }
})

const selectLang = (lang: string) => {
    store.setGlobalLang(lang)
    i18n.i18n.global.locale = lang
    window.localStorage.setItem('nearCacheLang', lang)
}

</script>

<template>
    <div class="n-flex">
        <div class="n-flex-left"></div>
        <div class="n-flex-right">
            <n-dropdown :options="store.langList" @select="selectLang">
                <n-icon class="n-lang-picker n-com-header-icon" :size="size">
                    <div v-if="showLocaleText" class="n-store-tip" :style="{
                        transform: `translateX(${(32 - size)/2}px)`
                    }">{{ store.globalLocale }}</div>
                    <earth-outline/>
                </n-icon>
            </n-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~@coscss/nlangpicker";
</style>
