<script lang="ts" setup>
import { NSpace, NIcon, NDropdown, NModal } from 'naive-ui'
import { ref, nextTick, h, computed } from 'vue'
import { CloseOutline, ChevronDownOutline } from '@vicons/ionicons5'
import costore from '@costore/index'
import dict from '@cots/dict'
import utils from '@csts/utils'

const store = costore()

const currentTabOptions = ref([])
const showTabOptions = ref(false)
const currentTabOptionsX = ref(0)
const currentTabOptionsY = ref(0)

const showCheckModal = ref(false)
const closeIdx = ref(null)
const closeType = ref(null)

const updateCurrentMenu = (menu: any, index: any) => {
    store.setCurrentMenu(menu.key)
    store.setCurTabIdx(index)
    // set tab to left
    const tabDom: HTMLElement = document.querySelector(`#n-common-tab-${index}`)
    const tabsDom: HTMLElement = document.querySelector('.n-common-tabs')
    tabsDom.scrollLeft = tabDom.offsetLeft
}

const getContextMenu = (idx) => {
    const currentCp = store.curTabList[store.curTabIdx]
    const eventCp = store.curTabList[idx]
    let closeCurBtn = []
    let closeRightBtn = []
    let closeAllBtn = []
    let closeOtherBtn = []
    let affixBtn = []
    if (idx !== 0 && currentCp.params && !currentCp.params.isAffix) {
        closeCurBtn = [
            {
                label: dict.tagObj.closeCur,
                key: 'closeCur',
                idx
            }
        ]
    }
    if (idx !== store.curTabList.length - 1) {
        closeRightBtn = [
            {
                label: dict.tagObj.closeRight,
                key: 'closeRight',
                idx
            }
        ]
    }
    if (store.curTabList.length > 1) {
        closeAllBtn = [
            {
                label: dict.tagObj.closeAll,
                key: 'closeAll',
                idx
            }
        ]
    }
    if (store.curTabList.length > 2 && idx !== 0) {
        closeOtherBtn = [
            {
                label: dict.tagObj.closeOther,
                key: 'closeOther',
                idx
            }
        ]
    }
    if (eventCp.params && eventCp.params.isAffix) {
        affixBtn = [
            {
                label: dict.tagObj.cancelAffixPage,
                key: 'cancelAffix',
                idx
            }
        ]
    } else {
        affixBtn = [
            {
                label: dict.tagObj.affixPage,
                key: 'toAffix',
                idx
            }
        ]
    }
    return [
        ...closeCurBtn,
        ...closeRightBtn,
        ...closeOtherBtn,
        ...closeAllBtn,
        {
            label: dict.tagObj.singlePage,
            key: 'singlePage',
            idx
        },
        {
            label: dict.tagObj.refreshPage,
            key: 'refreshPage',
            idx
        },
        ...affixBtn
    ]
}

const handleContextMenu = (e: MouseEvent, idx: number) => {
    e.preventDefault()
    closeIdx.value = idx
    currentTabOptions.value = getContextMenu(idx)
    showTabOptions.value = false
    nextTick().then(() => {
        showTabOptions.value = true
        currentTabOptionsX.value = e.clientX
        currentTabOptionsY.value = e.clientY
    })
}

const onClickOutside = () => {
    showTabOptions.value = false
}

const resetClose = () => {
    closeIdx.value = undefined
    closeType.value = undefined
    onClickOutside()
}

const getCheckSaveListByType = () => {
    let checkSaveList = []
    switch (closeType.value) {
    case 'closeCur':
        checkSaveList = [store.curTabList[closeIdx.value]]
        break
    case 'closeRight':
        checkSaveList = store.curTabList.slice(closeIdx.value + 1)
        break
    case 'closeAll':
        checkSaveList = store.curTabList.filter((item) => !(item.params && item.params.isAffix))
        break
    case 'closeOther':
        checkSaveList = store.curTabList.filter((item, index) => (index !== closeIdx.value && index !== 0))
        break
    default:
        break
    }
    return checkSaveList.filter((item) => item.params && item.params.checkSave)
}

const checkExistCheckSave = (idx?: number) => {
    let checkSaveList
    if (idx) {
        checkSaveList = store.curTabList.filter((item, index) => item.params && item.params.checkSave && index === idx)
    } else {
        checkSaveList = getCheckSaveListByType()
    }
    if (checkSaveList.length > 0) {
        return true
    }
    return false
}

