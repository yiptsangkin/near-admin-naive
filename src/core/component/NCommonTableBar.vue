<script lang="ts" setup>
import {
    NSpace,
    NPopover,
    NIcon,
    NCheckbox,
    // NInputNumber,
} from 'naive-ui'
import { SettingsOutline, TrashOutline, DownloadOutline } from '@vicons/ionicons5'
import { LayoutAlignLeft, LayoutAlignMiddle, LayoutAlignRight } from '@vicons/tabler'
import { ref, watch } from 'vue'
import VueDraggable from 'vuedraggable'
import dict from '@cots/dict'
import NColorPanel from '@cocp/NColorPanel.vue'

const props = defineProps({
    selectedColumns: {
        type: Array,
    }
})

const emit = defineEmits(['resort', 'clear', 'full', 'download'])

const isAllPicked = ref(true)
const cpSelectedColumns = ref(null)

watch(() => props.selectedColumns, (nv) => {
    if (nv?.length) {
        cpSelectedColumns.value = nv
    }
}, { deep: true })

const finishSort = () => {
    emit('resort', cpSelectedColumns.value)
}

const changeFixed = (ele, fixed) => {
    ele.fixed = fixed
    finishSort()
}

const clearTableCache = () => {
    emit('clear')
}

const downloadTable = () => {
    emit('download')
}

</script>

<template>
    <n-color-panel>
        <template #content>
            <div class="n-common-table-bar">
                <n-space align="center" justify="space-between">
                    <slot name="table-title"></slot>
                    <div class="right-part">
                        <n-space :size="16" align="center" justify="center">
                            <slot name="table-btn"></slot>
                            <n-popover
                                    trigger="click"
                                    :show-arrow="false"
                                    placement="bottom"
                                    width="200"
                            >
                                <template #trigger>
                                    <n-icon class="n-table-bar-icon" :component="SettingsOutline"/>
                                </template>
                                <template #header>
                                    <n-checkbox v-model:checked="isAllPicked" :label="$t(dict.comTable.allPick)" />
                                </template>
                                <vue-draggable
                                        @end="finishSort"
                                        v-model="cpSelectedColumns"
                                        item-key="key"
                                >
                                    <template #item="{ element }">
                                        <n-space align="center" justify="space-between">
                                            <n-checkbox v-model:checked="element.isPicked" :label="element.title(false)" />
                                            <div class="n-column-item">
                                                <n-space align="center">
                                                    <!--<n-input-number :show-button="false" class="n-column-item-input" size="small" v-model:value="element.width"></n-input-number>-->
                                                    <n-icon @click="changeFixed(element, 'right')" class="n-column-item-icon cur" v-if="element.fixed === 'left'" :component="LayoutAlignLeft"/>
                                                    <n-icon @click="changeFixed(element, false)" class="n-column-item-icon cur" v-else-if="element.fixed === 'right'" :component="LayoutAlignRight"/>
                                                    <n-icon @click="changeFixed(element, 'left')" class="n-column-item-icon" v-else :component="LayoutAlignMiddle"/>
                                                </n-space>
                                            </div>
                                        </n-space>
                                    </template>
                                </vue-draggable>
                            </n-popover>
                            <n-icon @click="clearTableCache" class="n-table-bar-icon" :component="TrashOutline"/>
                            <n-icon @click="downloadTable" class="n-table-bar-icon" :component="DownloadOutline"/>
                        </n-space>
                    </div>
                </n-space>
            </div>
        </template>
    </n-color-panel>
</template>

<style lang="scss" scoped>
@import '~@coscss/ncommontablebar.scss';
</style>
