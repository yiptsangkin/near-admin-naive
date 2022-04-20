<script lang="ts" setup>
import {
    NButton
} from 'naive-ui'
import dict from '@cots/dict'
import config from '@csts/config'
import NColorPanel from './NColorPanel.vue'

const iconUrl = config.publicPath ? `/${config.publicPath}/static/images/manage/403.png` : '/static/images/manage/403.png'

</script>

<template>
    <n-color-panel class="n-not-found-wrp">
        <template #content>
            <div class="n-not-found">
                <div class="n-not-found-icon">
                    <img :src="iconUrl" alt="403">
                </div>
                <div class="n-not-found-tip">{{ $t(dict.errorPage.errorTip.notRightTip) }}</div>
                <div class="n-not-found-op">
                    <n-button size="small" type="primary">{{ $t(dict.errorPage.btnText) }}</n-button>
                </div>
            </div>
        </template>
    </n-color-panel>
</template>

<style lang="scss" scoped>
@import "~@coscss/nnotfound.scss";
</style>
