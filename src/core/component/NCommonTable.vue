<script lang="ts" setup>
import { PropType, onMounted, ref, h, computed, watch } from 'vue'
import md5 from 'js-md5'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import VueDraggableResizable from 'vue3-draggable-resizable'
import { ComTable } from '@cots/type'
import utils from '@cots/utils'
import NCommonTableBar from './NCommonTableBar.vue'

const props = defineProps({
    tableObj: {
        type: Object as PropType<ComTable>,
    },
    autoHeight: {
        type: Boolean,
        default: false,
    }
})

const tbId = utils.randomCharacter(32)
const thId = utils.randomCharacter(32)
const innerHeight = ref(null)
const selectedColumns = ref([])
const curTableColumns = props.tableObj.columns()
const cacheColumns = JSON.stringify(curTableColumns)
const cacheId = `near_table_cache_${md5(cacheColumns)}`
const fullTable = ref(false)

const initTableInnerHeight = () => {
    const curTable = document.getElementById(tbId)
    if (curTable) {
        let offsetHeight = 0
        for (const ele of curTable.parentElement.children) {
            const eleId = ele.getAttribute('id')
            if (eleId !== tbId) {
                offsetHeight += ele.clientHeight
            }
        }
        innerHeight.value = `calc(${curTable.clientHeight}px - ${offsetHeight + 82}px)`
    }
}

const initSelectColumns = () => {
    const localCacheColumns = utils.getCacheLocalStorage(cacheId)
    let localCacheColumnsObj: any[] = []
    const localCacheColumnsKeyMap = {}
    const curTableColumnsKeyMap = {}
    const newList: any[] = []
    if (localCacheColumns) {
        localCacheColumnsObj = JSON.parse(localCacheColumns)
        localCacheColumnsObj.forEach((item) => {
            localCacheColumnsKeyMap[item.key] = item
        })
    } else {
        localCacheColumnsObj = curTableColumns
    }
    curTableColumns.forEach((item) => {
        curTableColumnsKeyMap[item.key] = item
    })
    localCacheColumnsObj.forEach((item) => {
        const newColumnItem = curTableColumnsKeyMap[item.key]
        newColumnItem.width = item.width
        newColumnItem.fixed = item.fixed
        newColumnItem.isPicked = item.isPicked !== false
        newList.push(newColumnItem)
    })
    selectedColumns.value = newList.map((item) => {
        if (item.resizable && item.width) {
            return {
                ...item,
                title (notResize) {
                    if (!notResize) {
                        return [
                            h('span', {
                                class: 'n-common-table-resizable-title'
                            }, item.title())
                        ]
                    }
                    return [
                        h('span', {
                            class: 'n-common-table-resizable-title'
                        }, item.title()),
                        h(VueDraggableResizable, {
                            class: 'n-common-table-resizable-column',
                            x: item.width - 1,
                            draggable: true,
                            resizable: false,
                            onDragging ({ x }) {
                                const curColumn = selectedColumns.value.filter((citem) => citem.key === item.key)[0]
                                if (curColumn) {
                                    curColumn.width = x + 1
                                }
                            }
                        })
                    ]
                }
            }
        }
        return item
    })
}

const cacheTableColumns = () => {
    utils.setCacheLocalStorage(cacheId, JSON.stringify(selectedColumns.value))
}

const fullScreen = () => {
    fullTable.value = !fullTable.value
}

const showColumns = computed(() => selectedColumns.value.filter((item) => item.isPicked))

watch(() => selectedColumns.value, () => {
    cacheTableColumns()
}, { deep: true })

const getResortColumn = (columns) => {
    selectedColumns.value = columns
}

const cleanTableCache = () => {
    utils.removeCacheLocalStorage(cacheId)
    window.location.reload()
}

const downloadTable = () => {
    const columnList = showColumns.value.map((item: any) => {
        const title = item.title()
        if (title instanceof Array) {
            return title[0].children
        }
        return title
    })
    const data: any[] = []
    props.tableObj.data.forEach((item: any, index: any) => {
        const temObj: any = {}
        showColumns.value.forEach((citem: any, cindex: any) => {
            if (citem.key === 'index') {
                temObj[columnList[cindex]] = index + 1
            } else {
                let labelInValue: any
                if (citem.render) {
                    labelInValue = citem.render(item[citem.key], item) || ''
                } else {
                    labelInValue = item[citem.key] || ''
                }
                if (typeof labelInValue !== 'object') {
                    temObj[columnList[cindex]] = labelInValue
                } else if (labelInValue.label || labelInValue.children) {
                    temObj[columnList[cindex]] = labelInValue.label || labelInValue.children
                }
            }
        })
        data.push(temObj)
    })
    utils.exportExcel(columnList, data, '查询结果列表')
}

onMounted(() => {
    initTableInnerHeight()
    initSelectColumns()
})

</script>

<template>
    <n-common-table-bar :selected-columns="selectedColumns" :id="thId" @resort="getResortColumn"
                        @clear="cleanTableCache" @full="fullScreen" @download="downloadTable">
        <!-- default slot by `tableObj` -->
        <template #table-title>{{ $t(tableObj.title) }}</template>
        <!-- cover slot by parent component slots -->
        <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope || {}"/>
        </template>
    </n-common-table-bar>
    <div
            :class="['n-full-common-table', fullTable ? 'n-full-common-table-full' : '']"
            :id="tbId"
            :style="{
                height: autoHeight ? 'auto' : innerHeight
            }"
    >
        <slot name="data-table" :select-columns="showColumns" :inner-height="innerHeight"></slot>
    </div>
</template>

<style lang="scss" scoped>
@import '~@coscss/ncommontable.scss';
</style>
