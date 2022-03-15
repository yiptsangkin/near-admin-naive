<script lang="ts" setup>
import { PropType, onMounted, ref, h } from 'vue'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import VueDraggableResizable from 'vue3-draggable-resizable'
import { ComTable } from '@cots/type'
import utils from '@cots/utils'
import NCommonTableBar from './NCommonTableBar.vue'

const props = defineProps({
    tableObj: {
        type: Object as PropType<ComTable>,
    }
})

const tbId = utils.randomCharacter(32)
const thId = utils.randomCharacter(32)
const innerHeight = ref(null)
const selectedColumns = ref([])

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
    const curTableColumns = props.tableObj.columns()
    selectedColumns.value = curTableColumns.map((item) => {
        if (item.resizable) {
            return {
                ...item,
                title () {
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

onMounted(() => {
    initTableInnerHeight()
    initSelectColumns()
})

</script>

<template>
    <n-common-table-bar :id="thId">
        <!-- default slot by `tableObj` -->
        <template #table-title>{{ $t(tableObj.title) }}</template>
        <!-- cover slot by parent component slots -->
        <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope || {}" />
        </template>
    </n-common-table-bar>
    <div
            class="n-full-common-table"
            :id="tbId"
            :style="{
                height: innerHeight
            }"
    >
        <slot name="data-table" :select-columns="selectedColumns" :inner-height="innerHeight"></slot>
    </div>
</template>

<style lang="scss" scoped>
@import '~@coscss/ncommontable.scss';
</style>