const closeTab = (idx: number, force?: boolean) => {
    closeIdx.value = idx
    const existCheckSave = checkExistCheckSave(idx)
    if (existCheckSave && !force) {
        showCheckModal.value = true
    } else {
        store.closeTab(idx)
        resetClose()
    }
}

const dealTabEvent = (key: string, option: any) => {
    switch (closeType.value) {
    case 'closeCur':
        store.closeTab(option.idx)
        break
    case 'closeRight':
        store.closeRight(option.idx)
        break
    case 'closeOther':
        store.closeOther(option.idx)
        break
    case 'closeAll':
        store.closeAll()
        break
    case 'cancelAffix':
        store.affixTab(option.idx, false)
        break
    case 'toAffix':
        store.affixTab(option.idx, true)
        break
    case 'singlePage':
        store.singlePage(option.idx)
        break
    case 'refreshPage':
        break
    default:
        break
    }
    resetClose()
}

const onSelectOption = (key: string, option: any) => {
    closeType.value = key
    if (/close/.test(key)) {
        const existCheckSave = checkExistCheckSave()
        if (existCheckSave) {
            showCheckModal.value = true
        } else {
            dealTabEvent(key, option)
        }
    } else {
        dealTabEvent(key, option)
    }
}

const confirmClose = () => {
    if (!closeType.value) {
        closeTab(closeIdx.value, true)
    } else {
        dealTabEvent(closeType, { idx: closeIdx.value })
    }
}

const checkSaveList = computed(() => getCheckSaveListByType().map((item) => item.key))

const toPage = (key, menu) => {
    const currentMenuIdx = utils.getCurTabIdx(store.curTabList, key)
    if (currentMenuIdx === -1) {
        // new page
        store.addCurTab(menu)
        store.setCurTabIdx(store.curTabList.length - 1)
    } else {
        // old page
        store.setCurTabIdx(currentMenuIdx)
    }
}

</script>

<template>
    <div class="n-common-tabs-wrp">
        <div class="n-common-tabs">
            <div :class="[
                'n-common-tab',
                index === store.curTabIdx ? 'cur' : '',
                showCheckModal &&
                 (
                     (checkSaveList.indexOf(item.key) > -1
                      && (
                              closeType === 'closeAll'
                              || closeType === 'closeOther'
                              || closeType === 'closeRight'
                      )
                 ) || (
                         closeIdx === index
                          && item.params && item.params.checkSave
                          && (
                                  !closeType
                                  || closeType === 'closeCur'
                                  || closeType === 'closeAll'
                          )
                  ))
                 ? 'check-save' : '',
            ]" v-for="(item, index) in store.curTabList" :key="index"
                 :id="`n-common-tab-${index}`"
                 @click="updateCurrentMenu(item, index)"
                 @contextmenu="handleContextMenu($event, index)"
            >
                <n-space :size="6">
                    <span class="n-affix-circle" v-if="item.params.isAffix"></span>
                    <span>{{ $t(item.label) }}</span>
                    <span class="n-tab-close" v-if="!item.params.isAffix"
                          @click.stop="closeTab(index)">
                        <n-icon :component="CloseOutline"/>
                    </span>
                </n-space>
            </div>
            <div class="n-common-tab-more">
                <n-dropdown
                        :options="store.curTabList"
                        :render-label="(option) => h('span', {}, $t(option.label))"
                        @select="toPage"
                >
                    <n-icon :component="ChevronDownOutline"/>
                </n-dropdown>

            </div>
            <n-dropdown
                placement="bottom-start"
                trigger="manual"
                :x="currentTabOptionsX"
                :y="currentTabOptionsY"
                :render-label="(option) => h('span', {}, $t(option.label))"
                :options="currentTabOptions"
                :show="showTabOptions"
                :on-clickoutside="onClickOutside"
                :on-select="onSelectOption"
            />
        </div>
    </div>
    <n-modal
        v-model:show="showCheckModal"
        preset="dialog"
        :title="$t(dict.modalObj.confirm)"
        :content="$t(dict.tagObj.checkSave)"
        :mask-closable="false"
        :positive-text="$t(dict.modalObj.yes)"
        :negative-text="$t(dict.modalObj.no)"
        @positive-click="confirmClose"
        @negative-click="resetClose"
        @esc="resetClose"
    ></n-modal>
</template>

<style lang="scss" scoped>
@import "~@coscss/ntabs.scss";
</style>
