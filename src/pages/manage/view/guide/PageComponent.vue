<script lang="ts" setup>
import costore from '@costore/index'
import dict from '@cots/dict'
import {
    NDataTable,
    NModal,
    NConfigProvider,
    NCode,
    NScrollbar,
    NH6,
} from 'naive-ui'
import NCommonTable from '@cocp/NCommonTable.vue'
import { ref, onMounted, reactive } from 'vue'
import { ComTable } from '@cots/type'
import highlight from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

highlight.registerLanguage('javascript', javascript)

const store = costore()

const currentCp = store.curTabList[store.curTabIdx]

const comModal = reactive({
    props: {
        visible: false,
        title: dict.guide.pageComponent.example,
        width: '800px'
    },
    model: {
        code: undefined,
    }
})

const showExample = (row) => {
    comModal.props.visible = true
    comModal.model.code = row.code
}

const comTableObj = ref({
    title: dict.guide.pageComponent.tableTitle,
    columns: () => dict.tableColumns(comTableObj).pageComponentTable,
    pagingInfo: false,
    data: []
} as ComTable)

const apiTableObj = ref({
    title: dict.guide.pageComponent.tableTitle,
    columns: () => dict.tableColumns(comTableObj, { showExample }).pageComponentApiTable,
    pagingInfo: false,
    data: dict.staticList.pageComponentExampleList
} as ComTable)

const initParamsData = () => {
    comTableObj.value.data = Object.keys(currentCp.params).map((key) => {
        return {
            key,
            value: currentCp.params[key]
        }
    })
}

onMounted(() => {
    initParamsData()
})

</script>

<template>
    <div class="page-cp-info">
        <div class="page-cp-info-title">{{ $t(dict.guide.pageComponent.currentCp) }}：{{ currentCp.component }}</div>
    </div>
    <n-common-table :table-obj="comTableObj" auto-height>
        <template #data-table="{ selectColumns }">
            <n-data-table
                    scroll-x
                    striped
                    :single-line="false"
                    ref="n-common-table"
                    :columns="selectColumns"
                    :data="comTableObj.data"
                    :pagination="comTableObj.pagingInfo"
            ></n-data-table>
        </template>
    </n-common-table>
    <div class="page-cp-info">
        <div class="page-cp-info-title">{{ $t(dict.guide.pageComponent.pageApi) }}</div>
    </div>
    <n-common-table :table-obj="apiTableObj" auto-height>
        <template #data-table="{ selectColumns }">
            <n-data-table
                    scroll-x
                    striped
                    :single-line="false"
                    ref="n-common-table"
                    :columns="selectColumns"
                    :data="apiTableObj.data"
                    :pagination="apiTableObj.pagingInfo"
            ></n-data-table>
        </template>
    </n-common-table>
    <n-modal
            v-model:show="comModal.props.visible"
            preset="dialog"
            :show-icon="false"
            :title="$t(comModal.props.title)"
            :style="{
                width: comModal.props.width,
            }"
    >
        <n-h6 prefix="bar" align-text>
            {{ $t(dict.guide.pageComponent.exampleCode) }}
        </n-h6>
        <n-scrollbar style="max-height: 480px">
            <n-config-provider :hljs="highlight">
                <n-code :code="comModal.model.code" language="javascript"></n-code>
            </n-config-provider>
        </n-scrollbar>
    </n-modal>
</template>

<style lang="scss" scoped>
@import '~@coscss/guide/main.scss';
</style>
