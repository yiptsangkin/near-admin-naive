<script lang="ts" setup>
import costore from '@costore/index'
import dict from '@cots/dict'
import {
    NCode,
    NConfigProvider,
    NScrollbar,
    NGrid,
    NGi,
} from 'naive-ui'
import NColorPanel from '@cocp/NColorPanel.vue'
import highlight from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import pageJson from '../../page.config.json'

highlight.registerLanguage('json', json)
const store = costore()
const currentCp = store.curTabList[store.curTabIdx]
const formatLogData = (data) => JSON.stringify(data, null, 4)
</script>

<template>
    <div class="page-cp-info">
        <div class="page-cp-info-title">{{ $t(dict.guide.pageComponent.currentCp) }}：{{ currentCp.component }}</div>
    </div>
    <n-color-panel class="panel-pd">
        <template #content>
            <div>{{ $t(dict.guide.applicationConfig.contextDir)}}</div>
        </template>
    </n-color-panel>
    <div class="page-cp-info">
        <div class="page-cp-info-title">{{ $t(dict.guide.applicationConfig.pageConfig) }}</div>
    </div>
    <n-color-panel class="panel-pd">
        <template #content>
            <n-grid
                    :cols="2"
                    :collapsed="false"
                    size="small"
            >
                <n-gi>
                    <div>page.config.json</div>
                    <n-scrollbar>
                        <n-config-provider :hljs="highlight">
                            <n-code :code="formatLogData(pageJson)" language="json"></n-code>
                        </n-config-provider>
                    </n-scrollbar>
                </n-gi>
                <n-gi>
                    <n-scrollbar>
                        {{ $t(dict.guide.applicationConfig.pageConfigDesc) }}
                    </n-scrollbar>
                </n-gi>
            </n-grid>
        </template>
    </n-color-panel>
</template>

<style lang="scss" scoped>
@import '~@coscss/guide/main.scss';
</style>
