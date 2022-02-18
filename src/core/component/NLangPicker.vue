<script lang="ts" setup>
import {
    NDropdown,
    NIcon,
} from 'naive-ui'
import { EarthOutline } from '@vicons/ionicons5'
import costore from '@costore/index'

const store = costore()

</script>

<template>
    <div class="n-flex">
        <div class="n-flex-left"></div>
        <div class="n-flex-right">
            <n-dropdown :options="store.langList">
                <n-icon size="24">
                    <earth-outline class="n-lang-picker"/>
                </n-icon>
            </n-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~@coscss/nlangpicker";
</style>
