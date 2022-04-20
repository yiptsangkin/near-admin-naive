<script lang="ts" setup>
import costore from '@costore/index'
import dict from '@cots/dict'
import {
    NCode,
    NScrollbar,
    NSpace,
    NGrid,
    NGi,
    NConfigProvider
} from 'naive-ui'
import highlight from 'highlight.js/lib/core'
import shell from 'highlight.js/lib/languages/shell'
import json from 'highlight.js/lib/languages/json'
import i18n from '@colocale/lang'
import NColorPanel from '@cocp/NColorPanel.vue'

highlight.registerLanguage('shell', shell)
highlight.registerLanguage('json', json)

const store = costore()
const currentCp = store.curTabList[store.curTabIdx]

const translateShell = `npm run translate

? Pick target language ›
◉   de_DE
◯   en_US
◯   id_ID
◯   it_IT
◯   ja_JP
◯   ru_RU
◯   uk_UA
◯   zh_CN
◯   zh_TW

✔ de_DE completed
✔ en_US completed
✔ id_ID completed
✔ it_IT completed
✔ ja_JP completed
✔ ru_RU completed
✔ uk_UA completed
✔ zh_CN completed
✔ zh_TW completed
✔ all completed
translate success
`

const formatLogData = (data) => JSON.stringify(data, null, 4)
</script>

<template>
    <div class="page-cp-info">
        <div class="page-cp-info-title">{{ $t(dict.guide.pageComponent.currentCp) }}：{{ currentCp.component }}</div>
    </div>
    <n-color-panel class="panel-pd">
        <template #content>
            <n-scrollbar style="max-height: 240px">
                <n-config-provider :hljs="highlight">
                    <n-code :code="translateShell" language="shell"></n-code>
                </n-config-provider>
            </n-scrollbar>
        </template>
    </n-color-panel>
    <div class="page-cp-info">
        <div class="page-cp-info-title">
            <n-space>
                <div>{{ $t(dict.guide.i18nInternational.supportLang.tip) }}</div>
            </n-space>
        </div>
    </div>
    <n-grid
            :cols="4"
            :collapsed="false"
            size="small"
    >
        <n-gi v-for="(item, index) in store.langList" :key="index">
            <template v-if="index % 2 === 0">
                <div class="panel-pd-c">{{ item.label }}</div>
                <n-color-panel class="panel-pd">
                    <template #content>
                        <n-scrollbar style="max-height: 240px">
                            <n-config-provider :hljs="highlight">
                                <n-code :code="formatLogData(i18n.i18n.global.messages[item.key])" language="json"></n-code>
                            </n-config-provider>
                        </n-scrollbar>
                    </template>
                </n-color-panel>
            </template>
            <template v-else>
                <n-color-panel class="panel-pd-c">
                    <template #content>
                        {{ item.label }}
                    </template>
                </n-color-panel>
                <div class="panel-pd">
                    <n-scrollbar style="max-height: 240px">
                        <n-config-provider :hljs="highlight">
                            <n-code :code="formatLogData(i18n.i18n.global.messages[item.key])" language="json"></n-code>
                        </n-config-provider>
                    </n-scrollbar>
                </div>
            </template>
        </n-gi>
    </n-grid>
</template>

<style lang="scss" scoped>
@import '~@coscss/guide/main.scss';
</style>
