<script lang="ts" setup>
import {
    NForm,
    NFormItem,
    NGrid,
    NGi,
    NSelect,
    NDataTable,
    NModal,
    NH6,
    NInput,
    NConfigProvider,
    NCode,
    NScrollbar,
    NButton,
    useMessage
} from 'naive-ui'
import NSearchPanel from '@cocp/NSearchPanel.vue'
import NCommonTable from '@cocp/NCommonTable.vue'
import highlight from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import { ref, h, reactive, onMounted } from 'vue'
import dict from '@cots/dict'
import utils from '@csts/utils'
import { ComTable } from '@cots/type'
import i18n from '@colocale/lang'

highlight.registerLanguage('json', json)
const message = useMessage()

const initSearchForm = {
    model: {
        dateArea: '1d'
    },
    rules: {
        dateArea: {
            required: true,
            trigger: 'blur',
        },
    }
}

const searchForm = ref(utils.deepClone(initSearchForm))

const comModal = reactive({
    props: {
        visible: false,
        title: dict.logLine.extra.logDetail,
        width: '800px'
    },
    model: {
        level: undefined,
        descriptor: undefined,
        namespace: undefined,
    }
})

const paginationReactive = reactive({
    ...dict.defaultPagination,
    onChange: (page) => {
        paginationReactive.page = page
    },
    onUpdatePageSize: (pageSize) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
    }
})

const showDetail = (row) => {
    comModal.props.visible = true
    comModal.model = row
}

const comTableObj = ref({
    title: dict.logLine.tableTitle,
    columns: () => dict.tableColumns(comTableObj, { showDetail }).logLineTable,
    pagingInfo: paginationReactive,
    data: []
} as ComTable)

const commonQuery = () => {
    utils.logLineObj.getLog({
        start: searchForm.value.model.dateArea,
        callback: (data: any) => {
            comTableObj.value.data = data
        }
    })
}

const clearLog = () => {
    utils.logLineObj.cleanLog()
    message.success(i18n.t(dict.logLine.extra.clearLogSuccess))
}

const commonReset = () => {
    searchForm.value = utils.deepClone(initSearchForm)
}
const formatLogData = (data) => JSON.stringify(data, null, 4)
onMounted(() => {
    commonQuery()
})
</script>

<template>
    <n-search-panel @search="commonQuery" @reset="commonReset">
        <template #n-custom-search-btn>
            <!-- here to slot custom button -->
        </template>
        <template #n-custom-search-ctx="{ collapse }">
            <div class="com-search-ctx">
                <n-form
                    :model="searchForm.model"
                    :rules="searchForm.rules"
                    label-placement="left"
                    :show-feedback="false"
                >
                    <n-grid
                            :cols="4"
                            x-gap="16"
                            y-gap="4"
                            :collapsed="false"
                            size="small"
                    >
                        <n-gi>
                            <n-form-item :label="$t(dict.logLine.timeArea)" path="dateArea">
                                <n-select
                                        size="small"
                                        :render-label="(option) => h('span', {}, $t(option.label))"
                                        v-model:value="searchForm.model.dateArea" :options="dict.staticList.logTimeList" />
                            </n-form-item>
                        </n-gi>
                        <template v-if="!collapse">
                            <!-- here to slot some form item you want to collapse -->
                        </template>
                    </n-grid>
                </n-form>
            </div>
        </template>
    </n-search-panel>
    <n-common-table :table-obj="comTableObj">
        <template #table-btn>
            <n-button
                    type="primary"
                    size="small"
                    @click="clearLog"
            >
                {{ $t(dict.logLine.extra.clearLog) }}
            </n-button>
        </template>
        <template #data-table="{ selectColumns, innerHeight }">
            <n-data-table
                scroll-x
                striped
                :single-line="false"
                :max-height="innerHeight"
                :min-height="innerHeight"
                ref="n-common-table"
                :columns="selectColumns"
                :data="comTableObj.data"
                :pagination="comTableObj.pagingInfo"
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
            {{ $t(dict.logLine.extra.logDetail) }}
        </n-h6>
        <n-form
                class="n-view-disabled"
                :model="comModal.model"
                :rules="comModal.rules"
                label-placement="left"
                :show-feedback="false"
        >
            <n-grid
                    :cols="2"
                    x-gap="16"
                    y-gap="4"
                    :collapsed="false"
                    size="small"
            >
                <n-gi>
                    <n-form-item :label="$t(dict.logLine.extra.logLevel)" path="level">
                        <n-input size="small" disabled v-model:value="comModal.model.level"></n-input>
                    </n-form-item>
                </n-gi>
                <n-gi>
                    <n-form-item :label="$t(dict.logLine.extra.logType)" path="descriptor">
                        <n-input size="small" disabled v-model:value="comModal.model.descriptor"></n-input>
                    </n-form-item>
                </n-gi>
                <n-gi :span="2">
                    <n-form-item :label="$t(dict.logLine.extra.logDesc)" path="namespace">
                        <n-input size="small" type="textarea"
                                 :autosize="{
                                    minRows: 3,
                                    maxRows: 5
                                  }"
                                 disabled v-model:value="comModal.model.namespace"></n-input>
                    </n-form-item>
                </n-gi>
            </n-grid>
        </n-form>
        <n-h6 prefix="bar" align-text>
            {{ $t(dict.logLine.extra.requestDetail) }}
        </n-h6>
        <n-scrollbar style="max-height: 480px">
            <n-config-provider :hljs="highlight">
                <n-code :code="formatLogData(comModal.model.data)" language="json"></n-code>
            </n-config-provider>
        </n-scrollbar>
    </n-modal>
</template>

<style lang="scss" scoped>
@import "~@csscss/logline.scss";
</style>
